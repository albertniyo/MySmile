import os
import io
import httpx
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import uvicorn
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

from components import (
    load_oral_cancer_model,
    preprocess_image,
    predict_image_class,
    get_prediction_feedback,
    CLASS_NAMES,
    device
)

app = FastAPI(
    title="Oral Cancer Detection API",
    description="AI-powered oral health analysis from images",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://my-smile.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global model
MODEL = None

@app.on_event("startup")
async def load_model():
    """Load the model at startup."""
    global MODEL
    model_path = os.getenv("MODEL_PATH", "model/UmlomoV1.pth")
    MODEL = load_oral_cancer_model(model_path)
    if MODEL is None:
        raise RuntimeError(f"Failed to load model from {model_path}")
    print("Model and preprocessing ready")

@app.get("/")
async def root():
    return {
        "message": "Oral Cancer Detection API",
        "status": "running",
        "model_loaded": MODEL is not None
    }

@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    if MODEL is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    return {"status": "ok"}

@app.post("/api/predict")
async def predict(file: UploadFile = File(...)):
    """
    Predict oral cancer from an uploaded image.
    Returns predicted class, probability, and detailed feedback.
    """
    if MODEL is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    try:
        # Read image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        image_tensor = preprocess_image(image)  # returns batched tensor
        if image_tensor is None:
            raise HTTPException(status_code=400, detail="Could not preprocess image")

        predicted_class, probability = predict_image_class(
            image_tensor, MODEL, CLASS_NAMES, device
        )
        feedback = get_prediction_feedback(predicted_class, probability)

        return JSONResponse(content={
            "predicted_class": predicted_class,
            "probability": probability,
            "feedback": feedback
        })

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

# Nearby clinics endpoint (unchanged)
class NearbyClinicsRequest(BaseModel):
    lat: float
    lng: float
    radius: int = 5000

@app.post("/api/clinics/nearby")
async def get_nearby_clinics(request: NearbyClinicsRequest):
    """
    OpenStreetMap Nominatim to find nearby dental clinics.
    """
    try:
        delta = request.radius * 0.009 / 1000
        bbox = f"{request.lng-delta},{request.lat-delta},{request.lng+delta},{request.lat+delta}"
        url = "https://nominatim.openstreetmap.org/search"
        params = {
            'q': 'dental clinic dentist',
            'format': 'json',
            'limit': 20,
            'bounded': 1,
            'viewbox': bbox,
            'addressdetails': 1
        }
        headers = {
            'User-Agent': 'MySmileApp/1.0',
            'From': 'info@mysmile.com'
        }
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params, headers=headers)
            data = response.json()
            results = []
            for place in data:
                results.append({
                    "name": place.get('display_name', '').split(',')[0],
                    "address": place.get('display_name'),
                    "location": {
                        "lat": float(place.get('lat', 0)),
                        "lng": float(place.get('lon', 0))
                    },
                    "place_id": place.get('place_id'),
                })
            # Rate limit
            import time
            time.sleep(1)
            return {"status": "ok", "results": results}
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Internal error: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
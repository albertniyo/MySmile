# Backend - MySmile
This is the FastAPI backend for the MySmile oral health screening application. It provides two main services:

1. **AI‑powered oral cancer prediction** from uploaded images.  
2. **Nearby dental clinic search** using OpenStreetMap.

## Architecture

The backend is structured into modular components:

- **`main.py`** – FastAPI app with endpoints and CORS middleware.  
- **`components/`** – core logic:
  - `model_loader.py` – downloads the model from Hugging Face (if missing) and loads it into memory.
  - `pred_utils.py` – inference wrapper and feedback generation.
  - `img_transform.py` – image preprocessing (resize, normalize, tensor conversion).
- **`model/`** – directory where the model file (`UmlomoV1.pth`) is stored (created at runtime).

The model is a fine‑tuned **MobileNetV2** that classifies images into `Normal` or `Oral Cancer` with a confidence score. It is hosted on Hugging Face and downloaded automatically on first startup.

## API Endpoints

### `POST /api/predict`
Performs oral cancer detection.

**Request:** `multipart/form-data` with field `file` containing an image (JPEG/PNG).  
**Response:**
```json
{
  "predicted_class": "Normal",
  "probability": 0.94,
  "feedback": {
    "main_message": "...",
    "urgency_level": "low",
    "detailed_advice": [...],
    "recommendations": [...]
  }
}
```

### `POST /api/clinics/nearby`
Finds nearby dental clinics using OpenStreetMap Nominatim.

**Request:** JSON  
```json
{
  "lat": 40.7128,
  "lng": -74.0060,
  "radius": 5000    // meters, optional, default 5000
}
```
**Response:**
```json
{
  "status": "ok",
  "results": [
    {
      "name": "Clinic Name",
      "address": "Street, City",
      "location": { "lat": 40.7128, "lng": -74.0060 },
      "place_id": "12345"
    }
  ]
}
```

### `GET /api/health`
Health check. Returns `{"status": "ok"}` if the model is loaded.

### `GET /`
Service information.

## Model Loading

- The model file is **not** stored in the repository.  
- At startup, the app checks `model/UmlomoV1.pth` (configurable via `MODEL_PATH` env).  
- If missing, it downloads from `https://huggingface.co/Al04ni/Umlomo/resolve/main/UmlomoV1.pth`.  
- The download happens **only once**; subsequent starts use the cached file.

## Environment Variables

| Variable        | Description                                         |
|-----------------|-----------------------------------------------------|
| `HF_API_TOKEN`    | HuggingFace API Token    |


## Setup & Run

1. Clone the repository.
2. Navigate to `backend/`.
3. Create a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate   # Windows: .venv\Scripts\activate
   ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. (Optional) Create a `.env` file with your variable.
6. Start the server:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
7. Open `http://localhost:8000/docs` for interactive API documentation.

## Deployment

The backend is designed to run on platforms like **Render** or **Railway**. Use the provided `requirements.txt` (with CPU‑only PyTorch) and set the start command to:
```
uvicorn main:app --host 0.0.0.0 --port $PORT
```
<hr>

For more details about the whole project (frontend, Supabase setup, etc.), see the main [README](../README.md).
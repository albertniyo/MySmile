"""
Prediction and feedback utilities for oral cancer detection.
"""
import os
import time
from typing import Tuple, Dict, Any
from PIL import Image
from huggingface_hub import InferenceClient

# Hugging Face model ID and client
HF_MODEL_ID = "mysmile/umlomo"  # Replace with your actual model ID
HF_API_TOKEN = os.getenv("HF_API_TOKEN")
if not HF_API_TOKEN:
    raise ValueError("HF_API_TOKEN environment variable not set")

client = InferenceClient(model=HF_MODEL_ID, token=HF_API_TOKEN)

# Pre‑defined feedback templates for performance
FEEDBACK_TEMPLATES = {
    'normal_high': {
        'main_message': "Your oral health appears to be good based on the image analysis.",
        'urgency_level': 'low',
        'detailed_advice': [
            "Keep up the good work with your oral hygiene!",
            "Continue with regular dental check-ups."
        ],
        'recommendations': [
            "Brush your teeth twice a day with fluoride toothpaste.",
            "Floss daily to remove food particles and plaque between teeth.",
            "Visit your dentist regularly for checkups and cleanings.",
            "Maintain a healthy diet and limit sugary snacks and drinks.",
            "Avoid smoking and excessive alcohol consumption."
        ]
    },
    'normal_moderate': {
        'main_message': "The analysis shows no clear signs of oral cancer, but confidence is moderate.",
        'urgency_level': 'medium',
        'detailed_advice': [
            "While the image doesn't clearly show signs of oral cancer, it's always best to consult a healthcare professional for a definitive diagnosis.",
            "Be aware of any persistent sores, lumps, or unusual changes in your mouth."
        ],
        'recommendations': [
            "Consult a dentist or doctor if you notice any changes in your oral health.",
            "Schedule a professional dental examination for comprehensive assessment."
        ]
    },
    'cancer_high': {
        'main_message': "The analysis suggests potential signs that require immediate professional attention.",
        'urgency_level': 'high',
        'detailed_advice': [
            "This is a serious finding that requires immediate professional evaluation.",
            "Do not rely solely on this analysis; professional medical evaluation is essential."
        ],
        'recommendations': [
            "Contact a healthcare professional (dentist or oral surgeon) immediately.",
            "Schedule an appointment for further examination and diagnosis.",
            "Be prepared to discuss your medical history and any symptoms you've experienced.",
            "Do not delay seeking professional medical advice."
        ]
    },
    'cancer_moderate': {
        'main_message': "The analysis shows some features that warrant professional evaluation.",
        'urgency_level': 'medium',
        'detailed_advice': [
            "While this finding warrants attention, it's important not to panic.",
            "Professional evaluation is needed to confirm any diagnosis."
        ],
        'recommendations': [
            "Schedule an appointment with a dentist or doctor for evaluation.",
            "Share this analysis result with your healthcare professional.",
            "Monitor for any changes in your oral health and report them to your doctor."
        ]
    },
    'error': {
        'main_message': "Could not make a clear prediction from the image.",
        'urgency_level': 'low',
        'detailed_advice': [
            "Please ensure the image is clear and well-lit.",
            "Try again with a different image or consult a healthcare professional."
        ],
        'recommendations': [
            "Ensure good lighting and clear focus when taking oral photos.",
            "Make sure the entire area of concern is visible in the image.",
            "Consult a healthcare professional for a definitive diagnosis."
        ]
    }
}

def predict_image_class(image: Image.Image,
                        model=None,        # kept for compatibility, not used
                        class_names=None,  # kept for compatibility, not used
                        device=None) -> Tuple[str, float]:
    """
    Run inference using Hugging Face Inference API.

    Args:
        image: PIL Image (RGB)
        model, class_names, device: Ignored; kept for compatibility.

    Returns:
        Tuple of (predicted_class_name, probability)
    """
    if image is None:
        return "Error: Could not process image", 0.0

    try:
        start_time = time.time()
        response = client.image_classification(image=image)
        # response is a list of {"label": "LABEL_0", "score": 0.98}, ...
        best = max(response, key=lambda x: x['score'])
        # Map labels: expects "LABEL_0" = Normal, "LABEL_1" = Oral Cancer
        predicted_class = "Normal" if best['label'] == "LABEL_0" else "Oral Cancer"
        probability = best['score']

        inference_time = time.time() - start_time
        print(f"Prediction completed in {inference_time:.3f}s")

        return predicted_class, probability

    except Exception as e:
        print(f"Prediction error: {e}")
        return f"Prediction error: {str(e)}", 0.0

def get_prediction_feedback(predicted_class: str,
                            predicted_probability: float) -> Dict[str, Any]:
    """
    Generate detailed feedback based on prediction result.
    """
    if predicted_class == 'Normal':
        if predicted_probability > 0.8:
            return FEEDBACK_TEMPLATES['normal_high']
        else:
            return FEEDBACK_TEMPLATES['normal_moderate']
    elif predicted_class == 'Oral Cancer':
        if predicted_probability > 0.7:
            return FEEDBACK_TEMPLATES['cancer_high']
        else:
            return FEEDBACK_TEMPLATES['cancer_moderate']
    else:
        return FEEDBACK_TEMPLATES['error']
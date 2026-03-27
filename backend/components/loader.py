"""
Model loading utilities for oral cancer detection (MobileNetV2).
"""
import os
import requests
import torch
import torch.nn as nn
import torchvision.models as models
import sys
import time
from typing import Optional

# Global device
DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

def download_model_if_needed(model_path: str = 'model/UmlomoV1.pth'):
    """Download model from Hugging Face if it doesn't exist locally."""
    if not os.path.exists(model_path):
        print("Model not found locally. Downloading from Hugging Face...")
        os.makedirs(os.path.dirname(model_path), exist_ok=True)
        url = "https://huggingface.co/Al04ni/Umlomo/resolve/main/UmlomoV1.pth"
        try:
            response = requests.get(url, stream=True)
            response.raise_for_status()  # raise if status not 200
            with open(model_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)
            print("Download complete.")
        except Exception as e:
            print(f"Download failed: {e}")
            raise

def load_oral_cancer_model(model_path: str = 'model/UmlomoV1.pth',
                           num_classes: int = 2,
                           device: torch.device = DEVICE) -> Optional[nn.Module]:
    """
    Load a pre-trained MobileNetV2 model with custom classifier for oral cancer.
    Downloads the model if not already present.
    """
    start_time = time.time()
    try:
        # Ensure the model file exists
        download_model_if_needed(model_path)

        # Build base model
        model = models.mobilenet_v2(weights=models.MobileNet_V2_Weights.IMAGENET1K_V1)
        in_features = model.last_channel
        model.classifier[1] = nn.Linear(in_features, num_classes)

        # Load weights
        state_dict = torch.load(model_path, map_location=device)
        model.load_state_dict(state_dict)

        model = model.to(device)
        model.eval()

        # Optional optimizations
        if hasattr(torch, 'compile') and sys.version_info < (3, 12):
            try:
                model = torch.compile(model)
                optimization = "torch.compile"
            except Exception as e:
                optimization = f"compile failed: {e}"
        else:
            torch.backends.cudnn.benchmark = True
            optimization = "cudnn.benchmark"

        load_time = time.time() - start_time
        print(f"Model loaded from {model_path} in {load_time:.2f}s")
        print(f"Device: {device} | Optimizations: {optimization}")
        return model

    except Exception as e:
        print(f"Error loading model: {e}")
        return None
# class names

CLASS_NAMES = ['Normal', 'Oral Cancer']
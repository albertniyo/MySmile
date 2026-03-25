"""
Model loading utilities for oral cancer detection (MobileNetV2).
"""
import torch
import torch.nn as nn
import torchvision.models as models
import sys
import time
from typing import Optional, Tuple

# global device
DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

def load_oral_cancer_model(model_path: str = 'model/UmlomoV1.pth',
                           num_classes: int = 2,
                           device: torch.device = DEVICE) -> Optional[nn.Module]:
    """
    Load a pre-trained MobileNetV2 model with custom classifier for oral cancer.

    Args:
        model_path: Path to the saved state dict.
        num_classes: Number of output classes (default 2).
        device: Torch device (cuda/cpu).

    Returns:
        Loaded model in eval mode, or None if loading fails.
    """
    start_time = time.time()
    try:
        model = models.mobilenet_v2(weights=models.MobileNet_V2_Weights.IMAGENET1K_V1)
        in_features = model.last_channel
        model.classifier[1] = nn.Linear(in_features, num_classes)
        state_dict = torch.load(model_path, map_location=device)
        model.load_state_dict(state_dict)

        # eval mode
        model = model.to(device)
        model.eval()

        # optional inference optimizations
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

    except FileNotFoundError:
        print(f"Error: Model file not found at {model_path}")
        return None
    except Exception as e:
        print(f"Error loading model: {e}")
        return None

# class names
CLASS_NAMES = ['Normal', 'Oral Cancer']
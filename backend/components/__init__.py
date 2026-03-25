"""
Oral Cancer Detection Core
Optimized module initialization for the backend.
"""

import sys
import os

sys.path.append(os.path.dirname(__file__))

from .img_transform import (
    get_image_transform,
    preprocess_image,
    preprocess_image_for_display,
)

from .loader import (
    load_oral_cancer_model,
    CLASS_NAMES,
    DEVICE as device,  # for backward compatibility
)

from .pred_utils import (
    predict_image_class,
    get_prediction_feedback,
)

# package metadata
__version__ = "1.0.0"
__author__ = "Albertniyo"
__description__ = "AI components for oral health analysis"

__all__ = [
    "get_image_transform",
    "preprocess_image",
    "preprocess_image_for_display",
    "load_oral_cancer_model",
    "CLASS_NAMES",
    "device",
    "predict_image_class",
    "get_prediction_feedback",
]

print(f"Components v{__version__} initialized successfully")
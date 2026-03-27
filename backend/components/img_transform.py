"""
Image transformation utilities for oral cancer detection.
"""
from PIL import Image
from typing import Optional

def get_image_transform():
    """
    Deprecated, Returns None.
    """
    return None

def preprocess_image(image: Image.Image, transform=None) -> Optional[Image.Image]:
    """
    Deprecated
    """
    return image

def preprocess_image_for_display(image: Image.Image,
                                 size: tuple = (224, 224)) -> Optional[Image.Image]:
    """
    Lightweight preprocessing for display (no normalization).

    Args:
        image: PIL Image
        size: desired thumbnail size

    Returns:
        Resized RGB image or None if error.
    """
    try:
        if image.mode != 'RGB':
            image = image.convert('RGB')
        image.thumbnail(size, Image.Resampling.LANCZOS)
        return image
    except Exception as e:
        print(f"Error processing image for display: {e}")
        return None
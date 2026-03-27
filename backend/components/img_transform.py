"""
Image transformation utilities for oral cancer detection.
"""
from PIL import Image
import torch
from torchvision import transforms
import functools
from typing import Optional

@functools.lru_cache(maxsize=1)
def get_image_transform() -> transforms.Compose:
    """
    Returns the cached image transformation pipeline.
    This matches the validation transforms used during training.
    """
    return transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std=[0.229, 0.224, 0.225])
    ])

def preprocess_image(image: Image.Image,
                     transform: Optional[transforms.Compose] = None) -> Optional[torch.Tensor]:
    """
    Preprocess a PIL image into a batched tensor ready for model inference.

    Args:
        image: PIL Image (any mode, will be converted to RGB)
        transform: Optional custom transform; uses cached default if None.

    Returns:
        A 4D tensor (1, C, H, W) or None if processing fails.
    """
    try:
        if transform is None:
            transform = get_image_transform()

        # Ensure RGB
        if image.mode != 'RGB':
            image = image.convert('RGB')

        tensor = transform(image)
        return tensor.unsqueeze(0)   # add batch dimension
    except Exception as e:
        print(f"Error processing image: {e}")
        return None

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
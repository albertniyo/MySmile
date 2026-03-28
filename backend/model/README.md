# Oral Cancer Detection Model Documentation - UmlomoV1

This comprehensive document outlines the design, capabilities, specifications, limitations, and usage of the Oral Cancer Detection Model, **UmlomoV1**. This model is specifically engineered for the preliminary classification of oral cavity images into 'Normal' or 'Oral Cancer' categories.

#### 1. Model Overview

*   **Model Name**: UmlomoV1
*   **Primary Objective**: To serve as an initial screening tool for oral cancer detection by accurately classifying images of oral lesions and healthy tissues.
*   **Core Architecture**: The model leverages a **MobileNetV2** backbone, pre-trained on the extensive ImageNet dataset. This choice was driven by MobileNetV2's balance of high performance and computational efficiency, making it suitable for potential deployment in resource-constrained environments.
*   **Implementation Framework**: Developed and trained using **PyTorch**, a leading open-source machine learning framework.

#### 2. Capabilities and Features

*   **Binary Image Classification**: The model's primary function is to perform a binary classification task, assigning one of two labels ('Normal' or 'Oral Cancer') to an input image.
*   **Transfer Learning Advantage**: By utilizing a MobileNetV2 backbone pre-trained on ImageNet, the model benefits from learned features of a vast and diverse set of general images. This significantly reduces the need for an extremely large, domain-specific dataset for effective training and helps in achieving better generalization.
*   **Computational Efficiency**: MobileNetV2 is known for its lightweight architecture, which involves depthwise separable convolutions. This makes UmlomoV1 relatively fast for inference and potentially suitable for edge devices or mobile applications.
*   **Handling Class Imbalance**: The training regimen incorporates **class weighting** within the loss function and employs a **WeightedRandomSampler** for the training data loader. This crucial technique addresses potential imbalances between the number of 'Normal' and 'Oral Cancer' samples in the dataset, preventing the model from being biased towards the more frequent class.
*   **Robust Evaluation**: The model's performance is rigorously assessed using a suite of standard classification metrics, including Accuracy, Precision, Recall, F1-Score, and a detailed Confusion Matrix, providing a holistic view of its strengths and weaknesses.
*   **Training History Visualization**: Provides visual plots of training and validation loss and accuracy over epochs, allowing for easy monitoring of convergence and identification of overfitting/underfitting.

#### 3. Technical Specifications and Parameters

*   **Input Data**: Oral cavity images.
    *   **Accepted Formats**: PNG, JPG, JPEG, BMP, GIF.
    *   **Preprocessing for Training**: Images are first resized to `(256, 256)` pixels, then a random crop of `(224, 224)` is taken. Additional augmentations include random horizontal flips (`p=0.5`), random rotations (`degrees=10`), and color jitter (`brightness=0.2, contrast=0.2`).
    *   **Preprocessing for Validation/Testing/Inference**: Images are resized to `(224, 224)` pixels.
    *   **Normalization**: All images are normalized using ImageNet's standard mean `[0.485, 0.456, 0.406]` and standard deviation `[0.229, 0.224, 0.225]` across RGB channels.
*   **Output**: For each input image, the model outputs two values representing the raw scores (logits) for each class. These are then converted into probabilities using a softmax function.
    *   **Predicted Class**: The class ('Normal' or 'Oral Cancer') with the highest probability.
    *   **Prediction Probability**: The confidence score (ranging from 0 to 1) associated with the predicted class.
*   **Dataset Structure (Internal)**:
    *   **Original Structure**: Dataset contains 'normal' and 'Oral Cancer photos' directories.
    *   **Organized Structure**: Images are combined into a single `images` directory, and labels are stored in a `oral_cancer_labels.csv` file with columns `Id`, `filename`, and `label`.
*   **Training Parameters**:
    *   **Number of Classes**: 2 (Normal, Oral Cancer).
    *   **Device**: Automatically detects and utilizes GPU (CUDA) if available, otherwise defaults to CPU.
    *   **Base Model**: `torchvision.models.mobilenet_v2(pretrained=True)`.
    *   **Classifier Head**: The original MobileNetV2 classifier is replaced with a single `nn.Linear` layer with `model.last_channel` input features and `len(class_names)` (2) output features.
    *   **Loss Function**: `nn.CrossEntropyLoss`.
        *   **Weight Parameter**: `class_weights = torch.tensor([1.0, 2.0]).to(device)` (Higher weight for the 'Oral Cancer' class to penalize misclassifications more severely).
    *   **Optimizer**: `torch.optim.Adam`.
        *   **Initial Learning Rate (`lr`)**: `0.001`.
    *   **Learning Rate Scheduler**: `torch.optim.lr_scheduler.StepLR`.
        *   **`step_size`**: `10` (learning rate drops every 10 epochs).
        *   **`gamma`**: `0.1` (learning rate is multiplied by 0.1).
    *   **Number of Epochs**: `25`.
    *   **Batch Size**: `32` for data loaders.
    *   **Validation Split**: `0.2` (20% of the data used for validation/testing, further split 50/50 for validation and test sets).
    *   **Random Seed**: `42` for `train_test_split` to ensure reproducibility of data splits.
*   **Model Persistence**: The model's `state_dict` (learned parameters) is saved as `UmlomoV1.pth` after training, specifically storing the version that achieved the `best_val_acc`.

#### 4. Limitations and "Cannot Do" Aspects

*   **Not a Clinical Diagnostic Tool**: **UmlomoV1 is strictly for research and preliminary screening purposes. It must not be used as a standalone diagnostic tool.** All medical decisions and definitive diagnoses require examination by a qualified healthcare professional.
*   **Data Specificity & Generalization**: The model's performance is intrinsically linked to the characteristics of its training data. It might exhibit reduced accuracy when presented with images differing significantly in photographic conditions (e.g., camera types, lighting, angle), patient demographics, or lesion appearances not well-represented in its training set.
*   **Image Quality Sensitivity**: The model's predictions are highly dependent on the quality of the input image. Blurry, poorly lit, obstructed, or out-of-focus images can lead to unreliable results.
*   **Absence of Localization**: UmlomoV1 performs whole-image classification. It does not provide information on the precise location or extent of any suspicious regions within the oral cavity image. This means it cannot highlight where a potential cancer might be.
*   **Limited Disease Scope**: The model is trained exclusively to differentiate between 'Normal' tissue and 'Oral Cancer'. It is not equipped to detect, classify, or differentiate other oral diseases, benign conditions, or other forms of cancer.
*   **Potential for Bias**: Like all AI models, there's a risk of inherent bias if the training dataset does not comprehensively represent the diversity of oral conditions across various populations, ethnic groups, or image acquisition protocols.
*   **Strict Preprocessing Requirement**: For accurate inference, new input images must undergo the exact same preprocessing steps (resizing, normalization) that were applied during the model's training and validation phase.
*   **No Real-time Learning**: This is a static model, meaning it does not adapt or update its knowledge base with new data in real-time after training. Any updates to its capabilities would require re-training with an augmented dataset.
*   **Absence of Explainability**: The model, being a deep neural network, operates as a 'black box'. It does not inherently explain *why* it made a particular prediction, which can be a limitation in clinical contexts where interpretability is crucial.

#### 6. Future Enhancements & Development Directions

*   **Multi-class Classification**: Expanding the model to detect and differentiate between various types of oral lesions (e.g., benign, pre-cancerous, different grades of cancer).
*   **Object Detection/Segmentation**: Implementing models that can not only classify but also localize (draw bounding boxes) or segment (pixel-level masking) the cancerous regions within an image, providing more actionable insights.
*   **Larger and More Diverse Dataset**: Training on a significantly larger and more diverse dataset from multiple sources to improve generalization and reduce potential biases.
*   **Interpretability Tools**: Integrating techniques like Grad-CAM or SHAP to visualize which parts of the image contribute most to the model's prediction, enhancing trust and clinical utility.
*   **Uncertainty Quantification**: Providing not just a prediction but also a measure of the model's uncertainty in its prediction, which is crucial in high-stakes medical applications.
*   **Real-world Deployment & Validation**: Rigorous testing and validation in a clinical setting with real-world patient data to assess its practical utility and impact.

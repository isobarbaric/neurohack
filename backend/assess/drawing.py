from io import BytesIO
import math
import base64
from transformers import pipeline
from PIL import Image
from pathlib import Path
from dataclasses import dataclass
import cv2
import numpy as np
import torch
import torchvision.transforms as transforms

pipe = pipeline(
    "image-classification", 
    model="gianlab/swin-tiny-patch4-window7-224-finetuned-parkinson-classification", 
    use_fast=True
)

def run_inference(image):
    image = image[len("data:image/png;base64,"):]
    img = Image.open(BytesIO(base64.b64decode(image)))
    transform = transforms.Grayscale()
    rev_image = transform(img)
    results = pipe(rev_image)
    print(results)

    if results[0]['label'] == 'parkinson':
        return {'data': math.floor((results[0]['score']) * 100)/10}
    else:
        return {'data': math.floor((results[1]['score']) * 100)/10}

    # img = Image.open(image)

    # Step 1: Remove the data URL prefix
    # if image.startswith("data:image/"):
    #     image = image.split(",")[1]  # Get the part after the comma
    #
    # # Step 2: Decode the base64 image data
    # try:
    #     image_data = base64.b64decode(image)
    # except Exception as e:
    #     print("Error decoding base64:", e)
    #     exit()
    #
    # # Step 3: Convert binary data to a NumPy array
    # image_array = np.frombuffer(image_data, dtype=np.uint8)
    #
    # # Step 4: Decode the image using OpenCV
    # img = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    #
    # # Check if the image was successfully decoded
    # if img is None:
    #     print("Error: Could not decode image.")
    #     exit()

    # result = pipe(image)
    # print(result)
    return math.floor((results[0]['score']) * 10)

# run_inference('text')

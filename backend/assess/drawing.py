from io import BytesIO
import math
import base64
from transformers import pipeline
from PIL import Image
from pathlib import Path
from dataclasses import dataclass

pipe = pipeline(
    "image-classification", 
    model="gianlab/swin-tiny-patch4-window7-224-finetuned-parkinson-classification", 
    use_fast=True
)


def run_inference(image):
    # test_img = Path('healthy.png')
    img = Image.open(BytesIO(base64.b64decode(image)))
    result = pipe(img)
    print(result)
    return math.floor((result[0]['score']) * 10)

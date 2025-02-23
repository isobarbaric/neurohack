from transformers import pipeline
from PIL import Image
from pathlib import Path
from dataclasses import dataclass

pipe = pipeline("image-classification", model="gianlab/swin-tiny-patch4-window7-224-finetuned-parkinson-classification")

@dataclass
class InferenceResult:
    parkinson_prob: float
    healthy_prob: float
    
def run_inference(image, user):
    test_img = Path('healthy.png')

    img = Image.open(test_img)
    print(pipe(img))
    
    results = InferenceResult(pipe(img))
    print(results)

    

    return I
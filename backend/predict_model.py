import cv2
import numpy as np
import joblib

model = joblib.load("model.pkl")
categories = ["Recyclable", "Organic"]

def predict_image(image_path):
    img = cv2.imread(image_path)

    if img is None:
        return "Invalid image"

    img = cv2.resize(img, (64, 64))
    img = img.flatten().reshape(1, -1)

    pred = model.predict(img)[0]
    return categories[pred]

# test
if __name__ == "__main__":
    path = input("Enter image path: ")
    print("Prediction:", predict_image(path))
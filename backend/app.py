from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from predict_model import predict_image

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


@app.route("/", methods=["GET"])
def home():
    return "NovaEcoSort backend is running"


@app.route("/upload", methods=["POST"])
def upload_image():
    if "image" not in request.files:
        return jsonify({"error": "No image sent"}), 400

    image = request.files["image"]

    if image.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    image_path = os.path.join(app.config["UPLOAD_FOLDER"], image.filename)
    image.save(image_path)

   # predict using ML model
    result = predict_image(image_path)

    return jsonify({
        "message": "Image uploaded successfully",
        "filename": image.filename,
        "image_path": image_path,
        "prediction": result
    })


if __name__ == "__main__":
    app.run(debug=True)
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from predict_model import predict_image

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


@app.route("/")
def home():
    return "Backend Running"


@app.route("/upload", methods=["POST"])
def upload():

    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image = request.files["image"]

    filename = image.filename
    filepath = os.path.join(UPLOAD_FOLDER, filename)

    image.save(filepath)

    prediction = predict_image(filepath)

    return jsonify({
        "prediction": prediction,
        "image_path": f"uploads/{filename}"
    })


@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


if __name__ == "__main__":
    app.run(debug=True)
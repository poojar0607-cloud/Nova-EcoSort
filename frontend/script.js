console.log("script.js loaded");

const imageInput = document.getElementById("imageInput");
const uploadedImage = document.getElementById("uploadedImage");

imageInput.addEventListener("change", function () {

    if (this.files.length > 0) {

        uploadedImage.src = URL.createObjectURL(this.files[0]);
        uploadedImage.style.display = "block";

    }

});

async function uploadImage() {

    console.log("Button clicked");

    const fileInput = imageInput;
    if (fileInput.files.length === 0) {
        alert("Please select an image.");
        return;
    }

    const formData = new FormData();
    formData.append("image", fileInput.files[0]);

    try {
        const response = await fetch("http://127.0.0.1:5000/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {

            localStorage.setItem("prediction", data.prediction);
            localStorage.setItem("image", "http://127.0.0.1:5000/" + data.image_path);

            window.location.href = "result.html";

        } else {
            alert(data.error || "Upload failed");
        }

    } catch (error) {
        console.error(error);
        alert("Cannot connect to backend.");
    }
}

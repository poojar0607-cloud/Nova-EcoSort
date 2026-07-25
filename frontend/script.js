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

const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("imageInput");

// Prevent browser from opening the image
["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
    dropArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
});

// Highlight box while dragging
["dragenter", "dragover"].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
        dropArea.classList.add("drag-active");
    });
});

// Remove highlight
["dragleave", "drop"].forEach(eventName => {
    dropArea.addEventListener(eventName, () => {
        dropArea.classList.remove("drag-active");
    });
});

// Drop image
dropArea.addEventListener("drop", (e) => {

    const files = e.dataTransfer.files;

    if (files.length > 0) {

        fileInput.files = files;

        // Show preview
        const img = document.getElementById("uploadedImage");
        img.src = URL.createObjectURL(files[0]);
        img.style.display = "block";
    }
});

// Preview when using Choose button
fileInput.addEventListener("change", () => {

    if (fileInput.files.length > 0) {

        const img = document.getElementById("uploadedImage");
        img.src = URL.createObjectURL(fileInput.files[0]);
        img.style.display = "block";
    }
});
console.log("script.js loaded");

async function uploadImage() {

    console.log("Button clicked");

    const fileInput = document.getElementById("imageInput");


    const fileInput = document.getElementById("imageInput");

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

        if (response.ok) {

            document.getElementById("prediction").innerHTML =
                data.prediction;

            document.getElementById("uploadedImage").src =
                "http://127.0.0.1:5000/" + data.image_path;

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.log(error);
        alert("Server not running.");

    }

}
const fileInput = document.getElementById("fileInput");
const dropArea = document.getElementById("dropzone");
const imagePreview = document.getElementById("fileList");

// Check for previously saved images and descriptions in localStorage
const savedImages = JSON.parse(localStorage.getItem("uploadedImages")) || [];

// Function to update the saved images and descriptions in localStorage
function updateSavedImages(images) {
  localStorage.setItem("uploadedImages", JSON.stringify(images));
}

function addImageToPreview(file, description) {
  // Check if the data URL starts with "data:image/"
  if (file.type || file.startsWith("data:image/")) {
    console.log("Adding image to preview:", file);
    // ... rest of the code
  }
}

// Load previously saved images and descriptions from localStorage
for (const savedImage of savedImages) {
  console.log("Loading saved image:", savedImage);
  const imageDescription =
    JSON.parse(localStorage.getItem("imageDescriptions")) || {};
  addImageToPreview(savedImage, imageDescription[savedImage]);
}

// Function to add an image to the preview and the saved images
function addImageToPreview(file, description) {
  if (file.type || file.startsWith("data:image/")) {
    console.log("correct");
    // if (savedImages.length < 5) {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    imagePreview.appendChild(imageContainer);

    const image = document.createElement("img");
    image.classList.add("preview-image");
    image.file = file;
    imageContainer.appendChild(image);

    const descriptionInput = document.createElement("textarea");
    descriptionInput.classList.add("image-description");
    descriptionInput.placeholder = "Add a description";
    descriptionInput.value = description || "";
    imageContainer.appendChild(descriptionInput);

    const removeIcon = document.createElement("span");
    removeIcon.classList.add("remove-icon");
    removeIcon.innerHTML = "❌";
    removeIcon.addEventListener("click", function () {
      imageContainer.remove();
      const index = savedImages.indexOf(image.src);
      if (index > -1) {
        savedImages.splice(index, 1);
        updateSavedImages(savedImages);
      }
    });
    imageContainer.appendChild(removeIcon);

    const reader = new FileReader();
    reader.onload = function (e) {
      image.src = e.target.result;
      savedImages.push(e.target.result); // Save the image data URL
      updateSavedImages(savedImages); // Update the saved images in localStorage
    };
    reader.readAsDataURL(file);
    // } else {
    //   alert("You cannot upload more than 5 images.");
    // }
  }
}

// Load previously saved images and descriptions from localStorage
for (const savedImage of savedImages) {
  const imageDescription =
    JSON.parse(localStorage.getItem("imageDescriptions")) || {};
  addImageToPreview(savedImage, imageDescription[savedImage]);
}

// Prevent the default behavior for drag and drop
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.style.border = "2px dashed #333";
});

dropArea.addEventListener("dragleave", () => {
  dropArea.style.border = "2px dashed #ccc";
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.style.border = "2px dashed #ccc";

  const files = e.dataTransfer.files;
  handleFiles(files);
});

fileInput.addEventListener("change", (e) => {
  const files = e.target.files;
  handleFiles(files);
});

function handleFiles(files) {
  for (const file of files) {
    addImageToPreview(file);
  }
}

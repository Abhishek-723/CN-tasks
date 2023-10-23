function createImageEditor() {
  const state = {
    imageChoosen: false,
    filterValues: {
      brightness: 100,
      saturation: 100,
      inversion: 0,
      grayscale: 0,
    },
    rotateValue: 0,
    flipHorizontal: 1,
    flipVertical: 1,
  };

  const elements = {
    fileInput: document.querySelector(".file-input"),
    filterButtons: document.querySelectorAll(".filter button"),
    filterNameElement: document.querySelector(".filter-info .name"),
    filterValueElement: document.querySelector(".filter-info .value"),
    filterSliderElement: document.querySelector(".slider input"),
    rotateButtons: document.querySelectorAll(".rotate button"),
    previewImageElement: document.querySelector(".preview-img img"),
    resetFilterButton: document.querySelector(".reset-filter"),
    chooseImageButton: document.querySelector(".choose-img"),
    saveImageButton: document.querySelector(".save-img"),
  };

  function applyFilters() {
    if (!state.imageChoosen) return;
    const { brightness, saturation, inversion, grayscale } = state.filterValues;
    elements.previewImageElement.style.transform = `rotate(${state.rotateValue}deg) scale(${state.flipHorizontal}, ${state.flipVertical})`;
    elements.previewImageElement.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  }

  function handleFilterClick(button) {
    document.querySelector(".active").classList.remove("active");
    button.classList.add("active");
    elements.filterNameElement.innerText = button.innerText;
    elements.filterSliderElement.max =
      button.id === "brightness" || button.id === "saturation" ? 200 : 100;
    elements.filterSliderElement.value = state.filterValues[button.id];
    elements.filterValueElement.innerText = `${state.filterValues[button.id]}%`;
  }

  function handleRotateClick(button) {
    const actions = {
      left: () => (state.rotateValue -= 90),
      right: () => (state.rotateValue += 90),
      horizontal: () => (state.flipHorizontal = -state.flipHorizontal),
      vertical: () => (state.flipVertical = -state.flipVertical),
    };
    actions[button.id]();
    applyFilters();
  }

  function resetFilters() {
    state.filterValues = {
      brightness: 100,
      saturation: 100,
      inversion: 0,
      grayscale: 0,
    };
    state.rotateValue = 0;
    state.flipHorizontal = 1;
    state.flipVertical = 1;
    elements.filterButtons[0].click();
    applyFilters();
  }

  function saveEditedImage() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = elements.previewImageElement.naturalWidth;
    canvas.height = elements.previewImageElement.naturalHeight;

    const { brightness, saturation, inversion, grayscale } = state.filterValues;
    context.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    context.translate(canvas.width / 2, canvas.height / 2);

    if (state.rotateValue !== 0) {
      context.rotate((state.rotateValue * Math.PI) / 180);
    }

    context.scale(state.flipHorizontal, state.flipVertical);
    context.drawImage(
      elements.previewImageElement,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );

    const link = document.createElement("a");
    link.download = "edited_image.jpg";
    link.href = canvas.toDataURL();
    link.click();
  }

  function loadChosenImage() {
    const chosenFile = elements.fileInput.files[0];
    if (!chosenFile) return;
    elements.previewImageElement.src = URL.createObjectURL(chosenFile);
    elements.previewImageElement.addEventListener("load", () => {
      resetFilters();
      document.querySelector(".container").classList.remove("disable");
    });
  }

  function initialize() {
    elements.filterButtons.forEach((button) => {
      button.addEventListener("click", () => handleFilterClick(button));
    });

    elements.rotateButtons.forEach((button) => {
      button.addEventListener("click", () => handleRotateClick(button));
    });

    elements.filterSliderElement.addEventListener("input", () => {
      elements.filterValueElement.innerText = `${elements.filterSliderElement.value}%`;
      const selectedFilterButton = document.querySelector(".filter .active");
      state.filterValues[selectedFilterButton.id] =
        elements.filterSliderElement.value;
      applyFilters();
    });

    elements.resetFilterButton.addEventListener("click", () => resetFilters());
    elements.saveImageButton.addEventListener("click", () => saveEditedImage());
    elements.fileInput.addEventListener("change", () => loadChosenImage());
    elements.chooseImageButton.addEventListener("click", () => {
      elements.fileInput.click();
      state.imageChoosen = true;
    });
  }

  return {
    initialize,
  };
}

const imageEditor = createImageEditor();
imageEditor.initialize();

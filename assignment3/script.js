const wornItems = {};
let draggedElement = null;
let draggedData = null;

// Initialize images on page load
window.addEventListener("DOMContentLoaded", function () {
  // Show character base if src is set
  const charImg = document.getElementById("characterBaseImg");
  if (charImg.src && charImg.src !== window.location.href) {
    charImg.style.display = "block";
    charImg.nextElementSibling.style.display = "none";
  }

  // Load images for clothing items
  document.querySelectorAll(".clothing-item").forEach((item) => {
    const src = item.dataset.src;
    if (src && src.trim() !== "") {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Clothing item";
      // Remove placeholder and add image
      item.innerHTML = "";
      item.appendChild(img);
    }
  });
});

const clothingItems = document.querySelectorAll(".clothing-item");
const characterZone = document.getElementById("characterZone");
const wornItemsContainer = document.getElementById("wornItems");

clothingItems.forEach((item) => {
  item.addEventListener("dragstart", handleDragStart);
  item.addEventListener("dragend", handleDragEnd);
});

characterZone.addEventListener("dragover", handleDragOver);
characterZone.addEventListener("drop", handleDrop);
characterZone.addEventListener("dragleave", handleDragLeave);

function handleDragStart(e) {
  draggedElement = this;
  this.classList.add("dragging");

  draggedData = {
    type: this.dataset.type,
    src: this.dataset.src,
  };

  e.dataTransfer.effectAllowed = "copy";
}

function handleDragEnd(e) {
  this.classList.remove("dragging");
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "copy";
  characterZone.classList.add("drag-over");
}

function handleDragLeave(e) {
  if (e.target === characterZone) {
    characterZone.classList.remove("drag-over");
  }
}

function handleDrop(e) {
  e.preventDefault();
  characterZone.classList.remove("drag-over");

  if (draggedData && draggedData.src && draggedData.src.trim() !== "") {
    addClothingToCharacter(draggedData.type, draggedData.src);
  }
}

function addClothingToCharacter(type, src) {
  // Remove existing item of same type
  if (wornItems[type]) {
    const existing = document.querySelector(`.worn-item.${type}`);
    if (existing) existing.remove();
  }

  // If wearing dress, remove top and bottom
  if (type === "dress") {
    ["top", "bottom"].forEach((t) => {
      if (wornItems[t]) {
        const existing = document.querySelector(`.worn-item.${t}`);
        if (existing) existing.remove();
        delete wornItems[t];
      }
    });
  }

  // If adding top or bottom, remove dress
  if (type === "top" || type === "bottom") {
    if (wornItems["dress"]) {
      const existing = document.querySelector(`.worn-item.dress`);
      if (existing) existing.remove();
      delete wornItems["dress"];
    }
  }

  wornItems[type] = src;

  const wornItem = document.createElement("div");
  wornItem.className = `worn-item ${type}`;
  wornItem.innerHTML = `
                <img src="${src}" alt="${type}">
                <button class="remove-btn" onclick="removeItem('${type}')">✕</button>
            `;

  wornItemsContainer.appendChild(wornItem);
}

function removeItem(type) {
  const item = document.querySelector(`.worn-item.${type}`);
  if (item) {
    item.remove();
    delete wornItems[type];
  }
}

function resetOutfit() {
  wornItemsContainer.innerHTML = "";
  Object.keys(wornItems).forEach((key) => delete wornItems[key]);
}

function randomOutfit() {
  resetOutfit();

  // Get all available items by type
  const hairItems = Array.from(
    document.querySelectorAll('[data-type="hair"]')
  ).filter((item) => item.dataset.src && item.dataset.src.trim() !== "");
  const topItems = Array.from(
    document.querySelectorAll('[data-type="top"]')
  ).filter((item) => item.dataset.src && item.dataset.src.trim() !== "");
  const bottomItems = Array.from(
    document.querySelectorAll('[data-type="bottom"]')
  ).filter((item) => item.dataset.src && item.dataset.src.trim() !== "");
  const dressItems = Array.from(
    document.querySelectorAll('[data-type="dress"]')
  ).filter((item) => item.dataset.src && item.dataset.src.trim() !== "");
  const shoeItems = Array.from(
    document.querySelectorAll('[data-type="shoes"]')
  ).filter((item) => item.dataset.src && item.dataset.src.trim() !== "");
  const hatItems = Array.from(
    document.querySelectorAll('[data-type="hat"]')
  ).filter((item) => item.dataset.src && item.dataset.src.trim() !== "");
  const accessoryItems = Array.from(
    document.querySelectorAll('[data-type="accessory"]')
  ).filter((item) => item.dataset.src && item.dataset.src.trim() !== "");

  // Random hair
  if (hairItems.length > 0) {
    const randomHair = hairItems[Math.floor(Math.random() * hairItems.length)];
    addClothingToCharacter("hair", randomHair.dataset.src);
  }

  // Random: dress OR (top + bottom)
  if (dressItems.length > 0 && Math.random() > 0.5) {
    const randomDress =
      dressItems[Math.floor(Math.random() * dressItems.length)];
    addClothingToCharacter("dress", randomDress.dataset.src);
  } else {
    if (topItems.length > 0) {
      const randomTop = topItems[Math.floor(Math.random() * topItems.length)];
      addClothingToCharacter("top", randomTop.dataset.src);
    }
    if (bottomItems.length > 0) {
      const randomBottom =
        bottomItems[Math.floor(Math.random() * bottomItems.length)];
      addClothingToCharacter("bottom", randomBottom.dataset.src);
    }
  }

  // Random accessories (50% chance each)
  if (shoeItems.length > 0 && Math.random() > 0.3) {
    const randomShoes = shoeItems[Math.floor(Math.random() * shoeItems.length)];
    addClothingToCharacter("shoes", randomShoes.dataset.src);
  }
  if (hatItems.length > 0 && Math.random() > 0.5) {
    const randomHat = hatItems[Math.floor(Math.random() * hatItems.length)];
    addClothingToCharacter("hat", randomHat.dataset.src);
  }
  if (accessoryItems.length > 0 && Math.random() > 0.7) {
    const randomAccessory =
      accessoryItems[Math.floor(Math.random() * accessoryItems.length)];
    addClothingToCharacter("accessory", randomAccessory.dataset.src);
  }
}

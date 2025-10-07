const wornItems = {};
let draggedElement = null;
let draggedData = null;

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
    color: this.dataset.color,
    emoji: this.dataset.emoji,
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

  if (draggedData) {
    addClothingToCharacter(
      draggedData.type,
      draggedData.color,
      draggedData.emoji
    );
  }
}

function addClothingToCharacter(type, color, emoji) {
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

  wornItems[type] = { color, emoji };

  const wornItem = document.createElement("div");
  wornItem.className = `worn-item ${type}`;

  if (emoji) {
    wornItem.innerHTML = `
                    <div style="font-size: 4em; text-align: center;">${emoji}</div>
                    <button class="remove-btn" onclick="removeItem('${type}')">✕</button>
                `;
  } else if (color) {
    wornItem.innerHTML = `
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
                        ${getClothingSVG(type, color)}
                    </svg>
                    <button class="remove-btn" onclick="removeItem('${type}')">✕</button>
                `;
  }

  wornItemsContainer.appendChild(wornItem);
}

function getClothingSVG(type, color) {
  switch (type) {
    case "hair":
      return `
                        <ellipse cx="50" cy="40" rx="45" ry="35" fill="${color}"/>
                        <ellipse cx="30" cy="50" rx="20" ry="30" fill="${color}"/>
                        <ellipse cx="70" cy="50" rx="20" ry="30" fill="${color}"/>
                    `;
    case "top":
      return `
                        <rect x="20" y="30" width="60" height="50" fill="${color}" rx="10"/>
                        <rect x="10" y="35" width="20" height="40" fill="${color}" rx="8"/>
                        <rect x="70" y="35" width="20" height="40" fill="${color}" rx="8"/>
                    `;
    case "bottom":
      return `
                        <rect x="25" y="20" width="20" height="60" fill="${color}" rx="8"/>
                        <rect x="55" y="20" width="20" height="60" fill="${color}" rx="8"/>
                    `;
    case "dress":
      return `
                        <rect x="20" y="10" width="60" height="30" fill="${color}" rx="10"/>
                        <path d="M 20 40 L 10 90 L 90 90 L 80 40 Z" fill="${color}"/>
                    `;
    default:
      return `<rect x="10" y="10" width="80" height="80" fill="${color}" rx="10"/>`;
  }
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

  const hairColors = ["#4a3728", "#f4e4c1", "#1a1a1a", "#c41e3a"];
  const topColors = ["#ffb3d9", "#87ceeb", "#ffffff", "#98d8c8"];
  const bottomColors = ["#4169e1", "#1a1a1a", "#d4a5d4", "#f0e68c"];
  const dressColors = ["#e6b3ff", "#ffb3ba", "#bae1ff", "#ffffba"];
  const hats = ["🎩", "👑", "🧢", "🎀"];
  const shoes = ["👟", "👠", "🥾", "👢"];
  const accessories = ["👓", "🕶️", "🎒", "👜"];

  // Random hair
  addClothingToCharacter(
    "hair",
    hairColors[Math.floor(Math.random() * hairColors.length)]
  );

  // Random: dress OR (top + bottom)
  if (Math.random() > 0.5) {
    addClothingToCharacter(
      "dress",
      dressColors[Math.floor(Math.random() * dressColors.length)]
    );
  } else {
    addClothingToCharacter(
      "top",
      topColors[Math.floor(Math.random() * topColors.length)]
    );
    addClothingToCharacter(
      "bottom",
      bottomColors[Math.floor(Math.random() * bottomColors.length)]
    );
  }

  // Random accessories (50% chance each)
  if (Math.random() > 0.5) {
    addClothingToCharacter(
      "hat",
      null,
      hats[Math.floor(Math.random() * hats.length)]
    );
  }
  if (Math.random() > 0.3) {
    addClothingToCharacter(
      "shoes",
      null,
      shoes[Math.floor(Math.random() * shoes.length)]
    );
  }
  if (Math.random() > 0.7) {
    addClothingToCharacter(
      "accessory",
      null,
      accessories[Math.floor(Math.random() * accessories.length)]
    );
  }
}

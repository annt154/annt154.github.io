let draggedItem = null; // Item đang kéo
let zIndex = 1; // Counter cho z-index
let history = []; // Lưu lịch sử các action để Back

// ==========================================
// KHỞI TẠO
// ==========================================
window.onload = function () {
  setupDrag(); // Thiết lập drag & drop
};
let play = document.getElementById("play");
function playMusic() {
  let audio = new Audio("p-hase_Leapt.mp3");
  audio.play();
}
play.addEventListener(playMusic);

// ==========================================
// THIẾT LẬP DRAG & DROP
// ==========================================
function setupDrag() {
  let items = document.querySelectorAll(".item");
  let canvas = document.getElementById("canvas");

  // === VỚI MỖI ITEM ===
  items.forEach(function (item) {
    // Bắt đầu kéo
    item.addEventListener("dragstart", function (e) {
      draggedItem = this;
      this.style.opacity = "0.4";
    });

    // Kết thúc kéo
    item.addEventListener("dragend", function () {
      this.style.opacity = "1";
      draggedItem = null;
    });
  });

  // === CHO CANVAS ===
  // Cho phép drop
  canvas.addEventListener("dragover", function (e) {
    e.preventDefault();
  });

  // Khi thả vào canvas
  canvas.addEventListener("drop", function (e) {
    e.preventDefault();

    if (draggedItem) {
      // Lấy ảnh
      let img = draggedItem.querySelector("img");
      let src = img.src;

      // Kiểm tra có ảnh không
      if (src && src !== window.location.href) {
        // Lấy VỊ TRÍ CỐ ĐỊNH từ data attributes
        let x = draggedItem.getAttribute("data-x") || 150;
        let y = draggedItem.getAttribute("data-y") || 150;
        let w = draggedItem.getAttribute("data-width") || 150;
        let h = draggedItem.getAttribute("data-height") || 150;

        // Chuyển sang số
        x = parseInt(x);
        y = parseInt(y);
        w = parseInt(w);
        h = parseInt(h);

        // Thêm ảnh vào canvas tại vị trí cố định
        addImage(src, x, y, w, h);
      }
    }
  });
}

// ==========================================
// THÊM ẢNH VÀO CANVAS (VỊ TRÍ CỐ ĐỊNH)
// ==========================================
function addImage(src, x, y, w, h) {
  let canvas = document.getElementById("canvas");

  // Tạo div chứa ảnh
  let div = document.createElement("div");
  div.className = "dropped-img";

  // Tăng z-index (cái nào add sau nằm trên)
  zIndex++;
  div.style.zIndex = zIndex;

  // Đặt vị trí CỐ ĐỊNH và kích thước
  div.style.left = x + "px";
  div.style.top = y + "px";
  div.style.width = w + "px";
  div.style.height = h + "px";

  // Thêm ảnh và nút X
  div.innerHTML = `
                <img src="${src}" alt="">
                <button class="remove" onclick="removeImage(this)">✕</button>
            `;

  // Thêm vào canvas
  canvas.appendChild(div);

  // Lưu vào history để có thể Back
  history.push(div);

  // KHÔNG GỌI makeDraggable - ảnh sẽ không di chuyển được
}

// ==========================================
// XÓA ẢNH
// ==========================================
function removeImage(btn) {
  let div = btn.parentElement;

  // Xóa khỏi history
  let index = history.indexOf(div);
  if (index > -1) {
    history.splice(index, 1);
  }

  // Xóa khỏi canvas
  div.remove();
}

// ==========================================
// BACK (Xóa ảnh cuối cùng được thêm)
// ==========================================
function goBack() {
  // Lấy ảnh cuối cùng trong history
  if (history.length > 0) {
    let lastItem = history.pop(); // Lấy và xóa khỏi history
    lastItem.remove(); // Xóa khỏi canvas
  }
}

// ==========================================
// XÓA TẤT CẢ (GIỮ LẠI NHÂN VẬT)
// ==========================================
function clearCanvas() {
  // Xóa tất cả ảnh đã drop (nhưng giữ lại character-main)
  let canvas = document.getElementById("canvas");
  let droppedImages = canvas.querySelectorAll(".dropped-img");

  droppedImages.forEach(function (img) {
    img.remove();
  });

  // Reset
  history = [];
  zIndex = 1;
}

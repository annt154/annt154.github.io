let draggedItem = null; // // Stores the item dragged
let zIndex = 1; // Counter for z-index to manage layering (items added later appear on top)
let history = []; // Save the history so the back button is able to act

window.onload = function () {
  setupDrag(); // To set up Drag and Drop func
  autoPlayMusic(); // Making the music auto playing from the beginning like the usual dress up game
};
let isMuted = false;

// Function to toggle background music on and off
function toggleMusic() {
  let song = document.getElementById("song");
  let btn = document.getElementById("musicBtn");
  let icon = document.getElementById("musicIcon"); // Get the image element for the icon

  if (isMuted) {
    // Current state is Muted = Turn on the music
    song.play();
    icon.src = "volume-mute.png"; // When the music off, the icon switched to mute
    btn.classList.remove("muted"); //remove mute = turn on the music
    isMuted = false;
  } else {
    // Turn off the music
    song.pause();
    icon.src = "volume-mute.png"; // Turn to the mute icon when click again
    btn.classList.add("muted"); // Add the 'muted' style class
    isMuted = true;
  }
}

window.addEventListener("click", () => {
  //add event so when using click interaction, it gonna switch the icon as well as the music display or not
  document.getElementById("song").play; // Attempt to play the song
});

// Setting up drag and drop func
function setupDrag() {
  let items = document.querySelectorAll(".item");
  let canvas = document.getElementById("canvas");

  // For each item
  items.forEach(function (item) {
    // Start of dragging
    item.addEventListener("dragstart", function (e) {
      draggedItem = this; // Store the reference to the dragged item
      this.style.opacity = "0.4"; // change the opacity during drag => make user feel interactive
    });

    // end of dragging
    item.addEventListener("dragend", function () {
      this.style.opacity = "1"; // Restore the opacity
      draggedItem = null; // Clear the dragged item reference
    });
  });

  // Events for the drop zone
  // Prevent default handling to allow dropping
  canvas.addEventListener("dragover", function (e) {
    e.preventDefault();
  });

  // When droping to the main figure
  canvas.addEventListener("drop", function (e) {
    e.preventDefault();

    if (draggedItem) {
      // Get the image source from the dragged item
      let img = draggedItem.querySelector("img");
      let src = img.src;

      // Recheck if have pic or not
      if (src && src !== window.location.href) {
        // Retrieve Fixed and Dimension from data attributes
        let x = draggedItem.getAttribute("data-x") || 150;
        let y = draggedItem.getAttribute("data-y") || 150;
        let w = draggedItem.getAttribute("data-width") || 150;
        let h = draggedItem.getAttribute("data-height") || 150;

        // Convert attributes to integers
        x = parseInt(x);
        y = parseInt(y);
        w = parseInt(w);
        h = parseInt(h);

        // add image to a default/particular position
        addImage(src, x, y, w, h);
      }
    }
  });
}

// Function to create and add the image element to the canvas
function addImage(src, x, y, w, h) {
  let canvas = document.getElementById("canvas");

  // Create a container div for the dropped image
  let div = document.createElement("div");
  div.className = "dropped-img";
  div.dataset.src = src; // Store the image source for tracking, for 'Back' and 'reset' functions

  // Increse the z-index so the new item is layered on top of previous items  zIndex++;
  div.style.zIndex = zIndex;

  // Set the fixed position and size using values from data attributes
  div.style.left = x + "px";
  div.style.top = y + "px";
  div.style.width = w + "px";
  div.style.height = h + "px";

  // Insert the image tag inside the container div
  div.innerHTML = `<img src="${src}" alt="">`;

  // Append the new item to the canvas
  canvas.appendChild(div);

  // Save the dropped element to the history for undo functionality
  history.push(div);

  // Update the sidebar item to show it has been used so player wont drag it again to the main canvas
  markItemAsUsed(src);
}

// Function to see the mark of used items and add a remove button
function markItemAsUsed(src) {
  let items = document.querySelectorAll(".item");

  items.forEach(function (item) {
    let img = item.querySelector("img");
    if (img && img.src === src) {
      // mark the used elements/clothes
      item.classList.add("used");

      // Kiểm tra đã có nút X chưa
      if (!item.querySelector(".remove-item")) {
        // Add the X button
        let removeBtn = document.createElement("button");
        removeBtn.className = "remove-item";
        removeBtn.textContent = "✕";
        removeBtn.onclick = function () {
          // activate clicking action
          removeImageFromCanvas(src);
        };
        item.appendChild(removeBtn);
      }
    }
  });
}

// delete a particular element from canvas so when we draged/layered many clothes in and there are some particular clothes that we want to remove, and the go back button is not able to delete a particular item so i think putting a remove button on each clothing items in the canva panel is nessesary so the player can delete a particular item which i think will be more convienient than deleting all of the stuff and replay because when i play and click remove all , it feel so unmotivated and want to give up if reset all.
function removeImageFromCanvas(src) {
  let canvas = document.getElementById("canvas");
  let droppedImages = canvas.querySelectorAll(".dropped-img");

  // Find and remove the source that match to the one they want to delete
  droppedImages.forEach(function (img) {
    if (img.dataset.src === src) {
      // Xóa khỏi canvas
      img.remove();

      // Xóa khỏi history
      let index = history.indexOf(img);
      if (index > -1) {
        history.splice(index, 1);
      }

      // Bỏ đánh dấu "used" trong sidebar
      unmarkItemAsUsed(src);
    }
  });
}

// BỎ ĐÁNH DẤU ITEM ĐÃ DÙNG
function unmarkItemAsUsed(src) {
  let items = document.querySelectorAll(".item");

  items.forEach(function (item) {
    let img = item.querySelector("img");
    if (img && img.src === src) {
      // remove class used
      item.classList.remove("used");

      // Remove the X button
      let removeBtn = item.querySelector(".remove-item");
      if (removeBtn) {
        removeBtn.remove();
      }
    }
  });
}

// go back to the previous action function
function goBack() {
  // Lấy ảnh cuối cùng trong history
  if (history.length > 0) {
    let lastItem = history.pop();
    let src = lastItem.dataset.src;

    // Delete the last item from the previous action
    lastItem.remove();

    // remove the marks of that item that jus go back from the prvious action
    unmarkItemAsUsed(src);
  }
}

// Delete all jus keep the figure

function clearCanvas() {
  // This func allow to delete all the clothes elements jus keep the figure body
  let canvas = document.getElementById("canvas");
  let droppedImages = canvas.querySelectorAll(".dropped-img");

  droppedImages.forEach(function (img) {
    img.remove();
  });

  // At the same time, when delete all the elements except for the firgure body, all of the marks of used items gonna be delete also
  let allItems = document.querySelectorAll(".item");
  allItems.forEach(function (item) {
    item.classList.remove("used");
    let removeBtn = item.querySelector(".remove-item");
    if (removeBtn) {
      removeBtn.remove();
    }
  });

  // Reset
  history = [];
  zIndex = 1;
}

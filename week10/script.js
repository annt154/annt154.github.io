const hoverClickButton = document.querySelector("#hoverclick-button");
console.log(hoverClickButton);
hoverClickButton.addEventListener("click", gotoFlip);
function gotoFlip() {
  window.location.href = "flip.html";
}

const dragdropButton = document.querySelector("#dragdrop-button");
console.log(dragdropButton);
dragdropButton.addEventListener("click", dragdropFlip);
function gotodragdrop() {
  window.location.href = "dragdrop.html";
}

//I need to access the play button

const playButton = document.querySelector("#play-button");
console.log(playButton);

const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

//I should also access the audio so
//that I can contrl with my buttons
const myAudio = document.querySelector("#my-audio");
console.log(myAudio);

const myVideo = document.querySelector("#my-video");
console.log(playButton);

// let us add a click event listener so that whenever
// someone click on the play button we can play the audio

playButton.addEventListener("click", playAudio);

function playAudio() {
  myAudio.play();
}

pauseButton.addEventListener("click", pauseAudio);

function pauseAudio() {
  myAudio.pause();
}

//my logic for creating a popping sound effect
//first, I need to access the popping sounf
const popSound = document.querySelector("#pop-sound");
console.log(popSound);

//I need to access the button and listen to clicks on it.
//so whenever someone clicks on that button,
//we hear a popping sounf.
const popButton = document.querySelector("#pop-button");
console.log(popButton);

popButton.addEventListener("click", popAudio);

function popAudio() {
  popSound.play();
}

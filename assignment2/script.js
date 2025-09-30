let currentMusic = 0; // Index of the currently selected song in songs sec

// Cache DOM elements for performance and readability
const music = document.querySelector("#audio");

const seekBar = document.querySelector(".seek-bar");
const songName = document.querySelector(".music-name");
const artistName = document.querySelector(".artist-name");
const disk = document.querySelector(".disk");
const currentTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".song-duration");
const playButton = document.querySelector(".play-button");
const forwardButton = document.querySelector(".forward-button");
const backwardButton = document.querySelector(".backward-button");
const muteButton = document.querySelector(".mute-button");
const volumeIcon = document.getElementById("volume-icon");

playButton.addEventListener("click", () => {
  //make a boolen stating if people click to play but =>play and else will pause
  if (playButton.className.includes("pause")) {
    music.play();
  } else {
    music.pause();
  }
  playButton.classList.toggle("pause");
  disk.classList.toggle("play"); // if play then the disk gonna spin when play
  updatePlaylistActiveState();
});

// music display
// Load a song by index
const setMusic = (i) => {
  seekBar.value = 0; //set range slide value
  let song = songs[i]; //print out songs in the section
  currentMusic = i; // Update current index
  music.src = song.path;

  songName.innerHTML = song.name; //display the song name took from data to put in the song.name template
  artistName.innerHTML = song.artist; //display the song artist name took from data to put in the song.artist template
  disk.style.backgroundImage = `url('${song.cover}')`; //displayr the cover pic took from data to put in the placement template

  currentTime.innerHTML = "00:00"; // Update current index
  setTimeout(() => {
    seekBar.max = music.duration;
    musicDuration.innerHTML = formatTime(music.duration);
  }, 300);
};

setMusic(0); //loads the first track into the player.

const formatTime = (time) => {
  let min = Math.floor(time / 60);
  if (min < 10) {
    min = `0${min}`;
  }
  let sec = Math.floor(time % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min} : ${sec}`;
};

//seek bar running
setInterval(() => {
  //Runs the enclosed function every 500 milliseconds (half a second).
  //This is used to continuously update the UI while the song is playing.
  seekBar.value = music.currentTime;
  currentTime.innerHTML = formatTime(music.currentTime);
  if (Math.floor(music.currentTime) == Math.floor(seekBar.max)) {
    forwardButton.click();
  }
  updatePlaylistActiveState();
}, 500);

seekBar.addEventListener("change", () => {
  music.currentTime = seekBar.value;
});

const playMusic = () => {
  music.play();
  playButton.classList.remove("pause");
  disk.classList.add("play");
};

//changing song function
forwardButton.addEventListener("click", () => {
  // Next on click
  if (currentMusic >= songs.length - 1) {
    currentMusic = 0;
  } else {
    currentMusic++;
  }
  setMusic(currentMusic);
  playMusic();
});

backwardButton.addEventListener("click", () => {
  // Previous on click
  if (currentMusic <= 0) {
    currentMusic = songs.length - 1;
  } else {
    currentMusic--;
  }
  setMusic(currentMusic);
  playMusic();
});

// Change song in playlist logic
function changeSong(index) {
  //name the func
  setMusic(index); //loads the chosen song into the audio player and updates the UI
  playMusic(); //after the song loaded, this function starts playback immediately and also updates the interface
}

const playlistItems = document.querySelectorAll(".playlist ol li"); //grabbing every track listed in the playlist

playlistItems.forEach((item, index) => {
  //Loops through each <li> track item.
  item.addEventListener("click", () => {
    changeSong(index);
  });
});

// Mute/unmute logic, if click to the volumn butt=> song sounds dis and vice versa.
muteButton.addEventListener("click", () => {
  if (music.muted) {
    music.muted = false;
    volumeIcon.src = "volume-up.png"; // if click this icon will appear and vice versa
    muteButton.classList.remove("is-muted");
  } else {
    music.muted = true;
    volumeIcon.src = "volume-mute.png";
    muteButton.classList.add("is-muted");
  }
});

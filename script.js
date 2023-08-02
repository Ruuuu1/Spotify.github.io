// script.js

console.log("Welcome to Spotify");
// Initialization of variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songList = document.getElementsByClassName('songlistplay');
let songInfo = document.querySelector('.songInfo');

// Song data
let songs = [
  { songName: "Tum Kya Mile", filePath: "song/1.mp3", coverPath: "covers/1.jpeg" },
  { songName: "Balenciaga", filePath: "song/2.mp3", coverPath: "covers/2.jpeg" },
  { songName: "Dil Se Dil Tak", filePath: "song/3.mp3", coverPath: "covers/3.jpeg" },
  { songName: "Gujju Patka", filePath: "song/4.mp3", coverPath: "covers/4.jpeg" },
  { songName: "Ek Ghar", filePath: "song/5.mp3", coverPath: "covers/5.jpeg" },
  { songName: "Pasoori", filePath: "song/6.mp3", coverPath: "covers/6.jpeg" },
  { songName: "Sanam Kamleya", filePath: "song/7.mp3", coverPath: "covers/7.jpeg" },
  { songName: "Sanam Teri Kasam", filePath: "song/8.mp3", coverPath: "covers/8.jpeg" },
  { songName: "Aaj Ke Baad", filePath: "song/9.mp3", coverPath: "covers/9.jpeg" },
  { songName: "Tum Hi Ho", filePath: "song/10.mp3", coverPath: "covers/10.jpeg" }
];
// Function to play the current song
function playSong() {
  audioElement.play();
  masterPlay.classList.remove('fa-regular', 'fa-circle-play');
  masterPlay.classList.add('fa-solid', 'fa-circle-pause');
  gif.style.opacity = 1;
}

// Function to pause the current song
function pauseSong() {
  audioElement.pause();
  masterPlay.classList.remove('fa-solid', 'fa-circle-pause');
  masterPlay.classList.add('fa-regular', 'fa-circle-play');
  gif.style.opacity = 0;
}

// Function to load and play the selected song
function loadSong(index) {
  songIndex = index;
  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0; // Reset the song to start
  playSong();

  // Update the song name in the songInfo div
  let songInfoElement = document.querySelector('.songInfo');
  songInfoElement.innerHTML = `<img src="${songs[songIndex].coverPath}" width="42px" alt="" id="gif">${songs[songIndex].songName}`;
}

// Handle play/pause click
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    playSong();
  } else {
    pauseSong();
  }
});

// Function to play the next song
function playNextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
}

// Function to play the previous song
function playPrevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
}

// Handle next button click
document.querySelector('.fa-forward').addEventListener('click', () => {
  playNextSong();
});

// Handle previous button click
document.querySelector('.fa-backward').addEventListener('click', () => {
  playPrevSong();
});

// Update the song progress bar and timestamp based on the current time
audioElement.addEventListener('timeupdate', () => {
  let progress = (audioElement.currentTime / audioElement.duration) * 100;
  myProgressBar.value = progress;

  // Update the timestamp
  let currentTime = formatTime(audioElement.currentTime);
  let duration = formatTime(audioElement.duration);
  let timestampText = currentTime + ' / ' + duration;
  songInfo.innerHTML = `<img src="${songs[songIndex].coverPath}" width="42px" alt="" id="gif">${songs[songIndex].songName} ${timestampText}`;
});

// Change the song time when the progress bar is adjusted
myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Function to format time in mm:ss format
function formatTime(timeInSeconds) {
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = Math.floor(timeInSeconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Add event listener to each song item to play the selected song
for (let i = 0; i < songList.length; i++) {
  songList[i].addEventListener('click', () => {
    loadSong(i);
  });
}

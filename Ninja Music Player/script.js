// Write your javascript here

tracks = [
  {
    name: "Let me down slowly",
    artist: "Alec Benjamin",
    cover: "Images/alec.jpg",
    source: "Audio/Let me down slowly.mp3",
  },
  {
    name: "Let me love you",
    artist: "DJ Snake/Justin Beiber",
    cover: "Images/dj.jpg",
    source: "Audio/Let me love you.mp3",
  },
  {
    name: "Perfect",
    artist: "Ed Sheeran",
    cover: "Images/ed.jfif",
    source: "Audio/Perfect.mp3",
  },
];

const audio = new Audio();
const audioImg = document.getElementById("audio-img");
const audioTitle = document.getElementById("audio-title");
const singer = document.getElementById("audio-singer");
const playBtn = document.getElementById("playSong");
const prevBtn = document.getElementById("playPrev");
const nextBtn = document.getElementById("playNext");
const progress = document.getElementById("progress-container");
const progressBar = document.getElementById("progress-bar");
const progressHead = document.getElementById("progress-head");
const currentTimeElem = document.getElementById("currentTime");
const totalTimeElem = document.getElementById("totalTime");
let currSong = 0;
let isPlaying = false;
let playTime = 0;

function playSong() {
  const song = tracks[currSong];
  console.log(song);
  audioImg.setAttribute("src", song.cover);
  audioTitle.innerText = song.name;
  audio.src = song.source;
  audio.currentTime = playTime;
  audio.play();
  isPlaying = true;
  singer.innerText = song.artist;
  playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function pauseSong() {
  audio.pause();
  playTime = audio.currentTime;
  isPlaying = false;
  playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
}

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", () => {
  playTime = 0;
  currSong = (currSong - 1 + tracks.length) % tracks.length;
  playSong();
});

nextBtn.addEventListener("click", () => {
  playTime = 0;
  currSong = (currSong + 1 + tracks.length) % tracks.length;
  playSong();
});

audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressBarWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressBarWidth}%`;
    progressHead.style.left = `${progressBarWidth}%`;
    currentTimeElem.innerText = formatTime(currentTime);
    totalTimeElem.innerText = formatTime(duration);
  }
});

progress.addEventListener("click", (e) => {
  const maxduration = audio.duration;
  const position =
    (e.clientX - progress.getBoundingClientRect().left) / progress.clientWidth;
  const seekTime = maxduration * position;
  playTime = seekTime;
  audio.currentTime = seekTime;
});

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

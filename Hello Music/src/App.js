import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Components/Navbar";
import "./App.css";
import chillHop from "./data";

const App = () => {
  const songs = chillHop();
  const [currSong, setCurrSong] = useState(songs[0]);
  const [songIndex, setSongIndex] = useState(0);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const progressBarRef = useRef(null);
  const progressHeadRef = useRef(null);

  const playSong = () => {
    const audio = audioRef.current;
    audio.src = currSong.audio;
    audio.currentTime = currentTime;
    audio.play();
    setIsPlaying(true);
  };
  const pauseSong = () => {
    const audio = audioRef.current;
    audio.pause();
    setIsPlaying(false);
  };
  useEffect(() => {
    const audio = audioRef.current;

    // Add timeupdate event listener
    const handleTimeUpdate = () => {
      if (!isNaN(audio.duration)) {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        const progressBarWidth = (currentTime / duration) * 100;

        // Update state with the current time and duration
        setCurrentTime(currentTime);
        setDuration(duration);

        // Update the progress bar
        progressBarRef.current.style.width = `${progressBarWidth}%`;
        progressHeadRef.current.style.left = `${progressBarWidth}%`;
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    // Clean up the event listener on component unmount
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);
  useEffect(() => {
    if (currSong !== songs[0]) playSong();
  }, [currSong]);

  const prevSong = () => {
    setCurrentTime(0);

    const newIndex = (songIndex - 1 + songs.length) % songs.length;
    setSongIndex(newIndex);
    setCurrSong(songs[newIndex]);
  };
  const nextSong = () => {
    setCurrentTime(0);
    const newIndex = (songIndex + 1) % songs.length;
    setSongIndex(newIndex);
    setCurrSong(songs[newIndex]);
  };
  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    const maxduration = duration;
    const progress = document.getElementById("progress-container");
    const position =
      (e.clientX - progress.getBoundingClientRect().left) /
      progress.clientWidth;
    const seekTime = maxduration * position;

    setCurrentTime(seekTime);
    audio.currentTime = seekTime;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return (
    <>
      <Navbar
        setCurrentTime={setCurrentTime}
        setCurrSong={setCurrSong}
        setSongIndex={setSongIndex}
      />
      <div class="song-container">
        <div class="audio-img-wrapper">
          <div class="audio-img">
            <img src={currSong.cover} alt="" class="img" id="audio-img" />
          </div>

          <h2 class="audio-title" id="audio-title">
            {currSong.name}
          </h2>
          <h6 class="audio-singer" id="audio-singer">
            {currSong.artist}
          </h6>
        </div>

        <div className="player-container">
          <div class="audio-progress">
            <div
              class="progress"
              id="progress-container"
              onClick={handleProgressClick}
            >
              <div
                className="progress-bar"
                id="progress-bar"
                ref={progressBarRef}
                //   onClick={handleProgressClick}
              ></div>
              <div
                class="progress-head"
                id="progress-head"
                ref={progressHeadRef}
              ></div>
            </div>
            <div class="time">
              <div class="current-duration" id="currentTime">
                {formatTime(currentTime)}
              </div>
              <div class="total-duration" id="totalTime">
                {formatTime(duration)}
              </div>
            </div>
          </div>

          <div class="audio-btns">
            <button class="btn skip-back" id="playPrev" onClick={prevSong}>
              <i class="fa-solid fa-backward-step"></i>
            </button>

            <button class="btn play" onClick={isPlaying ? pauseSong : playSong}>
              <span id="playSong">
                {isPlaying ? (
                  <i class="fas fa-pause"></i>
                ) : (
                  <i class="fa-solid fa-play"></i>
                )}{" "}
              </span>
            </button>

            <button class="btn skip-forward" id="playNext" onClick={nextSong}>
              <i class="fa-solid fa-forward-step"></i>
            </button>
          </div>
        </div>
        <audio ref={audioRef}></audio>
      </div>
    </>
  );
};

export default App;

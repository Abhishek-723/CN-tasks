import React, { useEffect, useState } from "react";
import "../Styles/Navbar.css";
import chillHop from "../data";

const Navbar = ({ setCurrSong, setCurrentTime, setSongIndex }) => {
  const songs = chillHop();
  const [allSongs, setAllSongs] = useState(songs);
  const [showSongs, setShowSongs] = useState(true);
  const hideSongs = () => {
    const sideBar = document.getElementById("allSongs");
    let x = sideBar.clientWidth;
    // x += 40;
    sideBar.style.transform = `translateX(${-x}px)`; // Add 'px' or any other unit you want
    setShowSongs(false);
    document.getElementById("background").style.display = "none";
  };
  useEffect(() => {
    hideSongs();
  }, []);
  const hideNav = () => {
    if (showSongs) {
      hideSongs();
    }
  };
  const showNav = () => {
    const sideBar = document.getElementById("allSongs");
    let x = sideBar.clientWidth;
    // x += 40;
    sideBar.style.transform = `translateX(${x}px)`; // Add 'px' or any other unit you want
    setShowSongs(true);
    document.getElementById("background").style.display = "inline-block";
  };
  const playCurrSong = (index) => {
    setCurrentTime(0);
    setCurrSong(songs[index]);
    setSongIndex(index);
  };
  return (
    <div>
      <div className="nav-container">
        <p style={{ fontSize: 22 }}>Hello Music</p>
        <button onClick={showNav} className="btn-library">
          All Songs <i class="fa-solid fa-music"></i>
        </button>
      </div>
      <div className="sidebar" id="background" onClick={hideNav}>
        <div
          className="all_songs"
          id="allSongs"
          onClick={(e) => e.stopPropagation()}
        >
          <h3>All Songs</h3>
          <div className="library-container">
            {allSongs.map((song, index) => (
              <div
                className="library-song-container"
                key={song.id}
                onClick={() => playCurrSong(index)}
              >
                <div className="cover-image">
                  <img src={song.cover} alt="" />
                </div>
                <div className="song-info">
                  <h4>{song.name}</h4>
                  <p>{song.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

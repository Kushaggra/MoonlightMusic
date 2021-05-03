import React from "react";
import "./styles.css";
export default function SongList({ track, chooseTrack }) {
  function handlePlay() {
    chooseTrack(track);
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center col-sm-6 col-md-4 col-lg-3"
      style={{ cursor: "pointer" }}
      onClick={handlePlay}
    >
    <div className="wrapper">
        <div className="news">
          <figure className="article">
            <img src={track.albumUrl.url} alt={track.title} />

            <figcaption>
              <h3>{track.title}</h3>
              <br/>
              <p>{track.artist}</p>
            </figcaption>
          </figure>
        </div>
      </div>
     </div>
  );
}

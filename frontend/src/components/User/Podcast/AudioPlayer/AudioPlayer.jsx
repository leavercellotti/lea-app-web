import React from "react";
import s from "./style.module.css";

const AudioPlayer = ({ audioSrc, audioTitle }) => {
    return (
        <div className={s.audioPlayerContainer}>
            <h2 className={s.audioTitle}>{audioTitle}</h2>
            <audio controls className={s.audioElement}>
                <source src={audioSrc} type="audio/mp4" />
                Votre navigateur ne supporte pas l'élément audio.
            </audio>
        </div>
    );
}

export default AudioPlayer;

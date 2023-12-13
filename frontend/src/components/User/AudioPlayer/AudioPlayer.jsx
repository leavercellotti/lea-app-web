import React from "react";
import s from "./style.module.css";

const AudioPlayer = ({ audioSrc, audioTitle }) => {
    return (
        <div className={s.audioPlayerContainer}>
            <h2 className={s.audioTitle}>{audioTitle}</h2>
            <audio controls className={s.audioElement}>
                <source src={audioSrc} type="audio/mp3" />
                Votre navigateur ne supporte pas l'élément audio.
            </audio>
            <a href={audioSrc} download className={s.downloadLink}>
                Télécharger l'audio
            </a>
        </div>
    );
}

export default AudioPlayer;

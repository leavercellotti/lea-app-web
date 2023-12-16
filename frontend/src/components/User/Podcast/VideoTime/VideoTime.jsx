import React, { useEffect, useState } from 'react'
import s from "./style.module.css"

function VideoTime({audioSrc}) {
    const [videoTime, setVideoTime] = useState(null);

  useEffect(() => {
    const audio = new Audio(audioSrc);

    // Attacher un gestionnaire d'événement pour obtenir la durée une fois qu'elle est chargée
    audio.addEventListener('loadedmetadata', () => {
      setVideoTime(formatTime(audio.duration));
    });

    // Charger le fichier audio
    audio.load();

    // Nettoyer l'événement lors du démontage du composant
    return () => {
      audio.removeEventListener('loadedmetadata', () => {});
    };
  }, [audioSrc]);

  // Fonction pour formater la durée (peut être ajustée selon les besoins)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className={s.container}>
      {videoTime}
    </div>
  )
}

export default VideoTime
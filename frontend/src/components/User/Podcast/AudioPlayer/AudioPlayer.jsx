import React, { useRef, useState, useEffect } from "react";
import s from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addPodcastListenedArray } from "../../../../store/user-slice";
import { UserAPI } from "../../../../api/user-api";

const AudioPlayer = ({ audioSrc, audioTitle, _id }) => {
    const dispatch =useDispatch()
    const user_id = useSelector(store => store.USER._id)
    const token = useSelector(store => store.USER.token)
    const audioRef = useRef(null);
    const [isAudioPlayed, setIsAudioPlayed] = useState(false);
    const [isAudioCompleted, setIsAudioCompleted] = useState(false);
    const listenedBackend = async () => {    
        // Make API call to update user's liked podcasts
        try {
          await UserAPI.updateListenedPodcasts(token, user_id, _id);
        } catch (error) {
          console.error('Error updating user listened podcasts:', error);
        }
      };
  useEffect(() => {
    const audioElement = audioRef.current;

    const handleAudioPlay = () => {
      setIsAudioPlayed(true);
      setIsAudioCompleted(false);
      listenedBackend()
      dispatch(addPodcastListenedArray(_id));
    };

    const handleAudioEnded = () => {
      setIsAudioCompleted(true);
    };

    audioElement.addEventListener("play", handleAudioPlay);
    audioElement.addEventListener("ended", handleAudioEnded);

    return () => {
      audioElement.removeEventListener("play", handleAudioPlay);
      audioElement.removeEventListener("ended", handleAudioEnded);
    };
  }, []);

  return (
    <div className={s.audioPlayerContainer}>
      <h2 className={s.audioTitle}>{audioTitle}</h2>
      <audio ref={audioRef} controls className={s.audioElement}>
        <source src={audioSrc} type="audio/mp3" />
        Votre navigateur ne supporte pas l'élément audio.
      </audio>
      {/* {isAudioCompleted && <p>L'audio a été écouté complètement.</p>} */}
    </div>
  );
};

export default AudioPlayer;
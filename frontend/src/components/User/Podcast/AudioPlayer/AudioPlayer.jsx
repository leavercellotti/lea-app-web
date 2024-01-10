import React, { useRef, useState, useEffect } from "react";
import s from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addPodcastListenedArray } from "../../../../store/user-slice";
import { UserAPI } from "../../../../api/user-api";

const AudioPlayer = ({ audioSrc, audioTitle, _id }) => {
    const dispatch =useDispatch()
    const user_id = useSelector(store => store.USER._id)
    const audioRef = useRef(null);
    const [isAudioPlayed, setIsAudioPlayed] = useState(false);
    const [isAudioCompleted, setIsAudioCompleted] = useState(false);
    const listenedBackend = async () => {    
        // Make API call to update user's liked podcasts
        try {
          const response = await UserAPI.updateListenedPodcasts(user_id, _id);
          if (response) {
            console.log('User listened podcasts updated successfully.');
          } else {
            console.error('Failed to update user listened podcasts.');
          }
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
        <source src={audioSrc} type="audio/mp4" />
        Votre navigateur ne supporte pas l'élément audio.
      </audio>
      {isAudioPlayed && !isAudioCompleted && (
        <p>L'audio est en cours de lecture.</p>
      )}
      {isAudioCompleted && <p>L'audio a été écouté complètement.</p>}
    </div>
  );
};

export default AudioPlayer;

// import React from "react";
// import s from "./style.module.css";

// const AudioPlayer = ({ audioSrc, audioTitle }) => {
//     return (
//         <div className={s.audioPlayerContainer}>
//             <h2 className={s.audioTitle}>{audioTitle}</h2>
//             <audio controls className={s.audioElement}>
//                 <source src={audioSrc} type="audio/mp4" />
//                 Votre navigateur ne supporte pas l'élément audio.
//             </audio>
//         </div>
//     );
// }

// export default AudioPlayer;

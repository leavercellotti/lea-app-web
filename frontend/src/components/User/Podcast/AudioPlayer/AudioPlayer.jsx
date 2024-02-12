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
        <source src={audioSrc} type="audio/mp3" />
        Votre navigateur ne supporte pas l'élément audio.
      </audio>
      {/* {isAudioCompleted && <p>L'audio a été écouté complètement.</p>} */}
    </div>
  );
};

export default AudioPlayer;

// import React, { useRef, useState, useEffect } from "react";
// import s from "./style.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { addPodcastListenedArray } from "../../../../store/user-slice";
// import { UserAPI } from "../../../../api/user-api";

// const AudioPlayer = ({ audioTitle, _id }) => {
//   // console.log(audioTitle)
//     const dispatch =useDispatch()
//     const user_id = useSelector(store => store.USER._id)
//     const audioRef = useRef(null);
//     const [isAudioPlayed, setIsAudioPlayed] = useState(false);
//     const [isAudioCompleted, setIsAudioCompleted] = useState(false);
//     const listenedBackend = async () => {    
//         // Make API call to update user's liked podcasts
//         try {
//           const response = await UserAPI.updateListenedPodcasts(user_id, _id);
//           if (response) {
//             console.log('User listened podcasts updated successfully.');
//           } else {
//             console.error('Failed to update user listened podcasts.');
//           }
//         } catch (error) {
//           console.error('Error updating user listened podcasts:', error);
//         }
//       };
//   useEffect(() => {
//     const audioElement = audioRef.current;

//     const handleAudioPlay = () => {
//       setIsAudioPlayed(true);
//       setIsAudioCompleted(false);
//       listenedBackend()
//       dispatch(addPodcastListenedArray(_id));
//     };

//     const handleAudioEnded = () => {
//       setIsAudioCompleted(true);
//     };

//     audioElement.addEventListener("play", handleAudioPlay);
//     audioElement.addEventListener("ended", handleAudioEnded);

//     return () => {
//       audioElement.removeEventListener("play", handleAudioPlay);
//       audioElement.removeEventListener("ended", handleAudioEnded);
//     };
//   }, []);

//   // Construction de l'URL de la vidéo dans le backend
//   const videoSrc = `http://localhost:3000/api/podcast/uploads/videos/${audioTitle}.mp4`;
//   console.log(videoSrc)

//   return (
//     <div className={s.audioPlayerContainer}>
//       <h2 className={s.audioTitle}>{audioTitle}</h2>
//       <audio ref={audioRef} controls className={s.audioElement}>
//         <source src={videoSrc} type="audio/mp4" />
//         Votre navigateur ne supporte pas l'élément audio.
//       </audio>
//       {/* {isAudioCompleted && <p>L'audio a été écouté complètement.</p>} */}
//     </div>
//   );
// };

// export default AudioPlayer;

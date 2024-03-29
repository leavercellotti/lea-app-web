import React from 'react'; // Assurez-vous d'ajuster le chemin selon votre structure de fichiers
import s from "./style.module.css";
import PodcastItem from '../PodcastItem/PodcastItem';

function PodcastList({ podcastList, selectedLevel }) {
  return (
    <div className={s.container}>
      
      {podcastList?.map((podcast) => (
        <PodcastItem
          key={podcast._id}
          _id={podcast._id}
          link={podcast.link}
          title={podcast.title}
          isLiked={podcast.isLiked}
          isListened={podcast.isListened}
          level={podcast.level}
          image={podcast.image}
          transcription={podcast.transcription}
          translation={podcast.translation}
          selectedLevel={selectedLevel}
        />
      ))}
    </div>
  );
}

export default PodcastList;

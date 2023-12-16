import React from 'react'; // Assurez-vous d'ajuster le chemin selon votre structure de fichiers
import s from "./style.module.css";
import PodcastItem from '../PodcastItem/PodcastItem';

function PodcastList() {
  // Exemple de données de podcasts
  const podcasts = [
    { id: 1, title: 'Podcast 1', isLiked: true, isListened: false, level: 'Débutant', imgSrc: 'url1' },
    { id: 2, title: 'Podcast 2', isLiked: false, isListened: true, level: 'Intermédiaire', imgSrc: 'url2' },
    { id: 2, title: 'Podcast 3', isLiked: false, isListened: true, level: 'Intermédiaire', imgSrc: 'url2' },
    // Ajoutez d'autres podcasts ici
  ];

  return (
    <div className={s.container}>
      {podcasts.map((podcast) => (
        <PodcastItem
          key={podcast.id}
          title={podcast.title}
          isLiked={podcast.isLiked}
          isListened={podcast.isListened}
          level={podcast.level}
          imgSrc={podcast.imgSrc}
        />
      ))}
    </div>
  );
}

export default PodcastList;

import React from 'react'
import s from "./style.module.css"
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import VideoTime from '../VideoTime/VideoTime';
import { useNavigate } from 'react-router-dom';
import DownloadButton from '../DownloadButton/DownloadButton';

function getDriveFileId(link) {
  // Vérifier si link est défini avant d'essayer de faire correspondre l'expression régulière
  if (link && typeof link === 'string') {
    const fileIdMatch = link.match(/\/file\/d\/(.+?)\/(?:view|\?usp=sharing|$)/);
    if (fileIdMatch) {
      return fileIdMatch[1];
    }
  }
  return null;
}

function constructDriveAudioLink(fileId) {//on modifie le lien partagé de google drive pour qu'il ait le bon format
  return `https://drive.google.com/uc?&id=${fileId}`;
}


function PodcastItem({_id, isLiked, isListened, level, link, title,transcription, translation, image}) {
  const navigate = useNavigate();
  const fileId = getDriveFileId(link);
  const levelText = (level === 1) ? 'Débutant' : (level === 2) ? 'Intermédiaire' : 'Avancé';
  const imageId = getDriveFileId(image)
  
  return (
    <div className={s.container}>
        <div className={s.top}>
          <div className={s.heart}>
            {isLiked ? <FaRegHeart size={20} /> : <FaRegHeart size={20} />}
          </div>
          <div className={s.right}>
            <VideoTime audioSrc={fileId ? constructDriveAudioLink(fileId) : ''}/>
            {isListened && <div className={s.listened}>Ecouté</div>}
            <div className={s.level}>{levelText}</div>
          </div>
        </div>
        <div className={s.inside}>
            <h2>{title}</h2>
            <div className={s.centerContainer}>
                <img className={s.img} alt="" src={imageId ? constructDriveAudioLink(imageId) :''}/>
            </div>
            <div className='options'>
                <DownloadButton title={title} link={link} transcription={transcription} translation={translation} downloadItems="all" btnText="Télécharger"/>
                <button 
                  className='btn btnSpace'
                  onClick={() => navigate(`/podcast/${_id}`)}
                >
                  Ecouter
                </button>
            </div>
        </div>
    </div>
  )
}

export default PodcastItem
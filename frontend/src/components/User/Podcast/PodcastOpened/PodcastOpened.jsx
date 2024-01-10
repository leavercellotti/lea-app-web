import React from 'react';
import s from "./style.module.css";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import AudioPlayer from '../AudioPlayer/AudioPlayer';
import DownloadButton from '../DownloadButton/DownloadButton';
import { useNavigate, useParams } from 'react-router-dom';
import Like from '../Like/Like';

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
  return `https://drive.google.com/uc?id=${fileId}`;
}

function PodcastOpened({_id, title, image, link, isLiked, transcription, translation }) {
  console.log("id",_id)
  const fileId = getDriveFileId(link);
  const imageId = getDriveFileId(image)
  const navigate = useNavigate()
  const {selectedLevel} =useParams()
  console.log("sel", selectedLevel)

  function onClickReturn() {
    if(selectedLevel < 3) {
      navigate(`/podcasts/${selectedLevel}`)
    }
    else {
      navigate(`/podcasts`)
    }
  }
  return (
    <div className='container light paddingTopBottom maxWidth'>
      <div className={s.top}>
        <button className='btn' style={{ marginLeft: "20px" }} onClick={onClickReturn}>Retour</button>
        <Like _id={_id} size={30} style={{ marginRight: "20px" }}/>
        {/* <FaHeart size={30} style={{ marginRight: "20px" }} /> */}
      </div>
      <div className={s.inner}>
        <h2>{title}</h2>
        <div className={s.imgContainer}>
          <img src={imageId ? constructDriveAudioLink(imageId) :''} className={s.img} alt="" />
        </div>
        <AudioPlayer _id={_id} audioSrc={fileId ? constructDriveAudioLink(fileId) : ''} />
        <div className='options'>
          <DownloadButton title={title} link={link} transcription={transcription} translation={translation} downloadItems="pdf" btnText="Télécharger le PDF"/>
          <DownloadButton title={title} link={link} transcription={transcription} translation={translation} downloadItems="audio" btnText="Télécharger l'audio"/>
          <DownloadButton title={title} link={link} transcription={transcription} translation={translation} downloadItems="all" btnText="Télécharger tout"/>
        </div>
        <div 
            className={s.textBox} 
            dangerouslySetInnerHTML={{ __html: transcription }} 
        />
        <div 
            className={s.translationBox} 
            dangerouslySetInnerHTML={{ __html: translation }} 
        />
      </div>
    </div>
  );
}

export default PodcastOpened;

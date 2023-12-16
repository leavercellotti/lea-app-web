import React from 'react'
import s from "./style.module.css"
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import image from "../../../../assets/image.png"
import AudioPlayer from '../AudioPlayer/AudioPlayer';

function PodcastOpened({title, imgSrc, isLiked, text, translation}) {
  return (
    <div className='container light paddingTopBottom maxWidth'>
        <div className={s.top}>
            <button className='btn' style={{marginLeft:"20px"}}>Retour</button>
            <FaHeart size={30}  style={{marginRight:"20px"}}/>
        </div>
        <div className={s.inner}>
            <h2>{title}</h2>
            <div className={s.imgContainer}>
                <img src={image} className={s.img} alt=""/>
            </div>
            <AudioPlayer audioSrc="https://drive.google.com/uc?id=1Nh5jofb7cWbX7W0h43OD1-Wd-8ZeMYoZ" />
            <div className='options'>
                <button className='btn btnSpace'>Télécharger le PDF</button>
                <button className='btn btnSpace'>Télécharger l'audio</button>
                <button className='btn btnSpace'>Télécharger tout</button>
                {/* <a href={audioSrc} download className={s.downloadLink}>
                Télécharger l'audio </a>*/}
            </div>
            <div className={s.textBox}>
                {text}
            </div>
            <div className={s.translationBox}>
                {text}
            </div>
        </div>
    </div>
  )
}

export default PodcastOpened
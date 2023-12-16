import React from 'react'
import s from "./style.module.css"
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import image from "../../../../assets/image.png"
import VideoTime from '../VideoTime/VideoTime';
function PodcastItem({isLiked, isListened, level, title, imgSrc}) {
  return (
    <div className={s.container}>
        <div className={s.top}>
            {isLiked ?
                (<div className={s.heart}><FaHeart size={20}/></div>):
                (<div className={s.heart}><FaRegHeart size={20}/></div>)
            }
            <div className={s.right}>
                <VideoTime audioSrc="https://drive.google.com/uc?id=1Nh5jofb7cWbX7W0h43OD1-Wd-8ZeMYoZ"/>
                {isListened &&
                    <div className={s.listened}>Ecouté</div>
                }
                <div className={s.level}>{level}</div>
            </div>
        </div>
        <div className={s.inside}>
            <h2>{title}</h2>
            <div className={s.centerContainer}>
                <img className={s.img} alt="" src={image}/>
            </div>
            <div className='options'>
                <button className='btn btnSpace'>Télécharger</button>
                <button className='btn btnSpace'>Ecouter</button>
            </div>
        </div>
    </div>
  )
}

export default PodcastItem
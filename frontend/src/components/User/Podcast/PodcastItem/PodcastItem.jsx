import React from 'react'
import s from "./style.module.css"
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
function PodcastItem({isLiked, isListened, level, title, imgSrc}) {
  return (
    <div className={s.container}>
        <div className={s.top}>
            {isLiked ?
                (<div className={s.heart}><FaHeart size={20}/></div>):
                (<div className={s.heart}><FaRegHeart size={20}/></div>)
            }
            <div className={s.right}>
                {isListened ?
                    (<div className={s.listened}>Ecouté</div>):
                    (<div className={s.listened}>Pas écouté</div>)
                }
                <div className={s.level}>{level}</div>
            </div>
        </div>
        <div className={s.inside}>
            <h2>{title}</h2>
            <div className='options'>
                <button className='btn btnSpace'>Télécharger</button>
                <button className='btn btnSpace'>Ecouter</button>
            </div>
        </div>
    </div>
  )
}

export default PodcastItem
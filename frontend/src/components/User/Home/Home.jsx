import React from 'react'
import s from "./style.module.css"
import podcastImage from "../../../assets/podcast.png"
import vocabularyImage from "../../../assets/vocabulary.png"
import { useNavigate } from 'react-router-dom';

import chatImage from "../../../assets/chat.png"
function Home() {
    const navigate = useNavigate()
  return (
    <div>
        <div className={s.top}>
            <div className={s.empty}></div>
            <div className={s.title}>
                <h1>Léa English</h1>
                <p>Lorem ipsum dolor sit amet</p>
            </div>
            <div className={s.progressContainer}>
                <div className={s.progressBox}>
                    <h2>
                        Votre progression
                    </h2>
                    <p>
                        <span className={s.pink}>
                            125 
                        </span>
                        mots appris
                    </p>
                    <p>
                        <span className={s.pink}>
                            14 
                        </span>
                        podcasts écoutés
                    </p>
                    <p>
                        <span className={s.pink}>
                            16 
                        </span>
                        pratiques réalisées
                    </p>
                </div>
            </div>
        </div>
        <div className={s.boxesContainer}>
            <div className={s.box}>
                <h2 className='h2'>Vocabulaire</h2>
                <img className={s.img} src={vocabularyImage} alt=""/>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                <button 
                    className='btn'
                    onClick={() => navigate('/vocabulary')}
                >
                        Apprendre
                </button>
            </div>
            <div className={s.box}>
                <h2 className='h2'>Podcast</h2>
                <img className={s.img} src={podcastImage} alt=""/>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                <button 
                    className='btn'
                    onClick={() => navigate('/podcasts')}
                >
                    Écouter
                </button>
            </div>
            <div className={s.box}>
                <h2 className='h2'>Pratique</h2>
                <img className={s.img} src={chatImage} alt=""/>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                <button 
                    className='btn'
                    onClick={() => navigate('/ai')}
                >
                    Pratiquer
                </button>
            </div>
        </div>
    </div>
  )
}

export default Home
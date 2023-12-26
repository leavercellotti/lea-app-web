import React from 'react'
import s from "./style.module.css"
import podcastImage from "../../../assets/podcast.png"
import vocabularyImage from "../../../assets/vocabulary.png"

import chatImage from "../../../assets/chat.png"
function Home() {
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
                <button className='btn'>Apprendre</button>
            </div>
            <div className={s.box}>
                <h2 className='h2'>Podcast</h2>
                <img className={s.img} src={podcastImage} alt=""/>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                <button className='btn'>Écouter</button>
            </div>
            <div className={s.box}>
                <h2 className='h2'>Pratique</h2>
                <img className={s.img} src={chatImage} alt=""/>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                <button className='btn'>Pratiquer</button>
            </div>
        </div>
    </div>
  )
}

export default Home
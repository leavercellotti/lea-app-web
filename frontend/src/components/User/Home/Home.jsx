import React from 'react'
import s from "./style.module.css"
import podcastImage from "../../../assets/podcast.png"
import vocabularyImage from "../../../assets/vocabulary.png"
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux"

import chatImage from "../../../assets/chat.png"
function Home() {
    const navigate = useNavigate()
    const podcastsListenedArray = useSelector(store => store.USER.podcastsListenedArray)
    const nbLearnedCards = useSelector(store => store.USER.nbLearnedCards)
    const nbChatsMade = useSelector(store => store.USER.nbChatsMade)
  return (
    <div>
        <div className={s.top}>
            <div className={s.empty}></div>
            <div className={s.title}>
                <h1>Léa English</h1>
                <p>Progressez en anglais en 15 minutes par <span style={{whiteSpace:"nowrap"}}>jour !</span> Choisissez une des 3 compétences à travailler aujourd'hui.</p>
            </div>
            <div className={s.progressContainer}>
                <div className={s.progressBox}>
                    <h2>
                        Votre progression
                    </h2>
                    <p>
                        <span className={s.pink}>
                            {nbLearnedCards} 
                        </span>
                        mots appris
                    </p>
                    <p>
                        <span className={s.pink}>
                            {podcastsListenedArray ? (podcastsListenedArray.length) : 0} 
                        </span>
                        podcasts écoutés
                    </p>
                    <p>
                        <span className={s.pink}>
                            {nbChatsMade}
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
                <p>Apprenez rapidement les 20% du vocabulaire vraiment utile en anglais.</p>
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
                <p>Améliorez votre compréhension orale grâce à des épisodes de podcast stimulants et intéressants.</p>
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
                <p>Progressez à l'oral en pratiquant avec un tuteur virtuel 7 jours sur 7.</p>
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
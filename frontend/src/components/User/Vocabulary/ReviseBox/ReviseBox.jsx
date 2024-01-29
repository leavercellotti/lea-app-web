import React, { useState } from 'react';
import s from "./style.module.css";
import { AiFillSound } from "react-icons/ai";
import icon from '../../../../assets/icon.png';

const ReviseBox = ({ cardArray }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const speakWord = (wordEnglish) => {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(wordEnglish);
        utterance.lang = 'en-GB';
        synth.speak(utterance);
    };

    function togglePlayback() {
        if (isPlaying) {
            window.speechSynthesis.cancel();
        } else {
            cardArray?.forEach((card) => speakWord(card.wordEnglish));
        }
        setIsPlaying(!isPlaying);
    }

    return (
        <div className='box'>
            <div className="right">
                <button
                    className='btn'
                    onClick={togglePlayback}
                >
                    {isPlaying ? 'Arrêter' : 'Tout écouter'}
                </button>
            </div>
            <div className={s.inner}>
                <ul>
                    {cardArray?.map((card) => (
                        <li
                            key={card._id}
                            className={card.knowledge ? s.green : s.red}
                        >
                            <div className={s.word}>{card.wordEnglish} - {card.wordFrench}</div>
                            <div className={s.soundIconContainer}>
                                <AiFillSound
                                    size={22}
                                    className={s.soundIcon}
                                    onClick={() => speakWord(card.wordEnglish)}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="right">
                <img src={icon} alt="" className='favicon' />
            </div>
        </div>
    );
};

export default ReviseBox;

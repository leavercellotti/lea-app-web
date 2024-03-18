import React, { useState, useEffect } from 'react';
import s from "./style.module.css";
import { AiFillSound } from "react-icons/ai";
import icon from '../../../../assets/icon.png';

const ReviseBox = ({ cardArray }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.box')) {
                setIsPlaying(false);
                window.speechSynthesis.cancel();
            }
        };

        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const speakWord = (word, lang) => {
        const synth = window.speechSynthesis;
        const cleanWord = word.replace("/", " "); // Remplace le "/" par un espace
        const utterance = new SpeechSynthesisUtterance(cleanWord);
        utterance.lang = lang;
        synth.speak(utterance);
    };
    
    
    

    function togglePlayback() {
        if (isPlaying) {
            console.log("if")
            setIsPlaying(false);
            window.speechSynthesis.cancel();
            window.location.reload()
        } 
        else {
            console.log("else")
            // cardArray?.forEach((card) => {speakWord(card.wordFrench, 'fr-FR'); speakWord(card.wordEnglish, 'en-GB'); speakWord(card.wordEnglish, 'en-GB');});
            let delay = 0;

        cardArray?.forEach((card, index) => {
            setTimeout(() => {
                speakWord(card.wordFrench, 'fr-FR');
            }, delay * 1000);
            setTimeout(() => {
                speakWord(card.wordEnglish, 'en-GB');
            }, (delay + 5) * 1000); // Pause de 5 secondes après chaque mot français
            setTimeout(() => {
                speakWord(card.wordEnglish, 'en-GB');
            }, (delay + 8) * 1000); // Pause de 2 secondes après le premier mot anglais
            delay += 8; // Total des délais pour un mot français et deux mots anglais
            });
        }
        setIsPlaying(true);
            
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
                            <div className={s.word}>{card.wordFrench} - {card.wordEnglish}</div>
                            <div className={s.soundIconContainer}>
                                <AiFillSound
                                    size={22}
                                    className={s.soundIcon}
                                    onClick={() => speakWord(card.wordEnglish, 'en-GB')}
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

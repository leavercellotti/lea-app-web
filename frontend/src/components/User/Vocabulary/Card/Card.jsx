import React from 'react';
import icon from '../../../../assets/icon.png';
import { AiFillSound } from "react-icons/ai";
import s from "./style.module.css"; // Assurez-vous que le chemin du fichier de styles est correct

function Card({ card, recto, toggleRecto }) {
  const speakWord = (event) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(card.wordEnglish);

    // Spécifiez la langue (en-GB pour l'anglais britannique)
    utterance.lang = 'en-GB';
    
    synth.speak(utterance);

    event.stopPropagation();
  };
  return (
    <div 
      className={`${s.container} ${recto ? s.recto : s.verso}`}
      onClick={toggleRecto}
    >
      <img src={icon} alt="" className={s.icon} />
      {recto ?
        (<div className={`${s.centeredContent} ${s.text}`}>
          <p>{card && card.wordFrench}</p>
        </div>)
        :
        (<div className={`${s.centeredContent} ${s.text}`}>
          <p>{card && card.wordEnglish}</p>
          <AiFillSound 
            className={s.soundIcon} 
            size={30} 
            onClick={speakWord} />
        </div>)
      }
      <img src={icon} alt="" className={s.icon2} />
    </div>
  );
}

export default Card;

import React, { useState } from 'react';
import { FaMicrophone } from "react-icons/fa";
import s from "./style.module.css";
const SpeechToText = ({setMessage}) => {
  const recognition = new window.webkitSpeechRecognition(); // Utilisation de l'API Web Speech

  recognition.lang = 'en-EN'; // Langue de la reconnaissance vocale

  recognition.onresult = (event) => {
    const last = event.results.length - 1;
    const text = event.results[last][0].transcript;
    setMessage(text);
  };

  const startListening = () => {
    recognition.start();
  };

  const stopListening = () => {
    recognition.stop();
  };

  return (
    <span className={s.container}>
      <FaMicrophone size={24} className={s.icon}/>
      {/* <button onClick={startListening}>Commencer l'écoute</button>
      <button onClick={stopListening}>Arrêter l'écoute</button> */}
    </span>
  );
};

export default SpeechToText;
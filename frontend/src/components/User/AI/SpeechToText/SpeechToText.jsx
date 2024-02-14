import React, { useEffect, useState } from 'react';
import { FaMicrophone } from "react-icons/fa";
import s from "./style.module.css";
import { BsSoundwave } from "react-icons/bs";
import { FaRegStopCircle } from "react-icons/fa";
const SpeechToText = ({ setMessage }) => {
  const [isListening, setIsListening] = useState(false);

  const recognition = new window.webkitSpeechRecognition();

  recognition.lang = 'en-EN';
  recognition.continuous = true;

  recognition.onresult = (event) => {
    const last = event.results.length - 1;
    const newText = event.results[last][0].transcript;
    setMessage(prevText => prevText + newText); // Concatène le nouveau texte avec l'ancien
  };

  const startListening = () => {
    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognition.stop();
    setIsListening(false);
  };

  function toggleListening() {
    if (isListening) {
      stopListening();
    } else {
      setMessage(''); // Réinitialise le texte capturé lorsque l'utilisateur commence à écouter à nouveau
      startListening();
    }
  }

  return (
    <div>
      {isListening ? (
        <>
          <div className={s.stopContainer}>
            <FaRegStopCircle
              onClick={toggleListening}
              size={32}
              className={s.icon}
            />
          </div>
          <div>
            <BsSoundwave className={s.soundIcon} size={24} />
          </div>
        </>
      ) : (
        <div className={s.container}>
          <FaMicrophone
            onClick={toggleListening}
            size={24}
            className={s.icon}
          />
        </div>
      )}
    </div>
  );
};

export default SpeechToText;

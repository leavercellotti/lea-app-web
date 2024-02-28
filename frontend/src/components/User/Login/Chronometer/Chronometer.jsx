import React, { useState, useEffect } from 'react';

const Chronometer = ({isOTPValid, setIsOTPValid}) => {
  const [seconds, setSeconds] = useState(120); // Initialiser le compteur à 120 secondes (2 minutes)
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Mettre à jour le nombre de secondes restantes
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000); // Mettre à jour toutes les secondes

    // Nettoyer l'intervalle lorsque le composant est démonté ou lorsque le compteur atteint 0
    return () => clearInterval(intervalId);
  }, []); // L'effet est exécuté une seule fois après le rendu initial

  // Calculer les minutes et les secondes restantes
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  if(minutes===0 && remainingSeconds ===0){
    setIsOTPValid(false)
  }
  // Formatter le temps restant avec deux chiffres pour les minutes et les secondes
  const formattedTime = `${minutes.toString().padStart(2, '0')}min${remainingSeconds.toString().padStart(2, '0')}`;
  if(isOTPValid){
    return (
        <div>
        <p>Le code est encore valide pendant : {formattedTime}</p>
        </div>
    );
  }
  else {
    return(
        <button>

        </button>
    )
  }
};

export default Chronometer;

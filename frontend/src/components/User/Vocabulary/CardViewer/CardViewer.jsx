import React, { useState } from 'react';
import Card from '../Card/Card';
import Sentences from '../Sentences/Sentences';
import s from "./style.module.css";  // Importe le module de style
import DoYouKnow from '../DoYouKnow/DoYouKnow';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleDown } from "react-icons/fa";
import WhatToDo from '../WhatToDo/WhatToDo';

const CardViewer = ({ cardArray, setRevise, revise }) => {
  const [recto, setRecto] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [end, setEnd] = useState(false)
  const navigate = useNavigate()

  const handleNextCard = () => {
    setIsVisible(false);
    setTimeout(() => {
        setRecto(true);
      setCurrentCardIndex(prevIndex => (prevIndex < cardArray.length - 1 ? prevIndex + 1 : prevIndex));
      console.log("indec", currentCardIndex, cardArray.length)
      if(currentCardIndex === cardArray.length - 1){
        console.log("revise true")
        console.log(cardArray)
        if(revise) {
          setEnd(true)
          setRevise(false)
        }
        else {
          setRevise(true)
        }
        setCurrentCardIndex(0)
      }
      setIsVisible(true);
    }, 1000); // La durée doit correspondre à la durée de transition dans le CSS
  };

//   const handlePreviousCard = () => {
//     setCurrentCardIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
//   };

  function toggleRecto() {
    setRecto(prevRecto => !prevRecto);
  }
  const scrollToSection = () => {
    // Ajustez la valeur 320 selon vos besoins
    window.scrollTo({
      top: window.scrollY + 320,
      behavior: 'smooth',
    });
  };

  if(end || cardArray?.length===0) {
    return(
      <WhatToDo/>
    )
  }
  return (
    <div className={s.container}>
      {cardArray && cardArray.length > 0 && (
        <>
          <div className={s.revise}>
            <button className='btn' onClick={() => navigate('/revise')}>Réviser</button>
          </div>
          <div className={s.container}>
            {revise &&
            <p>Révisons</p>
            }
            {currentCardIndex + 1} / {cardArray.length}
            <div className={isVisible ? s.visibleCard : s.hiddenCard}>
              
                <Card card={cardArray[currentCardIndex]} recto={recto} />
                <div className={s.buttons}>
                  <button className="btn" onClick={toggleRecto}>Retourner</button>
                  {!recto && 
                  <FaArrowCircleDown 
                    className={s.arrowIcon} 
                    size={32}
                    onClick={scrollToSection} 
                  />
                  }
                </div>
              
              {!recto && (
                <>
                  <Sentences sentenceArray={cardArray[currentCardIndex].sentenceArray} />
                  {revise?
                    (<button className='btn' onClick={handleNextCard}>
                      Suivant
                      </button>)
                    :
                    (<DoYouKnow 
                      cardId={cardArray[currentCardIndex]._id} 
                      handleNextCard={handleNextCard} />
                    )
                  }
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardViewer;

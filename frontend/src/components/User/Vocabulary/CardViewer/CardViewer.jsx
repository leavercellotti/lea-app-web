import React, { useState } from 'react';
import Card from '../Card/Card';
import Sentences from '../Sentences/Sentences';
import s from "./style.module.css";  // Importe le module de style
import DoYouKnow from '../DoYouKnow/DoYouKnow';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleDown } from "react-icons/fa";
import WhatToDo from '../WhatToDo/WhatToDo';
import Loader from '../../Loader/Loader';
import { useSelector } from 'react-redux';

const CardViewer = ({ cardArray, setRevise, revise }) => {
  const [recto, setRecto] = useState(true);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [end, setEnd] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [showRevise, setShowRevise] = useState(false)
  const navigate = useNavigate()
  const nbLearnedCards = useSelector(store => store.USER.nbLearnedCards)

  const handleNextCard = () => {
    setIsVisible(false);
    setTimeout(() => {
        setRecto(true);
      setCurrentCardIndex(prevIndex => (prevIndex < cardArray.length - 1 ? prevIndex + 1 : prevIndex));
      if(currentCardIndex === cardArray.length - 1){
        if(revise) {
          setRevise(false)
          setEnd(true)
        }
        else {
          setRevise(true)
          setShowRevise(true)
          setIsLoading(true);

          setTimeout(() => {
            setIsLoading(false);
          }, 6800);
        }
        setCurrentCardIndex(0)
        }
        setIsVisible(true);
      }, 500); // La durée doit correspondre à la durée de transition dans le CSS
  };

  function toggleRecto() {
    //setRecto(false)
    setRecto(prevRecto => !prevRecto);
  }
  const scrollToSection = () => {
    // Ajustez la valeur 320 selon vos besoins
    window.scrollTo({
      top: window.scrollY + 320,
      behavior: 'smooth',
    });
  };

  if(end || cardArray?.length===0 ) {
    return(
      <WhatToDo/>
    )
  }
  
  if (showRevise) {
    return (
      <div className={s.container}>
        <div className={s.box}>
          <p><b>Super !</b> Vous avez appris 5 nouveaux mots.</p>
          <p>Révisons un peu maintenant.</p>
          <button onClick={() => setShowRevise(false)} className='btn'>C'est parti</button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={s.loaderContainer}>
        <div className={s.center}>
          <Loader/> {/* Remplacez par le composant de loader réel */}
        </div>
      </div>
    );
  }
  return (
    <div className={s.container}>
      {cardArray && cardArray.length > 0 && (
        <>
          <div className={s.revise}>
            <button className='btn' onClick={() => navigate('/revise')}>Réviser tout le vocabulaire</button>
          </div>
          <div className={s.container}>
            {revise &&
            <p>Révisons</p>
            }
            {currentCardIndex + 1} / {cardArray.length}
            <p className={s.fadeInDown}>Cliquez sur la carte pour la retourner</p>
            <div className={isVisible ? s.visibleCard : s.hiddenCard}>
              
                <Card toggleRecto={toggleRecto} card={cardArray[currentCardIndex]} recto={recto} />
                <div className={s.buttons}>
                  {/* <button className="btn" onClick={toggleRecto}>Retourner</button> */}
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

import React, { useState } from 'react';

function TestQuestion({ sentence, optionArray, answer, index, size, handleNext, setNbCorrectAnswers, nbCorrectAnswers }) {
    const [choice, setChoice] = useState("");
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

    const handleClick = () => {
        if (choice !== "") {
            if (choice === answer) {
                setIsCorrectAnswer(true);
                setNbCorrectAnswers(nbCorrectAnswers + 1);
            } else {
                // setIsCorrectAnswer(false);
                setIsCorrectAnswer(true);
            }
            setTimeout(() => {
                setIsCorrectAnswer(false);
                    handleNext();
                    setChoice("");
            }, 1100);
        } else {
            alert("Sélectionnez une réponse.");
        }
    }

    return (
        <div className='box' style={{ margin: "10px 0px" }}>
            <p>{index + 1}/{size}</p>
            <h3 className='h3'>{sentence}</h3>
            {/* {console.log(answer, nbCorrectAnswers)} */}
            <div className='options'>
             <div 
               onClick={() => {setChoice("a");}} 
               className={isCorrectAnswer && answer === 'a' ? 'optionGreen chosen' : (choice ==="a" && !isCorrectAnswer ?  'optionBlue chosen' : 'optionBlue')}
            >
              {optionArray && optionArray[0]}
            </div>
            <div 
              onClick={() => {setChoice("b");}} 
              className={isCorrectAnswer && answer === 'b' ? 'optionGreen chosen' : (choice ==="b" && !isCorrectAnswer ?  'optionBlue chosen' : 'optionBlue')}
            >
              {optionArray && optionArray[1]}
            </div>
            <div 
              onClick={() => {setChoice("c");}} 
              className={isCorrectAnswer && answer === 'c' ? 'optionGreen chosen' : (choice ==="c" && !isCorrectAnswer ?  'optionBlue chosen' : 'optionBlue')}
            >
              {optionArray && optionArray[2]}
            </div>
            <div 
              onClick={() => {setChoice("d");}} 
              className={isCorrectAnswer && answer === 'd' ? 'optionGreen chosen' : (choice ==="d" && !isCorrectAnswer ?  'optionBlue chosen' : 'optionBlue')}
            >
              {optionArray && optionArray[3]}
            </div>
                
          </div>
          <button onClick={handleClick} className='btn'>
              Suivant
          </button>
        </div>
    )
}

export default TestQuestion;

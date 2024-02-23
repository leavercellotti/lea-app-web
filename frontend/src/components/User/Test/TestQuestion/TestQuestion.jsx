import React, { useState } from 'react'

function TestQuestion({sentence, optionArray, answer, index, size, handleNext, setNbCorrectAnswers,nbCorrectAnswers}) {
  const [choice, setChoice] = useState("a")

  const handleClick = () => {
    if(choice === answer) {
      setNbCorrectAnswers(nbCorrectAnswers+1)
    }
    
    handleNext()
    setChoice("a")
  }
  return (
    <div className='box' style={{margin:"10px 0px"}}>
      {/* {optionArray && 
      <> */}
        <p>{index +1}/{size}</p>
        <h3 className='h3'>{sentence}</h3>
        <div className='options'>
            <div 
              onClick={() => {setChoice("a");}} 
              className={choice ==="a" ? 'option selected' : 'option'}
            >
              {optionArray && optionArray[0]}
            </div>
            <div 
              onClick={() => {setChoice("b");}} 
              className={choice ==="b" ? 'option selected' : 'option'}
            >
              {optionArray && optionArray[1]}
            </div>
            <div 
              onClick={() => {setChoice("c");}} 
              className={choice ==="c" ? 'option selected' : 'option'}
            >
              {optionArray && optionArray[2]}
            </div>
            <div 
              onClick={() => {setChoice("d");}} 
              className={choice ==="d" ? 'option selected' : 'option'}
            >
              {optionArray && optionArray[3]}
            </div>
        </div>
        <button onClick={handleClick} className='btn'>
          Suivant
        </button>
{/* </>} */}
    </div>
  
  )
}

export default TestQuestion
import React from 'react'
import s from "./style.module.css"
function Sentences({sentenceArray}) {
  return (
    <div className={s.container}>
        {sentenceArray && sentenceArray[0] && 
        <p>
            {sentenceArray[0]}
        </p>}
        {sentenceArray && sentenceArray[1] && 
        <p>
            {sentenceArray[1]}
        </p>}
        {sentenceArray && sentenceArray[2] && 
        <p>
            {sentenceArray[2]}
        </p>}
    </div>
  )
}

export default Sentences
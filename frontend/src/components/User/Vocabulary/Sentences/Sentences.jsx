import React from 'react'
import s from "./style.module.css"
function Sentences({sentence1, sentence2, sentence3}) {
  return (
    <div className={s.container}>
        {sentence1 && 
        <p>
            {sentence1}
        </p>}
        {sentence2 && 
        <p>
            {sentence2}
        </p>}
        {sentence3 && 
        <p>
            {sentence3}
        </p>}
    </div>
  )
}

export default Sentences
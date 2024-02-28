import React from 'react'
import s from "./style.module.css"
function Sentences({sentenceArray}) {
  return (
    <div className={s.container}>
        {sentenceArray && sentenceArray[0] && 
        <p>
          {sentenceArray[0].split('\n\n').map((sentence, index) => (
            <React.Fragment key={index}>
                {index === 0 ? <span style={{ color: 'black' }}>{sentence}</span> : sentence}
                <br />
            </React.Fragment>
          ))}
        </p>}<br/>
        {sentenceArray && sentenceArray[1] && 
        <p>
            {sentenceArray[1].split('\n\n').map((sentence, index) => (
            <React.Fragment key={index}>
                {index === 0 ? <span style={{ color: 'black' }}>{sentence}</span> : sentence}
                <br />
            </React.Fragment>
          ))}
        </p>}
        {sentenceArray && sentenceArray[2] && 
        <p>
            {sentenceArray[2].split('\n\n').map((sentence, index) => (
            <React.Fragment key={index}>
                {index === 0 ? <span style={{ color: 'black' }}>{sentence}</span> : sentence}
                <br />
            </React.Fragment>
          ))}
        </p>}
    </div>
  )
}

export default Sentences
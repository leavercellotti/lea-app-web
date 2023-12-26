import React from 'react'

function TestQuestion({question, option1, option2, option3}) {
  return (
    <div className='box' style={{margin:"10px 0px"}}>
        <p>1/10</p>
        <h3 className='h3'>{question}</h3>
        <div className='options'>
            <div className='option'>{option1}</div>
            <div className='option'>{option2}</div>
            <div className='option'>{option3}</div>
        </div>
        <button className='btn'>Suivant</button>
    </div>
  )
}

export default TestQuestion
import React from 'react'

function NumberWords() {
  return (
    <div className='box'>
        <h2>Combien de nouveaux mots voulez-vous apprendre ?</h2>
        <div className='options'>
        <div className='option'>5</div>
        <div className='option'>10</div>
        <div className='option'>15</div>
        </div>
        <div className='options'>
        <button className='btn btnSpace'>C'est parti !</button>
        </div>
    </div>
  )
}

export default NumberWords
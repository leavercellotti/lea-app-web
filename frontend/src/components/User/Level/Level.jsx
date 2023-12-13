import React from 'react'

function Level() {
  return (
    <div className='box'>
        <h2>Quel est votre niveau ?</h2>
        <div className='options'>
        <div className='option'>Débutant</div>
        <div className='option'>Intermédiare</div>
        <div className='option'>Avancé</div>
        </div>
        <div className='options'>
        <button className='btn btnSpace'>Faire le test</button>
        <button className='btn btnSpace'>Valider</button>
        </div>
    </div>
  )
}

export default Level
import React from 'react'

function DoYouKnow() {
  return (
    <div className='box'>
        <p>Vous le saviez ?</p>
        <div className='options'>
            <div className='option red'>Non</div>
            <div className='option orange'>Moyen</div>
            <div className='option green'>Oui</div>
        </div>
        <button className='btn'>Suivant</button>
    </div>
  )
}

export default DoYouKnow
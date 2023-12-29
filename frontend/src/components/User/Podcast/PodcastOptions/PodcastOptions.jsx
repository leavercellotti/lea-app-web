import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function PodcastOptions({setOption}) {
  const [selectedOption, setSelectedOption] = useState(3); // 0 Débutant, 1 Inter, 2 tout, 3 favoris

  return (
    <div className='box' style={{marginBottom:"20px"}}>
        <h2 className='h2'>Quels podcasts souhaitez-vous écouter ?</h2>
        <div className='options'>
            <div 
              className={`option ${selectedOption === 1 ? 'selected' : ''}`} 
              onClick={()=> setSelectedOption(1)}
            >
              Débutant
            </div>
            <div 
              className={`option ${selectedOption === 2 ? 'selected' : ''}`}
              onClick={()=> setSelectedOption(2)}
            >
              Intermédiaire
            </div>
            <div 
              className={`option ${selectedOption === 3 ? 'selected' : ''}`}
              onClick={()=> setSelectedOption(3)}
            >
              Tout
            </div>
            <div 
              className={`option ${selectedOption === 4 ? 'selected' : ''}`}
              onClick={()=> setSelectedOption(4)}
            >
              Favoris
            </div>
        </div>
        <div className='options'>
            <Link to="/test" className='btn btnSpace noUnderline'>Faire le test</Link>
            <button 
              className='btn btnSpace'
              onClick={()=>setOption(selectedOption)}
            >
              Valider
            </button>
        </div>
    </div>
  )
}

export default PodcastOptions;


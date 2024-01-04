import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function PodcastOptions({setOption}) {
  const [selectedOption, setSelectedOption] = useState(4); // 1 Débutant, 2 Inter, 4 tout, 5 favoris
  const navigate = useNavigate()
  function onClickHandler() {
    if(selectedOption < 3) {
      navigate(`/podcasts/${selectedOption}`)
    }
    else {
      navigate('/podcasts/')
    }
  }

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
              className={`option ${selectedOption === 4 ? 'selected' : ''}`}
              onClick={()=> setSelectedOption(4)}
            >
              Tout
            </div>
            <div 
              className={`option ${selectedOption === 5 ? 'selected' : ''}`}
              onClick={()=> setSelectedOption(5)}
            >
              Favoris
            </div>
        </div>
        <div className='options'>
            <Link to="/test" className='btn btnSpace noUnderline'>Faire le test</Link>
            <button 
              className='btn btnSpace'
              onClick={onClickHandler}
            >
              Valider
            </button>
        </div>
    </div>
  )
}

export default PodcastOptions;


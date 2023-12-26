import React from 'react'

function PodcastOptions() {
  return (
    <div className='box' style={{marginBottom:"20px"}}>
        <h2 className='h2'>Quels podcasts souhaitez-vous écouter ?</h2>
        <div className='options'>
            <div className='option'>Débutant</div>
            <div className='option'>Intermédiaire</div>
            <div className='option'>Tout</div>
            <div className='option'>Favoris</div>
        </div>
        <div className='options'>
            <button className='btn btnSpace'>Faire le test</button>
            <button className='btn btnSpace'>Valider</button>
        </div>
    </div>
  )
}

export default PodcastOptions
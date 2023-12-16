import React from 'react'
import Card from '../../../components/User/Card/Card'
import DoYouKnow from '../../../components/User/DoYouKnow/DoYouKnow'

function VocabularyRevise() {
  return (
    <div>
      <h1>
        Réviser
      </h1>
      <div className='container'>
        <Card text="Apple" showIcon={true}/>
        <DoYouKnow/>
      </div>
    </div>
  )
}

export default VocabularyRevise
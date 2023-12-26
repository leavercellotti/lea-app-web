import React from 'react'
import Level from '../../../components/User/Level/Level'
import NumberWords from '../../../components/User/Vocabulary/NumberWords/NumberWords'
import Card from '../../../components/User/Vocabulary/Card/Card'
import DoYouKnow from '../../../components/User/Vocabulary/DoYouKnow/DoYouKnow'
import Sentences from '../../../components/User/Vocabulary/Sentences/Sentences'

function Vocabulary() {
  return (
    <div>
      <h1>
        Vocabulaire
      </h1>
      <div className='container'>
        <Level/>
        <NumberWords/> 
        <Card text="Apple" showIcon={true} sentence1="I like to eat apples for a healthy snack." />
        <Sentences sentence1="I like to eat apples for a healthy snack." sentence2="I found a shiny red apple in the grocery store."/>
        <DoYouKnow/>
      </div>
    </div>
  )
}

export default Vocabulary
import React, { useEffect, useState } from 'react'
import Level from '../../../components/User/Level/Level'
import NumberWords from '../../../components/User/Vocabulary/NumberWords/NumberWords'
import Card from '../../../components/User/Vocabulary/Card/Card'
import DoYouKnow from '../../../components/User/Vocabulary/DoYouKnow/DoYouKnow'
import Sentences from '../../../components/User/Vocabulary/Sentences/Sentences'
import { useSelector } from 'react-redux'
import { CardAPI } from '../../../api/card-api'
import CardViewer from '../../../components/User/Vocabulary/CardViewer/CardViewer'

function Vocabulary() {
  const [cardArray, setCardArray] = useState()
  const [revise, setRevise] = useState(false)
  const token = useSelector((store) => store.USER.token)
  const level ="A1"
  const userId = useSelector(store => store.USER._id)

  useEffect(() => {
    const getNewCards = async () => {
      try {
        const selectedCard = await CardAPI.getRandom(level, token, userId);
        console.log("sele", selectedCard)
        setCardArray(selectedCard);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };
    const getRevisedCards = async () => {
      try {
        const selectedCard1 = await CardAPI.getViewedCards(1, token, userId);
        console.log("sele1", selectedCard1)
        const selectedCard3 = await CardAPI.getViewedCards(3, token, userId);
        console.log("sele3", selectedCard1)
        const selectedCard7 = await CardAPI.getViewedCards(7, token, userId);
        const selectedCard2 = await CardAPI.getViewedCards(2, token, userId, false);
        const selectedCard4 = await CardAPI.getViewedCards(4, token, userId, false);
        const selectedCard5 = await CardAPI.getViewedCards(5, token, userId, false);
        const selectedCard6 = await CardAPI.getViewedCards(6, token, userId, false);
        console.log('selectedCard2', selectedCard2)
        console.log('selectedCard4', selectedCard4)
        console.log('selectedCard5', selectedCard5)
        console.log('selectedCard6', selectedCard6)
        
        console.log([...selectedCard1, ...selectedCard3, ...selectedCard7])
        setCardArray([...selectedCard1, ...selectedCard3, ...selectedCard7,
          ...selectedCard2,...selectedCard4, ...selectedCard5,...selectedCard6]);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };
    if(revise) {
      getRevisedCards()
    }
    else {
      getNewCards()
    }
  }, [revise]);
  return (
    <div>
      <h1>
        Vocabulaire
      </h1>
      <div className='container'>
        {/* <Level/>
        <NumberWords/>  */}
        <CardViewer cardArray={cardArray} setRevise={setRevise} revise={revise}/>
        {/* <Card text="Apple" showIcon={true} sentence1="I like to eat apples for a healthy snack." />
        <Sentences sentence1="I like to eat apples for a healthy snack." sentence2="I found a shiny red apple in the grocery store."/>
        <DoYouKnow/> */}
      </div>
    </div>
  )
}

export default Vocabulary
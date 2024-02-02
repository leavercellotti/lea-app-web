import React, { useEffect, useState } from 'react'
import Level from '../../../components/User/Level/Level'
import NumberWords from '../../../components/User/Vocabulary/NumberWords/NumberWords'
import Card from '../../../components/User/Vocabulary/Card/Card'
import DoYouKnow from '../../../components/User/Vocabulary/DoYouKnow/DoYouKnow'
import Sentences from '../../../components/User/Vocabulary/Sentences/Sentences'
import { useSelector } from 'react-redux'
import { CardAPI } from '../../../api/card-api'
import CardViewer from '../../../components/User/Vocabulary/CardViewer/CardViewer'
import { useNavigate } from 'react-router-dom'

function Vocabulary() {
  const [cardArray, setCardArray] = useState()
  const [revise, setRevise] = useState(false)
  const token = useSelector((store) => store.USER.token)
  const userId = useSelector(store => store.USER._id)
  const level = useSelector(store => store.USER.level)
  const navigate = useNavigate()

  useEffect(() => {
    const getNewCards = async () => {
      if(level && level !== ""){
        try {
          const selectedCard = await CardAPI.getRandom(level, token, userId);
          setCardArray(selectedCard);
        } catch (error) {
          console.error("Error fetching new cards:", error);
          navigate('/login')
        }
      }
    };
    const getRevisedCards = async () => {
      try {
        const selectedCard1 = await CardAPI.getViewedCards(1, token, userId);
        const selectedCard3 = await CardAPI.getViewedCards(3, token, userId);
        const selectedCard7 = await CardAPI.getViewedCards(7, token, userId);
        const selectedCard2 = await CardAPI.getViewedCards(2, token, userId, false);
        const selectedCard4 = await CardAPI.getViewedCards(4, token, userId, false);
        const selectedCard5 = await CardAPI.getViewedCards(5, token, userId, false);
        const selectedCard6 = await CardAPI.getViewedCards(6, token, userId, false);
        
        setCardArray([...selectedCard1, ...selectedCard3, ...selectedCard7,
          ...selectedCard2,...selectedCard4, ...selectedCard5,...selectedCard6]);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
        navigate('/login')
      }
    };
    if(revise) {
      getRevisedCards()
    }
    else {
      getNewCards()
    }
  }, [revise, level]);

  return (
    <div>
      <h1>
        Vocabulaire
      </h1>
      <div className='container'>
        {level && level !== ""?
        (<CardViewer cardArray={cardArray} setRevise={setRevise} revise={revise}/>)
        :
        (<Level/>)
        }
        {/* <CardViewer cardArray={cardArray} setRevise={setRevise} revise={revise}/> */}
        {/* <Card text="Apple" showIcon={true} sentence1="I like to eat apples for a healthy snack." />
        <Sentences sentence1="I like to eat apples for a healthy snack." sentence2="I found a shiny red apple in the grocery store."/>
        <DoYouKnow/> */}
      </div>
    </div>
  )
}

export default Vocabulary
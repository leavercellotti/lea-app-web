import React, { useEffect, useState } from 'react'
import ReviseBox from '../../../components/User/Vocabulary/ReviseBox/ReviseBox'
import { FaBrain } from "react-icons/fa6";
import { CardAPI } from '../../../api/card-api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function VocabularyRevise() {
  // getViewedCards
  const [cardArray, setCardArray] = useState()
  const token = useSelector((store) => store.USER.token)
  const userId = useSelector(store => store.USER._id)
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allViewedCard = await CardAPI.getAllViewedCards(token, userId);
        console.log("sele", allViewedCard)
        setCardArray(allViewedCard);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
        navigate('/login')
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>
        Réviser
      </h1>
      <h2 className='h2'>
        Il est temps de réviser ! <FaBrain />
      </h2>
      <div className='container'>
        <ReviseBox cardArray={cardArray}/>
      </div>
    </div>
  )
}

export default VocabularyRevise
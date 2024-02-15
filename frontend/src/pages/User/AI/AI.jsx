import React, { useEffect, useState } from 'react'
import ChatGPT from '../../../components/User/AI/ChatGPT/ChatGPT'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { PromptiaAPI } from '../../../api/promptia-api';
import Level from '../../../components/User/Level/Level';

function AI() {
  const [prompt, setPrompt] = useState(null);
  const token = useSelector((store) => store.USER.token)
  const levelSpecific = useSelector((store) => store.USER.level)
  const navigate = useNavigate()
  const [level, setLevel] = useState()

  useEffect(() => {
    console.log(levelSpecific)
    if (levelSpecific === "A1" || levelSpecific === "A2") {
      setLevel(1);
      console.log(level)
    } else if (levelSpecific === "B1" || levelSpecific === "B2") {
      setLevel(2);
      console.log(level)
    } else if(levelSpecific === "C"){
      setLevel(3);
      console.log(level)
    }
  }, [levelSpecific, level]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dailyPrompt = await PromptiaAPI.getDailyPrompt(level, token);
        console.log(dailyPrompt)
        setPrompt(dailyPrompt);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
        //navigate('/login')
      }
    };
    if(level) {
      fetchData();
    }
  }, [level]);
  return (
    <div>
      <h1>
        Pratique
      </h1>
      <div className='container'>
        
        {levelSpecific && levelSpecific !== ""?
        (<ChatGPT prompt={prompt} />)
        :
        (<Level/>)
        }
      </div>
      
    </div>
  )
}

export default AI
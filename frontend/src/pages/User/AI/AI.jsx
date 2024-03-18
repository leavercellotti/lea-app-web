import React, { useEffect, useState } from 'react'
import ChatGPT from '../../../components/User/AI/ChatGPT/ChatGPT'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { PromptiaAPI } from '../../../api/promptia-api';
import Level from '../../../components/User/Level/Level';
import { MdOutlineSchool } from "react-icons/md";

function AI() {
  const [prompt, setPrompt] = useState(null);
  const token = useSelector((store) => store.USER.token)
  const levelSpecific = useSelector((store) => store.USER.level)
  const navigate = useNavigate()
  const [level, setLevel] = useState()

  useEffect(() => {
    if (levelSpecific === "A1" || levelSpecific === "A2") {
      setLevel(1);
    } else if (levelSpecific === "B1" || levelSpecific === "B2") {
      setLevel(2);
    } else if(levelSpecific === "C"){
      setLevel(3);
    }
  }, [levelSpecific, level]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dailyPrompt = await PromptiaAPI.getDailyPrompt(level, token);
        setPrompt(dailyPrompt);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
        navigate('/login')
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
        (<ChatGPT prompt={prompt} level={level} />)
        :
        (<Level/>)
        }
      </div>
      
    </div>
  )
}

export default AI
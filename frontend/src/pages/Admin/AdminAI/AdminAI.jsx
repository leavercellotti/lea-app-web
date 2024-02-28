import React, { useEffect, useState } from 'react'
import AdminPromptList from '../../../components/Admin/PromptIA/List/List'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PromptiaAPI } from '../../../api/promptia-api';

function AdminAI() {
  const [promptList, setPromptList] = useState([])
  const adminToken = useSelector((store) => store.ADMIN.token)
  const navigate = useNavigate()
  
  useEffect(() => {
    const getAll = async () => {
      try {
        const allPrompts = await PromptiaAPI.getAll(adminToken);
        const reversedAllPrompts = allPrompts.reverse()
        setPromptList(reversedAllPrompts);
      } catch (error) {
        console.error("Error fetching prompts:", error);
        navigate('/jgieojoergj0replj')
      }
    };

    getAll();
  }, []);
    return (
      <div>
        <h1>
          Admin Prompts
        </h1>
        <div className='container'>
        <AdminPromptList promptList={promptList} setPromptList={setPromptList}/>
        </div>
      </div>
    )
  }

export default AdminAI
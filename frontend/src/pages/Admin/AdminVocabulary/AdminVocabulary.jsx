import React, { useEffect, useState } from 'react'
import AdminVocabularyList from '../../../components/Admin/Vocabulary/List/List'
import { useSelector } from 'react-redux';
import { CardAPI } from '../../../api/card-api';
import { useNavigate } from 'react-router-dom';

function AdminVocabulary() {
  const [vocabularyList, setVocabularyList] = useState([])
  const adminToken = useSelector((store) => store.ADMIN.token)
  const navigate = useNavigate()
  
  useEffect(() => {
    const getAllVocabulary = async () => {
      try {
        const allCards = await CardAPI.getAll(adminToken);
        setVocabularyList(allCards);
        console.log("cards", allCards)
      } catch (error) {
        console.error("Error fetching cards:", error);
        navigate('/jgieojoergj0replj')
      }
    };

    getAllVocabulary();
  }, []);
    return (
      <div>
        <h1>
          Admin Vocabulary
        </h1>
        <div className='container'>
          <AdminVocabularyList list={vocabularyList} setList={setVocabularyList}/>
        </div>
      </div>
    )
  }

export default AdminVocabulary
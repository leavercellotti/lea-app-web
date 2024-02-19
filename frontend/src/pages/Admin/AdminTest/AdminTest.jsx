import React, { useEffect, useState } from 'react'
import AdminList from '../../../components/Admin/Test/List/List'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TestAPI } from '../../../api/test-api';

function AdminTest() {
  const [list, setList] = useState([])
  const adminToken = useSelector((store) => store.ADMIN.token)
  const navigate = useNavigate()
  
  useEffect(() => {
    const getAll = async () => {
      try {
        const all = await TestAPI.getAll(adminToken);
        setList(all);
      } catch (error) {
        console.error("Error fetching questions:", error);
        navigate('/jgieojoergj0replj')
      }
    };

    getAll();
  }, []);
    return (
      <div>
        <h1>
          Admin Test
        </h1>
        <div className='container'>
          <AdminList list={list} setList={setList}/>
        </div>
      </div>
    )
  }

export default AdminTest
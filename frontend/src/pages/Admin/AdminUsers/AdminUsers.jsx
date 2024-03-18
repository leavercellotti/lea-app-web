import React, { useEffect, useState } from 'react'
import AdminUserList from '../../../components/Admin/User/List/List'
import { UserAPI } from '../../../api/user-api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AdminPodcasts() {
  const [list, setList] = useState([])
  const adminToken = useSelector((store) => store.ADMIN.token)
  const navigate = useNavigate()
  
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const allUsers = await UserAPI.getAll(adminToken);
        console.log(allUsers)
        const reversedPodcasts = allUsers.reverse()
        setList(reversedPodcasts);
        
      } catch (error) {
        console.error("Error fetching podcasts:", error);
        navigate('/jgieojoergj0replj')
      }
    };

    getAllUsers();
  }, []);
    return (
      <div>
        <h1>
          Admin Users
        </h1>
        <div className='container'>
        <AdminUserList list={list} setList={setList}/>
        </div>
      </div>
    )
  }

export default AdminPodcasts
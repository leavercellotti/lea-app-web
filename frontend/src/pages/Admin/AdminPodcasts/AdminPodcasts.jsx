import React, { useEffect, useState } from 'react'
import AdminPodcastList from '../../../components/Admin/Podcast/List/List'
import { PodcastAPI } from '../../../api/podcast-api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function AdminPodcasts() {
  const [podcastList, setPodcastList] = useState([])
  const adminToken = useSelector((store) => store.ADMIN.token)
  const navigate = useNavigate()
  
  useEffect(() => {
    const getAllPodcasts = async () => {
      try {
        const allPodcasts = await PodcastAPI.getAll(adminToken);
        const reversedPodcasts = allPodcasts.reverse()
        setPodcastList(reversedPodcasts);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
        navigate('/jgieojoergj0replj')
      }
    };

    getAllPodcasts();
  }, []);
    return (
      <div>
        <h1>
          Admin Podcast
        </h1>
        <div className='container'>
        <AdminPodcastList podcastList={podcastList} setPodcastList={setPodcastList}/>
        </div>
      </div>
    )
  }

export default AdminPodcasts
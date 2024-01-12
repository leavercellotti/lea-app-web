import React, { useEffect, useState } from 'react'
import AdminPodcastList from '../../../components/Admin/Podcast/List/List'
import { PodcastAPI } from '../../../api/podcast-api';
import { useSelector } from 'react-redux';

function AdminPodcasts() {
  const [podcastList, setPodcastList] = useState([])
  const adminToken = useSelector((store) => store.ADMIN.token)
  
  useEffect(() => {
    const getAllPodcasts = async () => {
      try {
        const allPodcasts = await PodcastAPI.getAll(adminToken);
        setPodcastList(allPodcasts);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
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
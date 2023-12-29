import React, { useEffect, useState } from 'react'
import AdminPodcastList from '../../../components/Admin/AdminPodcastList/AdminPodcastList'
import { PodcastAPI } from '../../../api/podcast-api';

function AdminPodcasts() {
  const [podcastList, setPodcastList] = useState([])
  useEffect(() => {
    const getAllPodcasts = async () => {
      try {
        const allPodcasts = await PodcastAPI.getAll();
        setPodcastList(allPodcasts);
        console.log('list',podcastList)
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
        <AdminPodcastList podcastList={podcastList}/>
      </div>
    </div>
  )
}

export default AdminPodcasts
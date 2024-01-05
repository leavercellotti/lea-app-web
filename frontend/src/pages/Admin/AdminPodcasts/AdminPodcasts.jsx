import React, { useEffect, useState } from 'react'
import AdminPodcastList from '../../../components/Admin/Podcast/List/List'
import { PodcastAPI } from '../../../api/podcast-api';
import { useSelector } from 'react-redux';
import { setConnect, setToken } from '../../../store/admin-slice'
import AdminNotConnect from '../../../components/Admin/AdminNotConnect/AdminNotConnect';

function AdminPodcasts() {
  const isConnect = useSelector(store => store.ADMIN.isConnect)
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
  if(isConnect) {
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
  else {
    return(
      <div>
        <AdminNotConnect/>
      </div>
    )
  }

}

export default AdminPodcasts
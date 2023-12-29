import React, { useEffect, useState } from 'react'
import { PodcastAPI } from '../../../api/podcast-api';
import PodcastList from '../../../components/User/Podcast/PodcastList/PodcastList';
import PodcastOptions from '../../../components/User/Podcast/PodcastOptions/PodcastOptions';

function Podcasts() {
  const [podcastList, setPodcastList] = useState([]);
  const [option, setOption] = useState(); // 0 Débutant, 1 Inter, 2 tout, 3 favoris

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
        Podcast
      </h1>
      <div className='container'>
        {option ?
          (<PodcastList podcastList={podcastList}/>):
          (<PodcastOptions setOption={setOption}/>)
        }
      </div>
    </div>
  )
}

export default Podcasts
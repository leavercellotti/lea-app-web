import React, { useEffect, useState } from 'react'
import { PodcastAPI } from '../../../api/podcast-api';
import PodcastList from '../../../components/User/Podcast/PodcastList/PodcastList';
import PodcastOptions from '../../../components/User/Podcast/PodcastOptions/PodcastOptions';
import { useNavigate, useParams } from 'react-router-dom';

function Podcasts() {
  const [podcastList, setPodcastList] = useState([]);
  const navigate = useNavigate()
  const {level} = useParams()
  console.log("level",level)
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

    const getPodcastsByLevel = async () => {
      try {
        const allPodcasts = await PodcastAPI.getByLevel(level);
        setPodcastList(allPodcasts);
        console.log('list',podcastList)
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };
    level ? getPodcastsByLevel() : getAllPodcasts()
  }, []);
  return (
    <div>
      <h1>
        Podcast
      </h1>
      <div className='right'>
          <button 
            className='btn' 
            style={{margin: "0 10px 10px 0"}}
            onClick={() => navigate('/podcasts')}
          >
            Tout voir
          </button>
        </div>
      <div className='container'>
        <PodcastList podcastList={podcastList} selectedLevel={level}/>
      </div>
    </div>
  )
}

export default Podcasts
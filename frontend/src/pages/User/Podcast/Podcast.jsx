import React, { useEffect, useState } from 'react'
import PodcastOpened from '../../../components/User/Podcast/PodcastOpened/PodcastOpened'
import { PodcastAPI } from '../../../api/podcast-api'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Podcast() {
  const [podcast, setPodcast] = useState(null);
  const {_id} = useParams()
  const token = useSelector((store) => store.USER.token)
  const navigate = useNavigate()

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedPodcast = await PodcastAPI.getById(_id, token);
        setPodcast(selectedPodcast);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
        navigate('/login')
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>
        Podcast
      </h1>
      <div className='container'>
        {podcast ? (
            <PodcastOpened
              _id={_id}
              title={podcast.title}
              image={podcast.image}
              link={podcast.link}
              transcription={podcast.transcription}
              translation={podcast.translation}
            />
          ) : (
            <p>Loading...</p>
          )}
      </div>
    </div>
  )
}

export default Podcast
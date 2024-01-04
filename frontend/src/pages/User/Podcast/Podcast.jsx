import React, { useEffect, useState } from 'react'
import AudioPlayer from '../../../components/User/Podcast/AudioPlayer/AudioPlayer'
import PodcastItem from '../../../components/User/Podcast/PodcastItem/PodcastItem'
import PodcastList from '../../../components/User/Podcast/PodcastList/PodcastList'
import PodcastOpened from '../../../components/User/Podcast/PodcastOpened/PodcastOpened'
import PodcastOptions from '../../../components/User/Podcast/PodcastOptions/PodcastOptions'
import { PodcastAPI } from '../../../api/podcast-api'
import { useParams } from 'react-router-dom'

function Podcast() {
  const [podcast, setPodcast] = useState(null);
  const {_id} = useParams()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedPodcast = await PodcastAPI.getById(_id);
        setPodcast(selectedPodcast);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
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
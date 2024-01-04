import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { PodcastAPI } from '../../../api/podcast-api';
import PodcastOptions from '../../../components/User/Podcast/PodcastOptions/PodcastOptions';

function PodcastOptionsPage() {
    const [option, setOption] = useState(); // 1 Débutant, 2 Inter, 4 tout, 5 favoris
  
    return (
        <div>
          <h1>
            Podcast
          </h1>
          <div className='container'>
              <PodcastOptions setOption={setOption}/>
          </div>
        </div>
      )
}

export default PodcastOptionsPage
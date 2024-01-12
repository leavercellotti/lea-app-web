import React, { useEffect, useState } from 'react'
import { PodcastAPI } from '../../../api/podcast-api';
import PodcastList from '../../../components/User/Podcast/PodcastList/PodcastList';
import PodcastOptions from '../../../components/User/Podcast/PodcastOptions/PodcastOptions';
import { useNavigate, useParams } from 'react-router-dom';
import Filter from '../../../components/User/Podcast/Filter/Filter';
import { useSelector } from 'react-redux';

function Podcasts() {
  const podcastsLikedArray = useSelector(store => store.USER.podcastsLikedArray);
  const podcastsListenedArray = useSelector(store => store.USER.podcastsListenedArray);
  const token = useSelector((store) => store.USER.token)

  const [podcastList, setPodcastList] = useState([]);
  const [allPodcastList, setAllPodcastList] = useState([]);
  const [podcastListenedList, setPodcastListenedList] = useState([]);
  const [podcastLikedList, setPodcastLikedList] = useState([]);
  const [podcastLikedAndListenedList, setPodcastLikedAndListenedList] = useState([]);
  const navigate = useNavigate()
  const [level, setLevel] = useState()
  useEffect(() => {
    const getAllPodcasts = async () => {
      try {
        const allPodcasts = await PodcastAPI.getAll(token);
        setPodcastList(allPodcasts);
        console.log('all', allPodcastList)
        setAllPodcastList(allPodcasts)
        const likedList = allPodcasts.filter(podcast => podcastsLikedArray.includes(podcast._id));
        setPodcastLikedList(likedList)
        const listenedList = allPodcasts.filter(podcast => podcastsListenedArray.includes(podcast._id));
        setPodcastListenedList(listenedList)
        const likedAndListenedList = listenedList.filter(podcast => podcastsLikedArray.includes(podcast._id));
        setPodcastLikedAndListenedList(likedAndListenedList)
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };

    const getPodcastsByLevel = async () => {
      try {
        const allPodcasts = await PodcastAPI.getByLevel(level, token);
        setPodcastList(allPodcasts);
        setAllPodcastList(allPodcasts)
        const likedList = allPodcasts.filter(podcast => podcastsLikedArray.includes(podcast._id));
        setPodcastLikedList(likedList)
        const listenedList = allPodcasts.filter(podcast => podcastsListenedArray.includes(podcast._id));
        setPodcastListenedList(listenedList)
        const likedAndListenedList = listenedList.filter(podcast => podcastsLikedArray.includes(podcast._id));
        setPodcastLikedAndListenedList(likedAndListenedList)
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };
    level ? getPodcastsByLevel() : getAllPodcasts()
  }, [podcastsLikedArray, podcastsListenedArray, level]);
  return (
    <div>
      <h1>
        Podcast
      </h1>
      <div className='right'>
          <Filter podcastList={podcastList} setPodcastList={setPodcastList} 
            podcastLikedList={podcastLikedList} 
            podcastListenedList={podcastListenedList} 
            podcastLikedAndListenedList={podcastLikedAndListenedList} 
            allPodcastList={allPodcastList} 
            setLevel={setLevel}
          />
        </div>
      <div className='container'>
        <PodcastList podcastList={podcastList} selectedLevel={level}/>
      </div>
    </div>
  )
}

export default Podcasts
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
  
  const [podcastList, setPodcastList] = useState([]);
  const [allPodcastList, setAllPodcastList] = useState([]);
  const [podcastListenedList, setPodcastListenedList] = useState([]);
  const [podcastLikedList, setPodcastLikedList] = useState([]);
  const [podcastLikedAndListenedList, setPodcastLikedAndListenedList] = useState([]);
  
  // useEffect(() => {
  //   const likedList = podcastList?.filter(podcast => podcastsLikedArray.includes(podcast._id));
  //   setPodcastLikedList(likedList)
  //   console.log(likedList)
  // },[podcastList, podcastsLikedArray])
  const navigate = useNavigate()
  const [level, setLevel] = useState()
  console.log("level",level)
  useEffect(() => {
    const getAllPodcasts = async () => {
      try {
        const allPodcasts = await PodcastAPI.getAll();
        setPodcastList(allPodcasts);
        setAllPodcastList(allPodcasts)
        const likedList = allPodcasts.filter(podcast => podcastsLikedArray.includes(podcast._id));
        setPodcastLikedList(likedList)
        const listenedList = allPodcasts.filter(podcast => podcastsListenedArray.includes(podcast._id));
        setPodcastListenedList(listenedList)
        const likedAndListenedList = listenedList.filter(podcast => podcastsLikedArray.includes(podcast._id));
        setPodcastLikedAndListenedList(likedAndListenedList)
      console.log("liked", likedList, podcastLikedList)
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
        setAllPodcastList(allPodcasts)
        const likedList = allPodcasts.filter(podcast => podcastsLikedArray.includes(podcast._id));
        setPodcastLikedList(likedList)
        const listenedList = allPodcasts.filter(podcast => podcastsListenedArray.includes(podcast._id));
        setPodcastListenedList(listenedList)
        const likedAndListenedList = listenedList.filter(podcast => podcastsLikedArray.includes(podcast._id));
        setPodcastLikedAndListenedList(likedAndListenedList)
      console.log("liked", likedList, podcastLikedList)
        console.log('list',podcastList)
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
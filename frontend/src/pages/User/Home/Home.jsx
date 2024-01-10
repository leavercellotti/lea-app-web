import React, { useEffect } from 'react'
import HomeComponent from "../../../components/User/Home/Home"
import { useDispatch } from 'react-redux'
import { setEmail, setPodcastsLikedArray, setPodcastsListenedArray, setUser, setUserId } from '../../../store/user-slice'

function Home() {
  
  return (
    <div>
      <HomeComponent/>
    </div>
  )
}

export default Home
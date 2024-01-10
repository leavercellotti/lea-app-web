import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import {addPodcastLikedArray, removePodcastLikedArray} from "../../../../store/user-slice"
import { UserAPI } from '../../../../api/user-api';
import s from "./style.module.css"
function Like({_id, size, style}) {
    const podcastsLikedArray = useSelector(store => store.USER.podcastsLikedArray)
    const [liked, setLiked] = useState(podcastsLikedArray.includes(_id)); // Initialize liked state
    const dispatch = useDispatch()
    const user_id = useSelector(store => store.USER._id)
    const likeToggleBackend = async () => {
        // Update liked status in the component state
        setLiked(!liked);
    
        // Make API call to update user's liked podcasts
        try {
          const response = await UserAPI.updateLikedPodcasts(user_id, !liked, _id);
          if (response) {
            console.log('User liked podcasts updated successfully.');
          } else {
            console.error('Failed to update user liked podcasts.');
          }
        } catch (error) {
          console.error('Error updating user liked podcasts:', error);
        }
      };
    
      function handleLikeClick() {
        likeToggleBackend()
        dispatch(addPodcastLikedArray(_id))
      }
      function handleDislikeClick() {
        likeToggleBackend()
        dispatch(removePodcastLikedArray(_id))
      }
      return (
        <div style={style}>
          {podcastsLikedArray && podcastsLikedArray.includes(_id) ? (
            <FaHeart//aimé
              size={size} 
              className={s.pointer}
              onClick={handleDislikeClick}
            />
          ) : (
            <FaRegHeart //pas aimé
              size={size}
              className={s.pointer}
              onClick={handleLikeClick}
            />
          )}
        </div>
      );      
}

export default Like
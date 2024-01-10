import React, { useContext } from 'react'
import LoginBox from '../../../components/User/Login/LoginBox/LoginBox'
import { UserAPI } from '../../../api/user-api'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setConnect, setPodcastsLikedArray, setUser, setUserId } from '../../../store/user-slice'
function Login({setToken}) {
    const dispatch = useDispatch()
  const navigate = useNavigate()
  async function addUserHandler(userData) {
    const response= await UserAPI.create(userData)
                        .then(function(response) { 
                            return response
                        })//vaut false s'il y a eu une erreur
    if(response) {
        alert("Inscription validée, connectez-vous")
    }
    else {
        alert("Vous êtes déjà inscrit, connectez-vous")
    } 
  }
  async function connectUserHandler(userData) {
    console.log("user",userData)
    const response = await UserAPI.connect(userData)
        .then(function(response) { 
            return response
            })
    if(response) {
        console.log("res data", response.data)
        if(setToken){
            setToken(response.data.token)
            localStorage.setItem('token', JSON.stringify(response.data.token));
        }
        // const token= response.data.token
        // const user_id= response.data.userId
        // const podcastsLikedArray = response.data.podcastsLikedArray
        // const podcastsListenedArray = response.data.podcastsListenedArray
        dispatch(setUser({...response.data, _id: response.data.userId}))
        // dispatch(setToken({token:token}))
        // dispatch(setUserId(user_id));
        // dispatch(setPodcastsLikedArray(podcastsLikedArray))
        const dataUserToStore = {
            email : userData.email,
            _id : response.data.userId,
            // token : response.data.token,
            podcastsLikedArray : response.data.podcastsLikedArray,
            podcastsListenedArray : response.data.podcastsListenedArray
        };
        console.log(dataUserToStore)
        localStorage.setItem('user-info', JSON.stringify(dataUserToStore));
        //setTimeout(logoutHandler,60*60*1000) déconnection après 1h
        navigate("/")
    }
    else {
        alert("Données incorrectes")
    }
  }
  return (
    <div style={{marginTop: "150px"}}>
        <h1 className='h1'>
            Login
        </h1>
        <div className='container'>
            <LoginBox connectHandler={connectUserHandler} addHandler={addUserHandler}/>
        </div>
    </div>
  )
}

export default Login
import React, { useContext, useState } from 'react'
import LoginBox from '../../../components/User/Login/LoginBox/LoginBox'
import { UserAPI } from '../../../api/user-api'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setConnect, setPodcastsLikedArray, setUser, setUserId } from '../../../store/user-slice'
function Login({setToken}) {
    const dispatch = useDispatch()
  const navigate = useNavigate()
  const [login, setLogin] = useState(true)//true login false signup
  async function addUserHandler(userData) {
    const response= await UserAPI.create(userData)
                        .then(function(response) { 
                            return response
                        })//vaut false s'il y a eu une erreur
    if(response) {
        setLogin(true)
        alert("Inscription validée, connectez-vous")
    }
    else {
        alert("Vous êtes déjà inscrit, connectez-vous")
    } 
  }
  async function connectUserHandler(userData) {
    const response = await UserAPI.connect(userData)
        .then(function(response) { 
            return response
            })
    if(response) {
        if(setToken){
            setToken(response.data.token)
            localStorage.setItem('token', JSON.stringify(response.data.token));
        }
        console.log(response.data)
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
            token : response.data.token,
            podcastsLikedArray : response.data.podcastsLikedArray,
            podcastsListenedArray : response.data.podcastsListenedArray,
            nbLearnedCards: response.data.nbLearnedCards
        };
        localStorage.setItem('user-info', JSON.stringify(dataUserToStore));
        //setTimeout(logoutHandler,60*60*1000) déconnection après 1h
        navigate("/")
    }
    else {
        alert("Données incorrectes")
    }
  }
  return (
    <div style={{marginTop: '150px', display:'flex', justifyContent:'center'}}>
        <div style={{backgroundColor: '#9BB5D8', padding: '20px 5px', width: '700px', maxWidth:'90%'}}>
        <h1 className='h1'>
            Login
        </h1>
        <div className='container'>
            <LoginBox 
                connectHandler={connectUserHandler} addHandler={addUserHandler}
                login={login} setLogin={setLogin}
            />
        </div>
        </div>
    </div>
  )
}

export default Login
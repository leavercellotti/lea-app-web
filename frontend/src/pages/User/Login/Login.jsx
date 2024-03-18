import React, { useContext, useEffect, useState } from 'react'
import LoginBox from '../../../components/User/Login/LoginBox/LoginBox'
import { UserAPI } from '../../../api/user-api'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setConnect, setPodcastsLikedArray, setUser, setUserId } from '../../../store/user-slice'
import PWForgotten from '../../../components/User/Login/PWForgotten/PWForgotten'
import { StripeAPI } from '../../../api/stripe-api'
function Login({setToken}) {
    const dispatch = useDispatch()
  const navigate = useNavigate()
  const [login, setLogin] = useState(true)//true login false signup
  const [stripeId, setStripeId] = useState()
  const [userId, setUserId] = useState()
  const [isAdded, setIsAdded] = useState(false)

async function addUserHandler(userData) {
    try {
        console.log(userData);
        const stripeResponse = await StripeAPI.createCustomer(userData.name, userData.email);
        console.log(stripeResponse)
        if (stripeResponse) {
            console.log("Customer created successfully:", stripeResponse);
            setStripeId(stripeResponse.customerId);

            const userResponse = await UserAPI.create(userData, stripeResponse.customerId);
            console.log("User created successfully:", userResponse.data.userId);
            setUserId(userResponse.data.userId);
            console.log(userResponse)

            if (userResponse) {
                setLogin(true);
                setIsAdded(true)
                alert("Inscription validée.");
            } else {
                alert("Erreur lors de la création de l'utilisateur.");
            }
        } else {
            alert("Erreur lors de la création du client Stripe.");
        }
    } catch (error) {
        console.error("Error while adding user:", error);
        alert("Une erreur s'est produite lors de l'ajout de l'utilisateur.");
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
            email : response.data.email,
            _id : response.data.userId,
            token : response.data.token,
            podcastsLikedArray : response.data.podcastsLikedArray,
            podcastsListenedArray : response.data.podcastsListenedArray,
            nbLearnedCards: response.data.nbLearnedCards,
            level: response.data.level,
            subscription: response.data.subscription,
            nbDownloadedPodcastsToday: response.data.nbDownloadedPodcastsToday,
            nbChatsMade: response.data.nbChatsMade,
            free: response.data.free,
            current_period_end: response.data.current_period_end,
        };
        console.log(response.data)
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
        <div style={{backgroundColor: '#9BB5D8', padding: '20px 5px', width: '700px', maxWidth:'90%', maxHeight:"450px"}}>
            {/* , maxHeight:"600px" */}
        <h1 className='h1'>
            Login
        </h1>
        <div className='container'>
            <LoginBox 
                connectHandler={connectUserHandler} addHandler={addUserHandler}
                login={login} setLogin={setLogin} stripeId={stripeId} userId={userId} isAdded={isAdded}
            />
        </div>
        </div>
    </div>
  )
}

export default Login
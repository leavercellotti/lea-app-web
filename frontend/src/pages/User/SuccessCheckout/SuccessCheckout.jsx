import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { StripeAPI } from '../../../api/stripe-api';
import { UserAPI } from '../../../api/user-api';
import Confetti from 'react-confetti';


function SuccessCheckout() {
    const {sessionId} = useParams()
    console.log(sessionId)
    // const [subscriptionId, setSubscriptionId] = useState()
    const [executed, setExecuted] = useState(false);
    
    const [sessionInfo, setSessionInfo] = useState()
    const [subscriptionValid, setSubscriptionValid] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchSessionInfo = async () => {
            try {
                const res = await StripeAPI.sessionInfo(sessionId);
                console.log(res.session);
                setSessionInfo(res.session);
            } catch (error) {
                console.error("Error fetching sessionInfo:", error);
            }
        };
    
        async function addUserHandler() {
            try {
                if (sessionInfo && !executed) {
                    setExecuted(true);
                    console.log("add", sessionInfo);
                    const data = {
                        name: sessionInfo.customer_details.name,
                        email: sessionInfo.customer_details.email,
                        sessionId: sessionInfo.id,
                        subscriptionId: sessionInfo.subscription
                    };
                    console.log("data", data);
                    const userResponse = await UserAPI.create(data, sessionInfo.customer);
                    console.log("User created successfully:", userResponse.data.userId);
                    // setUserId(userResponse.data.userId);
                    console.log(userResponse);

                    if (userResponse) {
                        // setLogin(true);
                        // setIsAdded(true)
                        setSubscriptionValid(true)
                        window.location.href = "https://lea-vercellotti.systeme.io/merci-application";
                    } else {
                        // alert("Erreur lors de la création de l'utilisateur.");
                        setSubscriptionValid(false)
                    }
                }
            } catch (error) {
                console.error("Error while adding user:", error);
                // alert("Une erreur s'est produite lors de l'ajout de l'utilisateur.");
            }
        }
        if(!executed) {
        fetchSessionInfo();
        addUserHandler();
        }

    }, [sessionInfo]);
    
    
  return (
    <div  className='container' style={{height:"1000px", paddingTop:"150px"}}>
        <Confetti/>
        {subscriptionValid ?
        (<div className='box'>
           <p> Votre inscription est validée.</p>
           {/* <p>Vos information de connexions vous ont été envoyées par mail.</p>
            <button className='btn' onClick={() => navigate("/login")}>Se connecter</button> */}
        </div>) 
        :
        (<div className='box'>
            <p> Une erreur s'est produite.</p>
         </div>)
        }
    </div>
  )
}

export default SuccessCheckout
import React, { useEffect, useState } from 'react'
import s from "./style.module.css"
import { StripeAPI } from '../../../../api/stripe-api'
import { UserAPI } from '../../../../api/user-api'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function SubscriptionOptions({trial}) {
    const navigate = useNavigate()
    // const [subscriptionId, setSubscriptionId] = useState()
    // const [sessionId, setSessionId] = useState()
    const [subscription, setSubscription] = useState("6 mois")
    const [freeTrial, setFreeTrial] =useState(false)
    const token = useSelector(store => store.USER.token)
    const checkoutHandler = async (subscriptionVar, freeTrialVar) => {
        console.log('checkout', subscriptionVar, freeTrialVar)
        try {
            const res = await StripeAPI.checkout(subscriptionVar, freeTrialVar); // Remarque : assurez-vous que stripeId est défini
            // setSessionId(res.sessionId);
            console.log(res);
    
            if(res.url) {
                window.location.href = res.url;
            }
    
        } catch (error) {
            console.error('Erreur lors de la gestion du paiement :', error);
        }
    };

    function logoutHandler() {
        console.log("logout")
        localStorage.removeItem('user-info')
        localStorage.removeItem('token')
        // window.location.reload(false);
      }

    const handleValidate = (subscription, freeTrial) => {
        console.log(token)
        if(token) {
            logoutHandler()
        }
        checkoutHandler(subscription, freeTrial)
    }

    const handleFree = () => {
        // setSubscription("Lite");
        // setFreeTrial(true);
        handleValidate("Mensuel", true);
    }

    if(trial){
        return(
            <div className={s.btnContainer}>
            <p className={s.link} style={{fontSize:"22px", marginBottom: "60px"}} onClick={handleFree}>Profiter de 7 jours gratuits</p>
            <p 
                onClick={() => {navigate("/login"); window.location.reload();}} 
                className={s.link}
            >
                Se connecter
            </p>
        </div>
            
        )
    }

  return (
    <div className={s.container}>
        <h2>
            Sélectionnez un abonnement
        </h2>
        <div className={s.optionsContainer}>
            <div 
                className={s.optionContainer}
                style={{backgroundColor:subscription === "Mensuel" ? "#e5d0d0" : "#ffffff",border:subscription === "Mensuel" ? "2px solid #AF2B26" : "2px solid #28356B"}}
                onClick={() => setSubscription("Mensuel")}
            >
                <h3 className={s.type}>Mensuel</h3>
                <div>
                    <div className={s.monthPrice}>
                        <div className={s.month}>
                            1 mois
                        </div>
                        
                        <div className={s.price}>
                            25,00 €
                        </div>
                    </div>
                    <div className={s.equal}>
                        équivalent à 25,00 € / mois
                    </div>
                    <div style={{textAlign:"left", marginTop:"30px"}}>
                        Pour les résidents français, 
                        le prix TTC est de <span style={{whiteSpace:"nowrap"}}> 30,00 €</span> par mois.
                    </div>
                </div>
            </div>
            <div 
                className={s.optionContainer}
                style={{backgroundColor:subscription === "6 mois" ? "#e5d0d0" : "#ffffff",border:subscription === "6 mois" ? "2px solid #AF2B26" : "2px solid #28356B"}}
                
                onClick={() => setSubscription("6 mois")}
            >
                <h3 className={s.type}>6 mois</h3>
                <div>
                    <div className={s.monthPrice}>
                        <div className={s.month}>
                            6 mois
                        </div>
                        <div className={s.price}>
                            <span className={s.crossed}>150,00 €</span> 120,00 €
                        </div>
                    </div>
                    <div className={s.equal}>
                        équivalent à 20,00 € / mois
                    </div>
                    <div style={{textAlign:"left", marginTop:"30px"}}>
                        Pour les résidents français, 
                        le prix TTC est de <span style={{whiteSpace:"nowrap"}}> 144,00 €</span> ( soit <span style={{whiteSpace:"nowrap"}}>24,00 €</span> par mois).
                    </div>
                </div>
            </div>
            <div
                className={`${s.optionContainer}`}
                style={{backgroundColor:subscription === "12 mois" ? "#e5d0d0" : "#ffffff",border:subscription === "12 mois" ? "2px solid #AF2B26" : "2px solid #28356B"}}
                onClick={() => setSubscription("12 mois")}
            >
                <div className={s.label}>Le moins cher</div>
                <h3 className={s.type}>12 mois</h3>
                <div>
                    <div className={s.monthPrice}>
                        <div className={s.month}>
                            12 mois
                        </div>
                        <div className={s.price}>
                        <span className={s.crossed}>300,00 €</span> 180,00 €
                        </div>
                    </div>
                        <div className={s.equal}>
                            équivalent à 15,00 € / mois
                        </div>
                    <div style={{textAlign:"left", marginTop:"30px"}}>
                        Pour les résidents français, 
                        le prix TTC est de <span style={{whiteSpace:"nowrap"}}> 216,00 €</span> ( soit <span style={{whiteSpace:"nowrap"}}>18,00 €</span> par mois).
                    </div>
                </div>
            </div>
        </div>
        <div className={s.btnContainer}>
            <button className='btn' onClick={() => handleValidate(subscription, freeTrial)}>C'est parti !</button> 
            {/* checkoutHandler(); logoutHandler(); window.speechSynthesis.cancel();  */} 
            <p 
                onClick={() => {navigate("/login"); window.location.reload();}} 
                className={s.link}
            >
                Se connecter
            </p>
        </div>
    </div>
  )
}

export default SubscriptionOptions
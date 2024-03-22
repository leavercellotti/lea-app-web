import React, { useState } from 'react';
import s from "./style.module.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserAPI } from '../../../api/user-api';
import Level from '../Level/Level';
import PWForgotten from '../Login/PWForgotten/PWForgotten';

function ProfileUser({email, level}) {
  const navigate = useNavigate();
  const subscription = useSelector(store => store.USER.subscription);
  const free = useSelector(store => store.USER.free);
  const userId = useSelector(store => store.USER._id);
  const current_period_end = useSelector(store => store.USER.current_period_end);
  const [modifyLevel, setModifyLevel] = useState(false)
  const [isPWForgotten, setIsPWForgotten] = useState(false);

  async function unsubscribeHandler() {
    try {
      const isUnsubscribed = await UserAPI.unsubscribe(userId, email);
      console.log('Unsubscribed successfully.');
      if(isUnsubscribed) {
        localStorage.removeItem('user-info')
        localStorage.removeItem('token')
        window.location.href = "https://lea-vercellotti.systeme.io/desinscription-application";
        // window.location.reload(false);
      }
    } catch (error) {
      console.error('Error while unsubscribing:', error);
    }
  }

  function confirmUnsubscribe() {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir arrêter l'abonnement ? Cette action est irréversible.");
    if (isConfirmed) {
      unsubscribeHandler();
    }
  }

  if(modifyLevel) {
    return(
      <Level setEditLevel={setModifyLevel} editLevel={modifyLevel}/>
    )
  }
  else if (isPWForgotten) {
    return (
        <div className={`box ${s.container}`}>
            <PWForgotten setIsPWForgotten={setIsPWForgotten} />
        </div>
    );
  } else {
    
  return (
    <div className='box'>
      <div className={s.innerContainer}>
        <div className={s.inner}>
            <p>
              <b>Email</b> : {email}
            </p>
            <div 
                    onClick={() => setIsPWForgotten(true)}
                    className={s.link}
                    style={{fontSize:"16px", marginTop:"10px"}}
                >
                    Modifier le mot de passe
                </div>
            <p>
            <b>Niveau</b> : 
            {level === ""?
            (<button className='btn btnSpace' onClick={() => navigate("/test")}>Faire le test</button>)
            :
            (<> 
               { level}
              <button onClick={() => setModifyLevel(true)} className='btn' style={{marginLeft:"15px"}}>Modifier</button>
            </>)
            }
            </p>
            <p>
            <b>Abonnement</b> : {(free && subscription !== "Forever Free") ? "Essai gratuit" : subscription} 
              <button className="btn" onClick={() => navigate("/subscription")} style={{marginLeft:"15px"}}>Modifier</button>
              {free && subscription !== "Forever Free" ?
                (<div className={s.pink}>L'essai prendra fin le {current_period_end}.</div>)
                :
                (subscription !== "Forever Free" ?
                  (<div className={s.pink}>Le renouvellement de l'abonnement aura lieu le {current_period_end}.</div>)
                  :
                  (null)
                )
              }
              <p className={s.link} onClick={confirmUnsubscribe}>Arrêter l'abonnement</p>
              <p className={s.small}>En cas d'arrêt de l'abonnement, l'accès à l'application sera immédiatement suspendu et vos données seront définitivement perdues.</p>
            </p>
        </div>
      </div>
    </div>
  )
}
}

export default ProfileUser;

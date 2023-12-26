import React from 'react'
import s from "./style.module.css"

function ProfileUser({email, level, subscription}) {
  return (
    <div className='box'>
      <div className='right'>
      <button className='btn'>Se déconnecter</button>
      </div>
      <div className={s.innerContainer}>
        <div className={s.inner}>
            <p>
              <b>Email</b> : {email}
            </p>
            <p>
            <b>Niveau</b> : {level}
            </p>
            <p>
            <b>Abonnement</b> : {subscription} 
              <button className="btn" style={{marginLeft:"15px"}}>Modifier</button>
              <div className={s.pink}>Plus que 3 jours !</div>
            </p>
        </div>
      </div>
    </div>
  )
}

export default ProfileUser
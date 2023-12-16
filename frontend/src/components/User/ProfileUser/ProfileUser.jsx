import React from 'react'
import s from "./style.module.css"

function ProfileUser({email, level, subscription}) {
  return (
    <div className={s.container}> 
      <div>
        <button className='btn'>Se déconnecter</button>
      </div>
      <div className='box'>
          <p>
            Email: {email}
          </p>
          <p>
            Niveau : {level}
          </p>
          <p>
            Abonnement:{subscription}
          </p>
      </div>
    </div>
  )
}

export default ProfileUser
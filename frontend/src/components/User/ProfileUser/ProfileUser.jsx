import React from 'react'
import s from "./style.module.css"
import { useNavigate } from 'react-router-dom';

function ProfileUser({email, level, subscription}) {
  const navigate = useNavigate()
  return (
    <div className='box'>
      <div className={s.innerContainer}>
        <div className={s.inner}>
            <p>
              <b>Email</b> : {email}
            </p>
            <p>
            <b>Niveau</b> : 
            {level === ""?
            (<button className='btn btnSpace' onClick={() => navigate("/test")}>Faire le test</button>)
            :
            (<> {level}</>)
            }
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
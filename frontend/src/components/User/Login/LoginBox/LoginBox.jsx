import React, { useState } from 'react'
import s from "./style.module.css"
import EmailPw from '../EmailPw/EmailPw'
import SubscriptionChoice from '../SubscriptionChoice/SubscriptionChoice'

function LoginBox({connectHandler, addHandler}) {
    const [login, setLogin] = useState(true)//true login false signup
  return (
    <div className={`box ${s.container}`}>
        <div className={s.btnContainer}>
            <div 
                onClick={()=>setLogin(true)}
                className={`${s.btn} ${login ? s.pink : s.white}`}>
                    Se connecter
            </div>
            <div 
                onClick={()=>setLogin(false)} 
                className={`${s.btn} ${login ? s.white : s.pink}`}>
                    S'inscrire
            </div>
        </div>
        <h3>{login ? 'Se connecter' : "S'inscrire"}</h3>
        <EmailPw 
            login={login} 
            connectHandler={connectHandler} 
            addHandler={addHandler}
        />
    </div>
  )
}

export default LoginBox

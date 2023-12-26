import React, { useState } from 'react'
import s from "./style.module.css"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
function EmailPw() {
    
    const [isPwShown, setIsPwShown] = useState(false)

    function togglePwShown() {
        isPwShown? setIsPwShown(false) : setIsPwShown(true)
    }
  return (
    <div className={s.innerContainer}>
            <div className={s.inner}>
                <p>
                <b>Adresse mail</b> : <input/>
                </p>
                <div className={s.pwContainer}>
                    <b>Mot de passe</b> : 
                    <input type={isPwShown ? 'text' : 'password'}/>
                    <div 
                        className={s.eyeContainer}
                        onClick={togglePwShown}
                    >
                        {isPwShown?
                            (<FaEye/>):
                            (<FaEyeSlash/>)
                        }
                    </div>
                </div>
                <div className={s.btnValidateContainer}>
                    <button className='btn'>Valider</button>
                </div>
            </div>
        </div>
  )
}

export default EmailPw
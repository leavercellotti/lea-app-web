import React, { useRef, useState } from 'react'
import s from "./style.module.css"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
function EmailPw({login, connectHandler, addHandler}) {
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const [isPwShown, setIsPwShown] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    function togglePwShown() {
        isPwShown? setIsPwShown(false) : setIsPwShown(true)
    }
    function submitHandler(e) {
        e.preventDefault()
        const enteredEmail = emailInputRef.current.value.toLowerCase()
        const enteredPassword = passwordInputRef.current.value
        const user = {
            email: enteredEmail,
            password: enteredPassword
        }
        if(login) {
            connectHandler(user)
        }
        else{
            addHandler(user)
        }
    }

    var validator = require('validator')
    const validate = (value) => {
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 0
        })) {
            setErrorMessage('Mot de passe sécurisé')
        } 
        else {
            setErrorMessage('Mot de passe faible')
        }  
    }
  return (
    <div className={s.innerContainer}>
            <div className={s.inner}>
                <div  className={s.pwContainer}>
                    
                    <label className={s.label} htmlFor="email">
                        <b>Adresse email: </b>
                    </label>
                    <input 
                        type="email" 
                        id="email"
                        name="email"
                        ref={emailInputRef}
                        autoFocus
                        style={{width:'175px'}}
                    />
                </div>
                <div className={s.pwContainer}>
                    <label className={s.label} htmlFor="password">
                        <b>Mot de passe: </b>
                    </label>
                    <div className={s.inputEye}>
                    <input 
                        type={isPwShown ? 'text' : 'password'}
                        id="password"
                        name="password"
                        ref={passwordInputRef}
                        onChange={(e) => validate(e.target.value)}
                        className={s.input}
                    />
                    <span 
                        className={s.eyeContainer}
                        onClick={togglePwShown}
                    >
                        {isPwShown?
                            (<FaEye/>):
                            (<FaEyeSlash/>)
                        }
                    </span>
                    </div>
                </div>
                <div className={s.btnValidateContainer}>
                    <button 
                        className='btn'
                        onClick = {submitHandler}
                    >
                        Valider
                    </button>
                </div>
            </div>
        </div>
  )
}

export default EmailPw
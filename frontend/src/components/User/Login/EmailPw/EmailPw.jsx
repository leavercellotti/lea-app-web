import React, { useRef, useState } from 'react'
import s from "./style.module.css"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import SubscriptionOptions from '../../Subscription/SubscriptionOptions/SubscriptionOptions';
import { StripeAPI } from '../../../../api/stripe-api';
function EmailPw({connectHandler, addHandler,stripeId,userId, isAdded}) {
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const nameInputRef = useRef('')
    const [isPwShown, setIsPwShown] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [validatePW,setValidatePW] = useState(false)
    

    function togglePwShown() {
        isPwShown? setIsPwShown(false) : setIsPwShown(true)
    }

    function submitHandler(e) {
        e.preventDefault();
        const enteredEmail = emailInputRef.current.value.toLowerCase();
        console.log(isValidEmail(enteredEmail))
        if (isValidEmail(enteredEmail)) {
            const enteredPassword = passwordInputRef.current.value;
            let user;
            // if (login) {
            user = {
                email: enteredEmail,
                password: enteredPassword
            };
            connectHandler(user);
            // } else {
            //     user = {
            //         name: nameInputRef.current.value,
            //         email: enteredEmail,
            //         password: enteredPassword
            //     };
            //     // Assuming addHandler returns a Promise
            //     addHandler(user)
            //         .then((res) => {
            //             console.log(res)})
            //         .catch(error => {
            //             console.error("Error while adding user:", error);
            //             // Handle the error, perhaps show an alert to the user
            //         });
            // }
        } else if (!isValidEmail(enteredEmail)) {
            alert("Adresse mail non valide");
        } else {
            alert("Mot de passe non valide");
        }
    }
    
    var validator = require('validator')
    const validate = (value) => {
        if (validator.isStrongPassword(value, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 0
        })) {
            setErrorMessage('Mot de passe sécurisé')
            setValidatePW(true)
        } 
        else {
            setErrorMessage('Mot de passe faible')
            setValidatePW(false)
        }  
    }

    function isValidEmail(email) {
        // Expression régulière pour vérifier l'adresse e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email); // Retourne true si l'adresse e-mail est valide, sinon false
    }


    const checkoutHandler = async () => {
        try {
            const res = await StripeAPI.checkoutEveryDay(stripeId, userId); // Remarque : assurez-vous que stripeId est défini
            // setSessionId(res.sessionId);
            console.log(res);
    
            if(res.url) {
                window.location.href = res.url;
            }
    
        } catch (error) {
            console.error('Erreur lors de la gestion du paiement :', error);
        }
    };
    if(isAdded) {
        return(
            <SubscriptionOptions stripeId={stripeId} userId={userId}/>
        )
    }
  return (
    <div className={s.innerContainer}>
            <div className={s.inner}>
                {/* {!login &&
                    <div  className={s.pwContainer}>
                        <label className={s.label} htmlFor="name">
                            <b>Nom complet: </b>
                        </label>
                        <input 
                            type="name" 
                            id="name"
                            name="name"
                            ref={nameInputRef}
                            autoFocus
                            style={{width:'175px', marginBottom:"10px"}}
                        />
                    </div>
                } */}
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
                        style={{width:'175px', marginBottom:"10px"}}
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
                {/* {!login &&
                <>
                    <div style={{textAlign:"center"}}>
                        <span style={{
                            fontWeight: 'bold',
                            color: validatePW? 'green' : 'red',
                        }}>
                            {errorMessage}
                        </span>
                    </div>
                    <div style={{marginTop: "15px"}}>
                        Le mot de passe doit être de taille supérieur à 8, contenir une majuscule et un chiffre.
                    </div>
                </>} */}
                <div className={s.btnValidateContainer}>
                    <button 
                        className='btn'
                        onClick = {submitHandler}
                    >
                        Valider
                    </button>
                    {/* <button 
                        className='btn'
                        onClick = {checkoutHandler}
                    >
                        Go
                    </button> */}
                </div>
            </div>
        </div>
  )
}

export default EmailPw
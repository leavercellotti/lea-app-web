import React, { useState } from 'react';
import { UserAPI } from '../../../../api/user-api';
import { Link } from 'react-router-dom';
import s from "./style.module.css"
import Chronometer from '../Chronometer/Chronometer';
var validator = require('validator')

function PWForgotten({setIsPWForgotten}) {
    const [isEmailSend, setIsEmailSend] = useState(false);
    const [enteredOTP, setEnteredOTP] = useState("");
    const [enteredEmail, setEnteredEmail] = useState("")
    const [isVerified, setIsVerified] = useState(false)
    const [newPw, setNewPw] = useState("")
    const [userId, setUserId] = useState("")
    const [errorMessage, setErrorMessage] = useState('')
    const [validatePW,setValidatePW] = useState(false)
    const [isOTPValid, setIsOTPValid]= useState(true)
    
    function isValidEmail(email) {
        // Expression régulière pour vérifier l'adresse e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email); // Retourne true si l'adresse e-mail est valide, sinon false
    }

    async function sendEmail() {
        if(isValidEmail(enteredEmail)){
            try {
                const resetEmailData = await UserAPI.sendPasswordResetEmail({ email: enteredEmail });
                setIsEmailSend(true)
                console.log(resetEmailData);
            } catch (error) {
                console.error("Erreur lors de l'envoi du mail :", error);
            }
        }
        else {
            alert("Entrez une adresse mail valide.")
        }
    }

    async function verifyUser() {
        try {
            const verifyUserData = await UserAPI.verifyUser(enteredEmail, enteredOTP);
            console.log(verifyUserData.status === 200, verifyUserData.data.userId);
            setIsVerified(verifyUserData.status === 200)
            setUserId(verifyUserData.data.userId)
        } catch (error) {
            console.error("Erreur lors de la vérification de l'utilisateur :", error);
            alert("Le code de réinitialisation est invalide. Entrez le code reçu par email.")
        }
    }

    async function modifyPW() {
        if(validatePW) {
        try{
            await UserAPI.updatePW(userId, newPw)
            alert("Le mot de passe a bien été modifié.")
            setIsPWForgotten(false)
        } catch (error) {
            console.error("Erreur lors de la vérification de l'utilisateur :", error);
        }
    }
        else {
            alert("Entrez un mot de passe valide.")
        }
    }

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

//code de vérification
    if (isEmailSend && !isVerified) {
        return (
            <div className={s.innerContainer}>
                <div className={s.inner}>
                    <h3>Modification du mot de passe</h3>
                        {isOTPValid?
                            (<>
                                <Chronometer isOTPValid={isOTPValid} setIsOTPValid={setIsOTPValid}/>
                                <div className={s.sentence}>
                                    Le code de réinitialisation a été envoyé à votre adresse e-mail <b>{enteredEmail}</b>. Veuillez le saisir.
                                </div>
                                <div  className={s.pwContainer}>
                                    <label  className={s.label} htmlFor="code">
                                        <b>
                                            Code de réinitialisation : 
                                        </b>
                                    </label>
                                    <input
                                        id="code"
                                        value={enteredOTP}
                                        onChange={(event) => setEnteredOTP(event.target.value)}
                                    />
                                </div>
                                <div className={s.btnValidateContainer}>
                                    <button 
                                        onClick={verifyUser}
                                        className='btn'
                                        style={{width:"170px"}}
                                    >
                                        Valider
                                    </button>
                                    <button 
                                        onClick={() => setIsEmailSend(false)}
                                        className='btn descreet btnSpace'
                                        style={{width:"170px"}}
                                    >
                                        Retour
                                    </button>
                                </div>
                            </>)
                            :
                            (<div className={s.btnValidateContainer}>
                                <div className={s.sentence}>
                                Le code n'est plus valide. Voulez-vous renvoyer un nouveau code à l'adresse <b>{enteredEmail}</b> ?
                               </div> 
                                <button 
                                    onClick={() => {sendEmail(); setIsOTPValid(true)}}
                                    className='btn btnSpace'
                                    style={{width:"170px"}}
                                >
                                    Renvoyer
                                </button>
                                <button 
                                    onClick={() => setIsEmailSend(false)}
                                    className='btn descreet btnSpace'
                                    style={{width:"170px"}}
                                    >
                                    Retour
                                </button>
                            </div>)
                        }
                        
                </div>
            </div>
        );
    } 

//Entrez l'email
    else if(!isEmailSend && !isVerified) {
        return (
            <div className={s.inner}>
                <h3>Modification du mot de passe</h3>
                <div className={s.sentence}>
                    Veuillez saisir votre adresse e-mail de connexion pour recevoir un code vous permettant de réinitialiser votre mot de passe.
                </div>
                <div>
                    <div  className={s.pwContainer}>
                        <label  className={s.label} htmlFor="emailInput">
                            <b>
                                Email de connexion 
                            </b>
                        </label>
                        <input
                            type="email"
                            id="emailInput"
                            autoFocus
                            value={enteredEmail}
                            onChange={(event) => setEnteredEmail(event.target.value)}
                        />
                    </div>
                    <div className={s.btnValidateContainer}>
                        <button 
                            onClick={sendEmail}
                            className='btn btnSpace'
                            style={{width:"170px"}}
                        >
                            Recevoir le code
                        </button>
                        <button 
                            onClick={() => setIsPWForgotten(false)}
                            className='btn descreet btnSpace'
                            style={{width:"170px"}}
                        >
                            Retour
                        </button>
                    </div>
                </div>
            </div>
        );
    }

//Choisissez un nouveau mdp
    else if (isVerified) {
            return (
                <div className={s.innerContainer}>
                    <div className={s.inner}>
                        <h3>Changez votre mot de passe</h3>
                            <div className={s.sentence}>
                                Entrez votre nouveau mot de passe.
                            </div>
                            
                            <div  className={s.pwContainer}>
                                <label  className={s.label} htmlFor="newPw">
                                    <b>
                                        Nouveau mot de passe : 
                                    </b>
                                </label>
                                <input
                                    id="newPw"
                                    value={newPw}
                                    onChange={(e) => {validate(e.target.value); setNewPw(e.target.value)}}
                                    //onChange={(event) => setNewPw(event.target.value)}
                                />
                            </div>
                            <div>
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
                            <div className={s.btnValidateContainer}>
                                <button 
                                    onClick={modifyPW}
                                    className='btn'
                                >
                                    Valider
                                </button>
                        </div>
                    </div>
                </div>
            );
    }
}

export default PWForgotten;

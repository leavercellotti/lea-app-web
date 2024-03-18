import React, { useState } from 'react';
import s from "./style.module.css";
import EmailPw from '../EmailPw/EmailPw';
import SubscriptionChoice from '../SubscriptionChoice/SubscriptionChoice';
import PWForgotten from '../PWForgotten/PWForgotten';
import { Link, useNavigate } from 'react-router-dom';

function LoginBox({ connectHandler, addHandler, stripeId, userId, isAdded }) {
    const [isPWForgotten, setIsPWForgotten] = useState(false);
    const navigate = useNavigate()

    if (isPWForgotten) {
        return (
            <div className={`box ${s.container}`}>
                <PWForgotten setIsPWForgotten={setIsPWForgotten} />
            </div>
        );
    } else {
        return (
            <div className={`box ${s.container}`}>
                {/* <div className={s.btnContainer}>
                    <div
                        onClick={() => setLogin(true)}
                        className={`${s.btn} ${login ? s.pink : s.white}`}
                    >
                        Se connecter
                    </div>
                    <div
                        onClick={() => setLogin(false)}
                        className={`${s.btn} ${login ? s.white : s.pink}`}
                    >
                        S'inscrire
                    </div>
                </div> */}
                <h3>{'Se connecter'}</h3>
                <EmailPw
                    connectHandler={connectHandler}
                    addHandler={addHandler}
                    stripeId={stripeId}
                    userId={userId}
                    isAdded={isAdded}
                />
                <div 
                    onClick={() => setIsPWForgotten(true)}
                    className={s.link}
                >
                    Mot de passe oublié
                </div>
                <div 
                    onClick={() => {navigate("/subscription"); window.location.reload();}} 
                    // window.location.reload();
                    className={s.link}
                >
                    S'inscrire
                </div>
            </div>
        );
    }
}

export default LoginBox;

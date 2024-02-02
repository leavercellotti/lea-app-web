import { useRef, useState } from "react"
import { BsEye, BsEyeSlash } from "react-icons/bs";
import s from "./style.module.css";
import { useDispatch } from "react-redux";
import { setTokenAdmin } from "../../../../store/admin-slice"
import { AdminAPI } from "../../../../api/admin-api";
import { useNavigate } from "react-router-dom";


export function LoginForm({setAdminToken}) {
    const dispatch = useDispatch()
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const [passwordShown, setPasswordShown] = useState(false)
    const navigate = useNavigate()
    

    async function connectHandler(data) {
        console.log(data)
        const response = await AdminAPI.connect(data)
                            .then(function(response) { 
                                return response
                              })
        if(response) {
            console.log("setAdminToken", setAdminToken)
            if(setAdminToken){
                console.log('yo')
                setAdminToken(response.data.token)
                localStorage.setItem('admin-token', JSON.stringify(response.data.token));
            }
            console.log(response.data)
            
            const token= response.data.token
            console.log(response, token)
            dispatch(setTokenAdmin({token:token}))
            navigate('/jgieojoergj0replj-vocabulary')
        }
        else {
            alert("Données incorrectes")
        }
      }

    function submitHandler(e) {
        e.preventDefault()
        const enteredEmail = emailInputRef.current.value.toLowerCase()
        const enteredPassword = passwordInputRef.current.value
        connectHandler({login:enteredEmail, password:enteredPassword})
    }

    const [errorMessage, setErrorMessage] = useState('')
    

    function togglePassword() {
        setPasswordShown(!passwordShown)
    }

    return(
        <div>
            <form onSubmit={submitHandler}>
                <div className={s.el}>
                    <input 
                        type="text" 
                        id="email"
                        name="email"
                        ref={emailInputRef}
                        className={s.inputLogin}
                        autoFocus
                        placeholder="Login"
                    />
                </div>
                <div className={s.el}>
                    <div className={s.pwContainer}>
                        <div className={s.inputPwContainer}>
                            <input
                                type={passwordShown ? "text" : "password"}
                                id="password"
                                name="password"
                                ref={passwordInputRef}
                                className={s.inputPw}
                                placeholder="Mot de passe"
                            />
                            <div onClick={togglePassword} className={s.eyeIconContainer}>
                                {passwordShown?
                                    (<BsEyeSlash size={20} className={s.eyeIcon}/>)
                                    :
                                    (<BsEye size={20} className={s.eyeIcon}/>)
                                }
                            </div>
                        </div>
                    </div>
                    <div>
                    {true &&
                        <span style={{
                            fontWeight: 'bold',
                            color: 'red',
                            }}>
                            {errorMessage}
                        </span>
                    }
                    </div>
                </div>
                <div className={s.el}>
                    <input  className={s.btn} type="submit" value="Valider"/>
                </div>
            </form>
        </div>
    )
}
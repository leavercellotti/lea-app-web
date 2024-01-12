import React from 'react'
import s from "./style.module.css"
import { Logout } from '../Logout/Logout'
import { LoginForm } from '../LoginForm/LoginForm'
import { useSelector } from 'react-redux'

const Login = ({setAdminToken}) => {
    const tokenAdmin = useSelector(store => store.ADMIN.token)
  return (
    <div className={s.container}>
            {tokenAdmin ?
                (<div>
                    <h1  className={`${s.title} ${s.fadeInDown}`}>Logout</h1>
                    <Logout />
                </div>
                )
                :
                (<>
                    <h1  className={`${s.title} ${s.fadeInDown}`}>Admin Login</h1>
                    <div>
                        <LoginForm setAdminToken={setAdminToken} />
                    </div>
                </>
                )
            }
        </div>
  )
}

export default Login
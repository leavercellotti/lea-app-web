import React from 'react'
import s from "./style.module.css"
import { Logout } from '../Logout/Logout'
import { LoginForm } from '../LoginForm/LoginForm'
// import { useSelector } from 'react-redux'

const Login = () => {
    // const isConnect = useSelector(store => store.ADMIN.isConnect)
    const isConnect = true
  return (
    <div className={s.container}>
            {isConnect ?
                (<div>
                    <h1  className={`${s.title} ${s.fadeInDown}`}>Logout</h1>
                    <Logout />
                </div>
                )
                :
                (<>
                    <h1  className={`${s.title} ${s.fadeInDown}`}>Admin Login</h1>
                    <div>
                        <LoginForm />
                    </div>
                </>
                )
            }
        </div>
  )
}

export default Login
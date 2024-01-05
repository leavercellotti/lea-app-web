import React from 'react'
import s from './style.module.css'
import { useNavigate } from 'react-router-dom'

const AdminNotConnect = () => {
    const navigate = useNavigate()
  return (
    <div className={s.container}>
        <h1 className={s.title}>Connectez-vous !</h1>
        <div className={s.btnContainer}>
          <button 
              className="btn"
              onClick={() => navigate("/admin-login")}
          >Se connecter</button>
        </div>
        <p className={s.p}>Désolé, mais vous devez être connecté en tant qu'administrateur pour accéder à cette page. Veuillez vous connecter avec un compte administrateur valide pour continuer. Si vous avez des questions ou des problèmes, n'hésitez pas à nous contacter. Merci de votre compréhension.</p>
    </div>
  )
}

export default AdminNotConnect
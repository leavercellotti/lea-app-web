import React from 'react'
import ProfileUser from '../../../components/User/ProfileUser/ProfileUser'
import { useSelector } from "react-redux"
function Profile() {
  const email = useSelector(store => store.USER.email)
  const level = useSelector(store => store.USER.level)
  return (
    <div>
      <h1>
        Mon espace
      </h1>
      <div className='container'>
        <ProfileUser email={email} level={level} subscription="Gratuit"/>
      </div>
    </div>
  )
}

export default Profile
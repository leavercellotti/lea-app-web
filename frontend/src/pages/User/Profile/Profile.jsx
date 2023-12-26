import React from 'react'
import ProfileUser from '../../../components/User/ProfileUser/ProfileUser'

function Profile() {
  return (
    <div>
      <h1>
        Mon espace
      </h1>
      <div className='container'>
        <ProfileUser email="pol@hotmail.com" level="Intermédiaire B1" subscription="Gratuit"/>
      </div>
    </div>
  )
}

export default Profile
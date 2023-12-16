import React from 'react'
import ProfileUser from '../../../components/User/ProfileUser/ProfileUser'

function Profile() {
  return (
    <div>
      <h1>
        Mon espace
      </h1>
      <div className='container'>
        <ProfileUser/>
      </div>
    </div>
  )
}

export default Profile
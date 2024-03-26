import React from 'react'
import SubscriptionOptions from '../../../components/User/Subscription/SubscriptionOptions/SubscriptionOptions'

function FreeTrial() {
  return (
    <div>
        <h1>Inscrivez-vous</h1>
        <div className='container'>
            <SubscriptionOptions trial={true}/>
        </div>
    </div>
  )
}

export default FreeTrial
import React from 'react'
import SubscriptionChoice from '../../../components/User/Login/SubscriptionChoice/SubscriptionChoice'
import SubscriptionOptions from '../../../components/User/Subscription/SubscriptionOptions/SubscriptionOptions'

function Subscription() {
  return (
    <div>
        <h1>Les abonnements</h1>
        <div className='container'>
            <SubscriptionOptions/>
        </div>
    </div>
  )
}

export default Subscription
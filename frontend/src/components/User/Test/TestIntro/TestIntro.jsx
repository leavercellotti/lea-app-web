import React from 'react'
import icon from '../../../../assets/icon.png';

function TestIntro({setStart}) {
  return (
    <div className='box'>
        <div className='right'><img src={icon} alt="" className="favicon" /></div>
        <h2>Déterminez quel est votre niveau grâce à ce quiz.</h2>
        <p>Ce test dure <span style={{whiteSpace:"nowrap"}}>15 minutes</span>.</p>
        <button onClick={() => setStart(false)} className='btn'>C'est parti !</button>
    </div>
  )
}

export default TestIntro
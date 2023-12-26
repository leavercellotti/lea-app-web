import React from 'react'
import TestIntro from '../../../components/User/Test/TestIntro/TestIntro'
import TestQuestion from '../../../components/User/Test/TestQuestion/TestQuestion'
import TestResult from '../../../components/User/Test/TestResult/TestResult'

function Test() {
  return (
    <div>
      <h1>
        Test
      </h1>
      <div className='container'>
        <TestIntro/>
        <TestQuestion
          question="Quel est le comparatif de “good” ?" option1="better" option2="best" option3="gooder"/>
        <TestResult result="Intermédiaire B1"/>
      </div>

    </div>
  )
}

export default Test
import React from 'react'
import ReviseBox from '../../../components/User/Vocabulary/ReviseBox/ReviseBox'
import { FaBrain } from "react-icons/fa6";

function VocabularyRevise() {
  return (
    <div>
      <h1>
        Réviser
      </h1>
      <h2 className='h2'>
        Il est temps de réviser ! <FaBrain />
      </h2>
      <div className='container'>
        <ReviseBox/>
      </div>
    </div>
  )
}

export default VocabularyRevise
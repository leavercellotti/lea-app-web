import React from 'react'
import s from "./style.module.css";

function TestResult({result}) {
  return (
    <div className='box'>
        <h3>Votre niveau est :</h3>
        <div className={s.resultContainer}>
            <div className={s.result}>{result}</div>
        </div>
    </div>
  )
}

export default TestResult
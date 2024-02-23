import React, { useState } from 'react'
import TestQuestion from '../TestQuestion/TestQuestion'
import TestIntro from '../TestIntro/TestIntro'
import TestResult from '../TestResult/TestResult'

function QuestionViewer({questionArray}) {
    const [index, setIndex] = useState(0)
    const [start, setStart] = useState(true)
    const [end, setEnd] = useState(false)
    const [nbCorrectAnswers, setNbCorrectAnswers] = useState(0)
    const handleNext = () => {
        if(index +1 < questionArray.length) {
            setIndex(index+1)
        }
        else if(index +1 === questionArray.length){
            setEnd(true)
        }
    }
    if(start) {
        return(
            <TestIntro setStart={setStart} />
        )
    }
    else if(end) {
        return(
            <TestResult nbCorrectAnswers={nbCorrectAnswers}/>
        )
    }
    else {
        return (
            <>
                {questionArray && questionArray.length > 0 && (
                        <TestQuestion
                            sentence = {questionArray[index].sentence} 
                            optionArray = {questionArray[index].optionArray}
                            answer = {questionArray[index].answer}
                            index={index}
                            size={questionArray.length}
                            handleNext={handleNext}
                            setNbCorrectAnswers={setNbCorrectAnswers}
                            nbCorrectAnswers={nbCorrectAnswers}
                        />
                )}
            </>
            
        )
    }
}

export default QuestionViewer
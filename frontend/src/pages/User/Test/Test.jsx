import React, { useEffect, useState } from 'react'
import TestIntro from '../../../components/User/Test/TestIntro/TestIntro'
import TestQuestion from '../../../components/User/Test/TestQuestion/TestQuestion'
import TestResult from '../../../components/User/Test/TestResult/TestResult'
import { TestAPI } from '../../../api/test-api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import QuestionViewer from '../../../components/User/Test/QuestionViewer/QuestionViewer';


function Test() {
  const [array, setArray] = useState([])
  // const [enteredOTP, setEnteredOTP] = useState("")
  const navigate = useNavigate()
  const token = useSelector((store) => store.USER.token)
  const userId = useSelector(store => store.USER._id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await TestAPI.getAll(token, userId);
        setArray(allData);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
        navigate('/login')
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>
        Test
      </h1>
      <div className='container'>
        <QuestionViewer questionArray={array}/>
      </div>
    </div>
  )
}

export default Test
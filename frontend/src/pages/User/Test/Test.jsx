import React, { useEffect, useState } from 'react'
import TestIntro from '../../../components/User/Test/TestIntro/TestIntro'
import TestQuestion from '../../../components/User/Test/TestQuestion/TestQuestion'
import TestResult from '../../../components/User/Test/TestResult/TestResult'
import { TestAPI } from '../../../api/test-api';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import QuestionViewer from '../../../components/User/Test/QuestionViewer/QuestionViewer';
import { UserAPI } from '../../../api/user-api';


function Test() {
  const [array, setArray] = useState([])
  const [enteredOTP, setEnteredOTP] = useState("")
  const navigate = useNavigate()
  const token = useSelector((store) => store.USER.token)
  const userId = useSelector(store => store.USER._id)

  async function sendEmail() {
    try{
      const resetEmailData =await UserAPI.sendPasswordResetEmail({email:"contact@coral-dev.be"})
      console.log(resetEmailData.data)
    }
    catch(error){
      console.error("Erreur lors de l'envoie du mail :", error);
    }
  }

  async function verifyUser() {
    try{
      const verifyUserData =await UserAPI.verifyUser("contact@coral-dev.be",enteredOTP)
      console.log(verifyUserData)
    }
    catch(error){
      console.error("Erreur lors de l'envoie du mail :", error);
    }
  }
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
      {/* <div>
        <button onClick={sendEmail}>Envoyer</button>
      </div>
      <div>
        <input 
          value={enteredOTP} 
          onChange={(event) => setEnteredOTP(event.target.value)}
        />
        <button onClick={verifyUser}>ok</button>
      </div> */}

    </div>
  )
}

export default Test
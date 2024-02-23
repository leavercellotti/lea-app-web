import React, { useEffect, useRef, useState } from 'react';
import s from "./style.module.css";
import SpeechToText from '../SpeechToText/SpeechToText';
import { BsArrowUpSquareFill } from "react-icons/bs";
import icon from '../../../../assets/icon.png'
import { ChatgptAPI } from '../../../../api/chatgpt-api';
import { useDispatch, useSelector } from 'react-redux';
import { addNbChatsMade } from '../../../../store/user-slice';
import { UserAPI } from '../../../../api/user-api';
import { MdOutlineSchool } from 'react-icons/md';

const ChatGPT = ({prompt}) => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [messageHistoryUser, setMessageHistoryUser] = useState([]);
  const [correctionHistory, setCorrectionHistory] = useState([]);
  const [messageHistoryAssistant, setMessageHistoryAssistant] = useState([prompt]);
  const [messageHistory, setMessageHistory] = useState([]);
  const userId = useSelector(store => store.USER._id);
  const [isFirstUserMessageSent, setIsFirstUserMessageSent] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector(store => store.USER.token)

  const chatEndRef = useRef(null); // Référence vers le dernier élément du chat

  const updateNbChatsMade = async (knowledge) => {
    // Effectuer l'appel API pour mettre à jour les cartes de l'utilisateur
     try {
       await UserAPI.updateNbChatsMade(token, userId);
     } catch (error) {
       console.error('Erreur lors de la mise à jour des cartes de l\'utilisateur :', error);
     }
   };
  const handleSendMessage = async () => {
    if(!isFirstUserMessageSent) {
      setIsFirstUserMessageSent(true)
      dispatch(addNbChatsMade())
      updateNbChatsMade()
    }
    try {
      const correctionMessage = { 
        role: 'user', 
        content: `You are an English teacher. If this sentence : '${message}' contains errors, provide the correct sentence. Otherwise, say 'Ok.'.`
      };
      //You are an English teacher. 
      //The student says: ${message}. If this contains significant errors, provide the correct sentence. Otherwise, say 'Ok.'.`

      const correctionGPT = await ChatgptAPI.connect({ userId, messages:[correctionMessage] });
      setMessageHistoryUser([...messageHistoryUser, message]);
      setCorrectionHistory([...correctionHistory, correctionGPT.data.choices[0].message.content]);
    } catch (error) {
      console.error("erreur correction",error);
    }

    try {
      const newMessage = { 
        role: 'user', 
        content: `Provide a short response to the last question and ask a related question different than the previous ones : ${messageHistoryUser.map((userMessage, index) => `question ${index}: ${messageHistoryAssistant[index]}, response : ${userMessage}.`).join('\n')} last question : ${messageHistoryAssistant[messageHistoryAssistant.length - 1]}, response : ${message}`
      };
      console.log(messageHistoryUser)
      //You are an English teacher. The initial question you have asked to the user was 'Have you ever traveled to another country? If so, where?'
      //Provide a short response and ask a related question but not a question that you already have the answer here : ${message} \n ${messageHistoryUser.map((userMessage, index) => `${userMessage}.`).join('\n')}

      // const res = await ChatgptAPI.connect({ userId, messages:[...messageHistory, newMessage] });
      const res = await ChatgptAPI.connect({ userId, messages:[newMessage] });
      setResponse(res.data.choices[0].message.content);
      setMessageHistoryAssistant([...messageHistoryAssistant, res.data.choices[0].message.content]);
      setMessageHistory([...messageHistory, newMessage]);
      setMessage("")
    } catch (error) {
      console.error("erreur reponse", error);
    }
  };

  useEffect(() => {
    setMessageHistoryAssistant([prompt]);
  }, [prompt]);

  useEffect(() => {
    // Fait défiler vers le bas lorsque messageHistoryAssistant est modifié
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageHistoryAssistant]);
  return (
    <div className={s.container}>
      <div className="right">
        <img src={icon} alt="" className='favicon'/>
      </div>
      <h2 style={{display:"flex", justifyContent:"center"}}>
        <div>Tuteur virtuel </div>
        <MdOutlineSchool style={{paddingLeft:"10px"}} size={34} />
      </h2>
      {prompt &&
      <div className={s.chat}>
        <div className={s.assistant}>
              <div className={s.assistantBox}>
                Hello !
                I hope you're having a great day. Thanks for taking the time to have a conversation with me.
                Let's begin with this question :
              </div>
            </div>
        {messageHistoryAssistant.map((msg, index) => (
          <div key={index}>
            <div className={s.assistant}>
              <div className={s.assistantBox}>
                {(msg && `${msg}`) || `${response}`}
              </div>
            </div>
            
            <div className={s.user}>
              {messageHistoryUser[index] &&
              <>
                <div className={s.userBox}>
                  {messageHistoryUser[index]}
                </div> 
                {correctionHistory[index] !== "Ok." &&
                  <div className={s.correctionBox}>
                    {correctionHistory[index]}
                  </div>
                }
              </>
              }
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      }
      <div className={s.writeContainer}>
        <textarea
          className={s.largeInput}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          // quand on clique sur enter, ça envoie la réponse
          onKeyDown={(e) => {
            if (e.key === 'Enter' && message !== "") {
              handleSendMessage();
            }
          }}
        />
        <BsArrowUpSquareFill 
          size={40} 
          className={s.sendIcon} 
          onClick={message!=="" ? handleSendMessage : null} 
        />
        <SpeechToText 
          setMessage={setMessage}
        />
      </div>
    </div>
  );
}

export default ChatGPT;

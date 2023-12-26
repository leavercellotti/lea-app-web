import React from 'react';
import s from "./style.module.css";
import SpeechToText from '../SpeechToText/SpeechToText';
import { FaUserTie } from 'react-icons/fa';
import { PiStudent } from "react-icons/pi";
import { BsArrowUpSquareFill } from "react-icons/bs";
import icon from '../../../../assets/icon.png'
const ChatGPT = () => {
  return (
    <div className={s.container}>
      <div className="right">
        <img src={icon} alt="" className='favicon'/>
      </div>
      <div className={s.chat}>
        <div className={s.assistant}>
          {/* <p className={s.person}>
            <FaUserTie size={22} className={s.icon}/>
          </p> */}
          <div className={s.assistantBox}>How do you typically spend your leisure time ? hhhhhhhhhhhhhh hhhhhhhh hhhhhhhhhhhhhh hhhhhhhhhhh hhhhhh hhhhhhhhhhh hhhhhhhhhhh hhhhhhhhhhhh hhhhhhhhhhhh hhhhhh</div>
        </div>
        <div className={s.user}>
          {/* <p className={s.person}>
            <PiStudent size={22} className={s.icon}/>
          </p> */}
          <div className={s.userBox}>I do crossfit hhhhhhhh hhhhhhhhhhhhhh hhhhhhhhhhh hhhhhhhhhhhhhh hhhhhh hhhhhhhhh hhhhhhhhhhhhh hhhhhhhhhhhh hhhhhhhhhhhhh hhhhhh</div>
        </div>
      </div>
      <div className={s.writeContainer}>
        <textarea
          className={s.largeInput}
          type="text"
          // value={message}
          // onChange={(e) => setMessage(e.target.value)}
        />
        <BsArrowUpSquareFill size={40} className={s.sendIcon}/>
        <SpeechToText/>{/* <SpeechToText setMessage={setMessage}/> */}
      </div>
    </div>
  )
}

export default ChatGPT
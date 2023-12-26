import React from 'react';
import icon from '../../../../assets/icon.png';
import { AiFillSound } from "react-icons/ai";
import s from "./style.module.css";

function Card({ text, showIcon}) {
  return (
    <div className={s.container}>
        <img src={icon} alt="" className={s.icon} />
      <div className={s.centeredContent}>
        <p>{text}</p>
        {showIcon && <AiFillSound className={s.soundIcon} size={30} />}
      </div>
      <img src={icon} alt="" className={s.icon2} />
    </div>
  );
}

export default Card;

import React from 'react'
import s from "./style.module.css"
import { AiFillSound } from "react-icons/ai";
import icon from '../../../../assets/icon.png';

const ReviseBox = () => {
  return (
    <div className='box'>
        <div className="right">
            <button className='btn'>Tout écouter</button>
        </div>
        <div className={s.inner}>
            <ul>
                <li className={s.red}>Apple - Pomme <AiFillSound className={s.soundIcon}/></li>
                <li className={s.red}>Apple - Pomme <AiFillSound className={s.soundIcon}/></li>
                <li className={s.orange}>Apple - Pomme <AiFillSound className={s.soundIcon}/></li>
                <li className={s.green}>Apple - Pomme <AiFillSound className={s.soundIcon}/></li>
                <li className={s.orange}>Apple - Pomme <AiFillSound className={s.soundIcon}/></li>
                <li className={s.red}>Apple - Pomme <AiFillSound className={s.soundIcon}/></li>
            </ul>
            <ul>
                <li className={s.red}>Apple - Pomme <AiFillSound className={s.soundIcon}/></li>
                <li className={s.green}>Apple - Pomme <AiFillSound className={s.soundIcon}/></li>
                <li className={s.green}>Apple - Pomme <AiFillSound className={s.soundIcon}/></li>
                <li className={s.red}>Apple - Pomme <AiFillSound className={s.soundIcon}/></li>
                <li className={s.red}>Apple - Pomme <AiFillSound className={s.soundIcon}/></li>
                <li className={s.orange}>Apple - Pomme <AiFillSound className={s.soundIcon}/></li>
            </ul>
        </div>
        <div className="right">
            <img src={icon} alt="" className='favicon' />
        </div>
    </div>
  )
}

export default ReviseBox
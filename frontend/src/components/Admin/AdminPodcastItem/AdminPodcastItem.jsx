import React, { useState } from 'react';
import { Tr, Td } from 'react-super-responsive-table';
import s from "./style.module.css"

function AdminPodcastItem({ podcast }) {
  const { _id, link, title, transcription, translation, image, level } = podcast;

  // Utiliser l'état local pour suivre l'état de l'affichage de la transcription
  const [showModifyBtn, setShowModifyBtn] = useState(false);

  function toggleShowModifyBtn() {
    showModifyBtn? setShowModifyBtn(false) : setShowModifyBtn(true)
  }

  // Extraire les cinq premiers mots de la transcription
  const transcriptionFirstWords = transcription.split(' ').slice(0, 8).join(' ');
  const translationFirstWords = translation.split(' ').slice(0, 8).join(' ');
  console.log("ti", title)
  return (
    <Tr className={s.tr}>
        <Td className={s.td}>
            {_id}
        </Td>
        <Td className={s.td}>
          {title}
          {showModifyBtn && 
          <div>
            <button className='btn center' style={{marginTop:"10px"}}>Modifier</button>
          </div>
          }
        </Td>
        <Td className={s.td}>
          {link}
          {showModifyBtn && 
          <div>
            <button className='btn center' style={{marginTop:"10px"}}>Modifier</button>
          </div>}
        </Td>
      {/* Afficher les cinq premiers mots de la transcription */}
        <Td className={s.td}>
          {transcriptionFirstWords}
          {showModifyBtn && 
          <div>
            <button className='btn center' style={{marginTop:"10px"}}>Modifier</button>
          </div>}
        </Td>
        <Td className={s.td}>
          {translationFirstWords}
          {showModifyBtn && 
          <div>
            <button className='btn center' style={{marginTop:"10px"}}>Modifier</button>
          </div>}
        </Td>
        <Td className={s.td}>
          {image}
          {showModifyBtn && 
          <div>
            <button className='btn center' style={{marginTop:"10px"}}>Modifier</button>
          </div>}
        </Td>
        <Td className={s.td}>
          {level}
          {showModifyBtn && 
          <div>
            <button className='btn center' style={{marginTop:"10px"}}>Modifier</button>
          </div>}
        </Td>
        <Td className={s.td}>
          <div className='options'>
          <button 
            className='btn btnSpace'
            onClick={toggleShowModifyBtn}
          >
            {showModifyBtn ? 'Annuler' : 'Modifier'}
          </button>
          <button className='btn'>Supprimer</button>
          </div>
      </Td>
    </Tr>
  );
}

export default AdminPodcastItem;

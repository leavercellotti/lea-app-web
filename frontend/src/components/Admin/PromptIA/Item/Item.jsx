import React, { useState } from 'react';
import { Tr, Td } from 'react-super-responsive-table';
import s from "./style.module.css"
import AdminPromptModifyItem from '../ModifyItem/ModifyItem';
import { useSelector } from 'react-redux';
import { PromptiaAPI } from '../../../../api/promptia-api';

function Item({ prompt, promptList, setPromptList }) {
  const { _id, sentence, level } = prompt;
  const adminToken = useSelector(store => store.ADMIN.token)
  const [showOverlay, setShowOverlay] = useState(false)
  const [modifyItem, setmodifyItem] = useState('')

  // Utiliser l'état local pour suivre l'état de l'affichage de la transcription
  const [showModifyBtn, setShowModifyBtn] = useState(false);

  function toggleShowModifyBtn() {
    showModifyBtn? setShowModifyBtn(false) : setShowModifyBtn(true)
  }

  function onDeleteHandler() {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')
    if(confirmed){
      PromptiaAPI.delete(_id, adminToken)
      const newFoodList = promptList.filter(promptItem => promptItem !== prompt)
      setPromptList(newFoodList)
    }
  }

  return (
    <>
      <Tr className={s.tr}>
          <Td className={s.td}>
              {_id}
          </Td>
          <Td className={s.td}>
            {sentence}
            {showModifyBtn && 
            <div>
              <button 
                className='btn center' 
                style={{marginTop:"10px"}}
                onClick={() => {setmodifyItem('sentence'); setShowOverlay(true)}}
              >
                Modifier
              </button>
            </div>
            }
          </Td>
          
          <Td className={s.td}>
            {level}
            {showModifyBtn && 
            <div>
              <button 
                className='btn center' 
                style={{marginTop:"10px"}}
                onClick={() => {setmodifyItem('level'); setShowOverlay(true)}}
              >
                Modifier
              </button>
            </div>}
          </Td>
          <Td className={s.td}>
            <div className='options'>
            <button 
              className='btn'
              style={{margin:"5px"}}
              onClick={toggleShowModifyBtn}
            >
              {showModifyBtn ? 'Annuler' : 'Modifier'}
            </button>
            <button 
              className='btn'
              style={{margin:"5px"}}
              onClick={onDeleteHandler}
            >
              Supprimer
            </button>
            </div>
        </Td>
      </Tr>
      {showOverlay &&
        <AdminPromptModifyItem 
          promptList={promptList}
          setShowOverlay={setShowOverlay}
          setPromptList={setPromptList}
          prompt={prompt}
          modifyItem={modifyItem}
          setShowModifyBtn={setShowModifyBtn}
        />}
    </>
  );
}

export default Item;

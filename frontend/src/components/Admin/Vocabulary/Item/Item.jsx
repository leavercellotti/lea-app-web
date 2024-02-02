import React, { useState } from 'react';
import { Tr, Td } from 'react-super-responsive-table';
import s from "./style.module.css"
import { PodcastAPI } from '../../../../api/podcast-api';
import AdminModifyItem from '../ModifyItem/ModifyItem';
import { useSelector } from 'react-redux';
import { CardAPI } from '../../../../api/card-api';

function Item({ item, list, setList }) {
  const { _id, wordEnglish, wordFrench, level, sentenceArray} = item;
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
      CardAPI.delete(_id, adminToken)
      const newList = list.filter(newItem => newItem !== item)
      setList(newList)
    }
  }

  return (
    <>
      <Tr className={s.tr}>
          <Td className={s.td}>
              {_id}
          </Td>
          <Td className={s.td}>
            {wordEnglish}
            {showModifyBtn && 
            <div>
              <button 
                className='btn center' 
                style={{marginTop:"10px"}}
                onClick={() => {setmodifyItem('wordEnglish'); setShowOverlay(true)}}
              >
                Modifier
              </button>
            </div>
            }
          </Td>
          <Td className={s.td}>
            {wordFrench}
            {showModifyBtn && 
            <div>
              <button 
                className='btn center' 
                style={{marginTop:"10px"}}
                onClick={() => {setmodifyItem('wordFrench'); setShowOverlay(true)}}
              >
                Modifier
              </button>
            </div>}
          </Td>
        {/* Afficher les cinq premiers mots de la transcription */}
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
            {sentenceArray[0]}
            {showModifyBtn && 
            <div>
              <button 
                className='btn center' 
                style={{marginTop:"10px"}}
                onClick={() => {setmodifyItem('sentence1'); setShowOverlay(true)}}
              >
                  Modifier
              </button>
            </div>}
          </Td>
          <Td className={s.td}>
            {sentenceArray[1]}
            {showModifyBtn && 
            <div>
              <button 
                className='btn center' 
                style={{marginTop:"10px"}}
                onClick={() => {setmodifyItem('sentence2'); setShowOverlay(true)}}
              >
                  Modifier
              </button>
            </div>}
          </Td>
          <Td className={s.td}>
            {sentenceArray[2]}
            {showModifyBtn && 
            <div>
              <button 
                className='btn center' 
                style={{marginTop:"10px"}}
                onClick={() => {setmodifyItem('sentence3'); setShowOverlay(true)}}
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
        <AdminModifyItem 
          list={list}
          setShowOverlay={setShowOverlay}
          setList={setList}
          item={item}
          modifyItem={modifyItem}
          setShowModifyBtn={setShowModifyBtn}
        />}
    </>
  );
}

export default Item;

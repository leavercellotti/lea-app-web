import React, { useState } from 'react';
import { Tr, Td } from 'react-super-responsive-table';
import s from "./style.module.css"
import AdminModifyItem from '../ModifyItem/ModifyItem';
import { useSelector } from 'react-redux';
import { TestAPI } from '../../../../api/test-api';
import { useNavigate } from 'react-router-dom';

function Item({ item, list, setList }) {
  const { _id, sentence, answer, optionArray } = item;
  const adminToken = useSelector(store => store.ADMIN.token)
  const [showOverlay, setShowOverlay] = useState(false)
  const [modifyItem, setmodifyItem] = useState('')
  const navigate = useNavigate()

  // Utiliser l'état local pour suivre l'état de l'affichage de la transcription
  const [showModifyBtn, setShowModifyBtn] = useState(false);

  function toggleShowModifyBtn() {
    showModifyBtn? setShowModifyBtn(false) : setShowModifyBtn(true)
  }

  function onDeleteHandler() {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')
    if(confirmed){
      TestAPI.delete(_id, adminToken)
      .then(() => {
        const newFoodList = list.filter(listItem => listItem !== item)
        setList(newFoodList)
      })
      .catch((error) => {
          console.error(error);
          navigate('/jgieojoergj0replj');
      });
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
            {answer}
            {showModifyBtn && 
            <div>
              <button 
                className='btn center' 
                style={{marginTop:"10px"}}
                onClick={() => {setmodifyItem('answer'); setShowOverlay(true)}}
              >
                Modifier
              </button>
            </div>}
          </Td>
          
          <Td className={s.td}>
            {optionArray[0]}
            {showModifyBtn && 
            <div>
              <button 
                className='btn center' 
                style={{marginTop:"10px"}}
                onClick={() => {setmodifyItem("optionA"); setShowOverlay(true)}}
              >
                  Modifier
              </button>
            </div>}
          </Td>
          <Td className={s.td}>
            {optionArray[1]}
            {showModifyBtn && 
            <div>
              <button 
                className='btn center' 
                style={{marginTop:"10px"}}
                onClick={() => {setmodifyItem("optionB"); setShowOverlay(true)}}
              >
                  Modifier
              </button>
            </div>}
          </Td>
          <Td className={s.td}>
            {optionArray[2]}
            {showModifyBtn && 
            <div>
              <button 
                className='btn center' 
                style={{marginTop:"10px"}}
                onClick={() => {setmodifyItem("optionC"); setShowOverlay(true)}}
              >
                  Modifier
              </button>
            </div>}
          </Td>
          <Td className={s.td}>
            {optionArray[3]}
            {showModifyBtn && 
            <div>
              <button 
                className='btn center' 
                style={{marginTop:"10px"}}
                onClick={() => {setmodifyItem("optionD"); setShowOverlay(true)}}
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

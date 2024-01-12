import React, { useState } from 'react';
import { Tr, Td } from 'react-super-responsive-table';
import s from "./style.module.css"
import { PodcastAPI } from '../../../../api/podcast-api';
import AdminPodcastModifyItem from '../ModifyItem/ModifyItem';
import { useSelector } from 'react-redux';

function Item({ podcast, podcastList, setPodcastList }) {
  const { _id, link, title, transcription, translation, image, level } = podcast;
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
      PodcastAPI.delete(_id, adminToken)
      const newFoodList = podcastList.filter(podcastItem => podcastItem !== podcast)
      setPodcastList(newFoodList)
    }
  }

  // Extraire les cinq premiers mots de la transcription
  const transcriptionFirstWords = transcription.split(' ').slice(0, 8).join(' ');
  const translationFirstWords = translation.split(' ').slice(0, 8).join(' ');
  return (
    <>
      <Tr className={s.tr}>
          <Td className={s.td}>
              {_id}
          </Td>
          <Td className={s.td}>
            {title}
            {showModifyBtn && 
            <div>
              <button 
                className='btn center' 
                style={{marginTop:"10px"}}
                onClick={() => {setmodifyItem('title'); setShowOverlay(true)}}
              >
                Modifier
              </button>
            </div>
            }
          </Td>
          <Td className={s.td}>
            {link}
            {showModifyBtn && 
            <div>
              <button 
                className='btn center' 
                style={{marginTop:"10px"}}
                onClick={() => {setmodifyItem('link'); setShowOverlay(true)}}
              >
                Modifier
              </button>
            </div>}
          </Td>
        {/* Afficher les cinq premiers mots de la transcription */}
          <Td className={s.td}>
            {transcriptionFirstWords}
            {showModifyBtn && 
            <div>
              <button 
                className='btn center' 
                style={{marginTop:"10px"}}
                onClick={() => {setmodifyItem('transcription'); setShowOverlay(true)}}
                >
                  Modifier
              </button>
            </div>}
          </Td>
          <Td className={s.td}>
            {translationFirstWords}
            {showModifyBtn && 
            <div>
              <button 
                className='btn center' 
                style={{marginTop:"10px"}}
                onClick={() => {setmodifyItem('translation'); setShowOverlay(true)}}
              >
                  Modifier
              </button>
            </div>}
          </Td>
          <Td className={s.td}>
            {image}
            {showModifyBtn && 
            <div>
              <button 
                className='btn center' 
                style={{marginTop:"10px"}}
                onClick={() => {setmodifyItem('image'); setShowOverlay(true)}}
              >
                Modifier
              </button>
            </div>}
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
        <AdminPodcastModifyItem 
          podcastList={podcastList}
          setShowOverlay={setShowOverlay}
          setPodcastList={setPodcastList}
          podcast={podcast}
          modifyItem={modifyItem}
          setShowModifyBtn={setShowModifyBtn}
        />}
    </>
  );
}

export default Item;

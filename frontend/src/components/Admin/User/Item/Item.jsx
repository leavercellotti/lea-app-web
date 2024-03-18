import React, { useState } from 'react';
import { Tr, Td } from 'react-super-responsive-table';
import s from "./style.module.css"
import { PodcastAPI } from '../../../../api/podcast-api';
import AdminModifyItem from '../ModifyItem/ModifyItem';
import { useSelector } from 'react-redux';
import { CardAPI } from '../../../../api/card-api';
import { useNavigate } from 'react-router-dom';
import { UserAPI } from '../../../../api/user-api';

function Item({ item, list, setList }) {
  const { _id, name, email, stripeId, subscriptionId, subscription, free, current_period_end, createdAt, level, nbLearnedCards, nbChatsMade, podcastsListenedArray} = item;
  let foreverFree =true
  // const adminToken = useSelector(store => store.ADMIN.token)
  // const [showOverlay, setShowOverlay] = useState(false)
  // const [modifyItem, setmodifyItem] = useState('')

  // Utiliser l'état local pour suivre l'état de l'affichage de la transcription
  // const [showModifyBtn, setShowModifyBtn] = useState(false);

  const navigate = useNavigate()
  
  // function toggleShowModifyBtn() {
  //   showModifyBtn? setShowModifyBtn(false) : setShowModifyBtn(true)
  // }

  async function unsubscribeHandler() {
    try {
      const isUnsubscribed = await UserAPI.unsubscribe(_id, email);
      if(isUnsubscribed){
        console.log('Unsubscribed successfully.');
        const newList = list.filter(newItem => newItem !== item);
        setList(newList);
      }
    } catch (error) {
      console.error('Error while unsubscribing:', error);
    }
  }

  function confirmUnsubscribe() {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce client ? Cette action est irréversible et annulera son abonnement Stripe.");
    if (isConfirmed) {
      unsubscribeHandler();
    }
  }

  function onDeleteHandler() {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?');
    if (confirmed) {
        UserAPI.unsubscribe(_id, email)
            .then(() => {
                const newList = list.filter(newItem => newItem !== item);
                setList(newList);
            })
            .catch((error) => {
                console.error(error);
                navigate('/jgieojoergj0replj');
            });
    }
  }
  async function modifyToForeverFree() {
    const response = await window.confirm("Voulez-vous vraiment passer l'abonnement de cet utilisateur en 'Forever Free' ? Son abonnement actuel sera annulé.");
    if (response) {
        console.log('Vous avez choisi de continuer.');
        var newItem = {name, email, foreverFree};
        console.log(newItem)
        try {
            const userResponse = await UserAPI.create(newItem)
            console.log(userResponse)
            if(userResponse){
              console.log(userResponse.data)
              // const newList = [{ _id:userResponse.data.userId, ...newItem }, ...list];
              // setList(newList);
              const updatedItem = {
                ...item,
                stripeId: "",
                subscriptionId: "",
                subscription: "Forever Free",
              };
              const updatedList = [...list];
              const index = updatedList.findIndex((listItem) => listItem._id === _id);
              updatedList[index] = updatedItem;
              setList(updatedList);
            }
            console.log("User created successfully:", userResponse.data.userId);
            console.log(userResponse);
        } catch (error) {
            console.error("Error while adding user:", error);
            alert("Une erreur s'est produite lors de l'ajout de l'utilisateur.");
        }
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const subscriptionDate = formatDate(createdAt);

  return (
    <>
      <Tr className={s.tr}>
          <Td className={s.td}>
              {_id}
          </Td>
          <Td className={s.td}>
            {name}
          </Td>
          <Td className={s.td}>
            {email}
          </Td>
        {/* Afficher les cinq premiers mots de la transcription */}
          <Td className={s.td}>
            {stripeId}
          </Td>
          <Td className={s.td}>
            {subscriptionId}
          </Td>
          <Td className={s.td}>
            {free && subscription !== "Forever Free" ? "Free Trial" : subscription}
            {/* {showModifyBtn && 
            <div>
              <button 
                className='btn center' 
                style={{marginTop:"10px"}}
                onClick={() => {setmodifyItem(subscription); setShowOverlay(true)}}
              >
                  Modifier
              </button>
            </div>} */}
          </Td>
          <Td className={s.td}>
            {subscriptionDate || ""}
          </Td>
          <Td className={s.td}>
            {current_period_end || ""}
          </Td>
          <Td className={s.td}>
            {level}
          </Td>
          <Td className={s.td}>
            {nbLearnedCards}
          </Td>

          <Td className={s.td}>
            {nbChatsMade}
          </Td>

          <Td className={s.td}>
            {podcastsListenedArray?.length || 0}
          </Td>
          
          <Td className={s.td}>
            <div className='options'>
            <button 
              className='btn'
              style={{margin:"5px"}}
              // onClick={toggleShowModifyBtn}
              onClick= {modifyToForeverFree}
            >
              {/* {showModifyBtn ? 'Annuler' : 'Modifier'} */}
              Forever Free
            </button>
            <button 
              className='btn'
              style={{margin:"5px"}}
              onClick={confirmUnsubscribe}
            >
              Supprimer
            </button>
            </div>
        </Td>
      </Tr>
      {/* {showOverlay &&
        <AdminModifyItem 
          list={list}
          setShowOverlay={setShowOverlay}
          setList={setList}
          item={item}
          modifyItem={modifyItem}
          setShowModifyBtn={setShowModifyBtn}
        />} */}
    </>
  );
}

export default Item;

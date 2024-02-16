import React, { useState } from 'react';
import { UserAPI } from '../../../../api/user-api';
import { useDispatch, useSelector } from 'react-redux';
import { addLearnedCard } from '../../../../store/user-slice';

function DoYouKnow({ cardId, handleNextCard }) {
  const user_id = useSelector(store => store.USER._id);
  const token = useSelector(store => store.USER.token);
  const dispatch = useDispatch()

  const addCardBackend = async (knowledge) => {
   // Effectuer l'appel API pour mettre à jour les cartes de l'utilisateur
    try {
      await UserAPI.addCard(token, user_id, cardId, knowledge);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des cartes de l\'utilisateur :', error);
    }
  };

  const onClickHandler = (value) => {
    addCardBackend(value);
    dispatch(addLearnedCard())
    handleNextCard();
  };

  return (
    <div className='box'>
      <p>Vous le saviez ?</p>
      <div className='options'>
        <div onClick={() => onClickHandler(false)} className='option red'>
          Non
        </div>
        <div onClick={() => onClickHandler(true)} className='option green'>
          Oui
        </div>
      </div>
    </div>
  );
}

export default DoYouKnow;

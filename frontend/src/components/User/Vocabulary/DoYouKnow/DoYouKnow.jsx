import React, { useState } from 'react';
import { UserAPI } from '../../../../api/user-api';
import { useDispatch, useSelector } from 'react-redux';
import { addLearnedCard } from '../../../../store/user-slice';

function DoYouKnow({ cardId, handleNextCard }) {
  const user_id = useSelector(store => store.USER._id);
  const dispatch = useDispatch()

  const addCardBackend = async (knowledge) => {
   // Effectuer l'appel API pour mettre à jour les cartes de l'utilisateur
    try {
      const response = await UserAPI.addCard(user_id, cardId, knowledge);
      if (response) {
        console.log('Cartes de l\'utilisateur mises à jour avec succès.');
      } else {
        console.error('Échec de la mise à jour des cartes de l\'utilisateur.');
      }
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

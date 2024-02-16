import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from "./style.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { UserAPI } from '../../../api/user-api';
import { modifyLevel } from '../../../store/user-slice';

function Level() {
  const [level, setLevel] = useState("A2");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user_id = useSelector(store => store.USER._id);
  const token = useSelector(store => store.USER.token);

  const modifyLevelBackend = async () => {
    // Effectuer l'appel API pour mettre à jour les cartes de l'utilisateur
    try {
      await UserAPI.updateLevel(token, user_id, level);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du niveau de l\'utilisateur :', error);
    }
  };

  // Fonction pour définir les styles inline
  const boxStyle = {
    margin: "20px 0",
  };

  // Fonction pour gérer la sélection d'une option
  const handleOptionClick = (selectedLevel) => {
    setLevel(selectedLevel);
  };

  // Fonction de validation
  const validateHandler = () => {
    console.log("here")
    dispatch(modifyLevel(level));
    modifyLevelBackend();
  };

  return (
    <div className='box' style={boxStyle}>
      <h2>Quel est votre niveau ?</h2>
      <div className='options'>
        {["A1", "A2", "B1", "B2", "C"].map((option) => (
          <div
            key={option}
            className={level === option ? `option ${s.selected}` : "option"}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </div>
        ))}
      </div>
      <div className='options'>
        <button className='btn btnSpace' onClick={() => navigate('/test')}>
          Faire le test
        </button>
        <button className='btn btnSpace' onClick={validateHandler}>
          Valider
        </button>
      </div>
    </div>
  );
}

export default Level;

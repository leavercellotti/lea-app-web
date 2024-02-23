import React, { useEffect } from 'react'
import s from "./style.module.css";
import { UserAPI } from '../../../../api/user-api';
import { useDispatch, useSelector } from 'react-redux';
import { modifyLevel } from '../../../../store/user-slice';
function TestResult({nbCorrectAnswers}) {
  const dispatch = useDispatch();
  const user_id = useSelector(store => store.USER._id);
  const token = useSelector(store => store.USER.token);
  let level;
  let text;
  if (nbCorrectAnswers <= 20) {
    level = "A1";
    text="A1 (débutant)"
  } else if (nbCorrectAnswers <= 50) {
    level = "A2";
    text="A2 (faux débutant)"
  } else if (nbCorrectAnswers <= 70) {
    level = "B1";
    text="B1 (intermédiaire)"
  } else if (nbCorrectAnswers <= 85) {
    level = "B2";
    text="B2 (courant)"
  } else {
    level = "C";
    text="C1 (avancé)";
  }

  const modifyLevelBackend = async () => {
    // Effectuer l'appel API pour mettre à jour les cartes de l'utilisateur
    try {
      await UserAPI.updateLevel(token, user_id, level);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du niveau de l\'utilisateur :', error);
    }
  };

  const editLevel = () => {
    if(level==="A1" || level==="A2" || level==="B1" ||
        level==="B2" || level==="C") {
      dispatch(modifyLevel(level));
      modifyLevelBackend();
    }
  };

  useEffect(() => {
    editLevel()
  },[level])
  return (
    <div className='box'>
        <h3>Votre niveau est :</h3>
        <div className={s.resultContainer}>
            <div className={s.result}>{text}</div>
        </div>
    </div>
  )
}

export default TestResult
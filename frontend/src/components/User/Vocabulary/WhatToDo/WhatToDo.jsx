import React from 'react'
import { useNavigate } from 'react-router-dom';

function WhatToDo() {
    const navigate = useNavigate()
    return (
        <div className='box'>
          <h2>Que voulez-vous faire ?</h2>
          <p>Bravo vous avez bien travaillé !</p>
          <div className='options'>
            <button className='btn btnSpace' onClick={() => navigate("/podcasts")}>
                Écouter un podcast
            </button>
            <button className='btn btnSpace' onClick={() => navigate("/revise")}>
              Réviser
            </button>
          </div>
        </div>
      );
    }

export default WhatToDo
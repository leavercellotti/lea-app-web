import React, { useState } from 'react'
import s from "./style.module.css"
import { useSelector } from 'react-redux';
import { TestAPI } from '../../../../api/test-api';
import { useNavigate } from 'react-router-dom';
function ModifyItem({
        setShowOverlay, list, setList, item, modifyItem, setShowModifyBtn
    }) {
    const { _id, sentence, answer, optionArray } = item;

  const optionA = optionArray[0] || "";
  const optionB = optionArray[1] || "";
  const optionC = optionArray[2] || "";
  const optionD = optionArray[3] || "";

    const [newSentence, setNewSentence] = useState(sentence);
    const [newAnswer, setNewAnswer] = useState(answer);
    const [newOptionA, setNewOptionA] = useState(optionA);
    const [newOptionB, setNewOptionB] = useState(optionB);
    const [newOptionC, setNewOptionC] = useState(optionC);
    const [newOptionD, setNewOptionD] = useState(optionD);
    const modifyOptionArray = [newOptionA, newOptionB, newOptionC, newOptionD];
    const adminToken = useSelector(store => store.ADMIN.token)
    const navigate = useNavigate()
    
    function onEditHandler() {
      const updatedItem = {
        ...item,
        sentence: newSentence,
        answer: newAnswer,
        optionArray: modifyOptionArray,
      };
    
      TestAPI.update(_id, updatedItem, adminToken)
        .then(() => {
          const updatedList = [...list];
          const index = updatedList.findIndex((listItem) => listItem._id === _id);
          updatedList[index] = updatedItem;
          setList(updatedList);
          setShowOverlay(false);
          setShowModifyBtn(false);
        })
        .catch((error) => {
          console.error(error);
          navigate('/jgieojoergj0replj')
        });
    }  
  return (
    <div className={s.overlay}>
        <div className={s.overlayContent}>
            <button 
                className={s.closeBtn}
                onClick={() => {setShowOverlay(false); setShowModifyBtn(false)}}
            >
                x
            </button>
            <h3>Modification</h3>
            {modifyItem === "sentence" &&
            <>
              <label htmlFor="sentence" className="form-label">
                <div>
                    Phrase: 
                </div>
                <textarea
                  //type="text"
                  className="form-control"
                  style={{width:"300px", height:"150px", maxWidth:"90%"}}
                  id="sentence"
                  value={newSentence}
                  onChange={(e) => {setNewSentence(e.target.value)}}
                  required
                />
              </label>
              <div>
                <button
                  className="btn"
                  style={{marginTop:"10px"}}
                  onClick={onEditHandler}
                >
                  Valider
                </button>
              </div>
            </>
            }
            
            {modifyItem === "answer" &&
            <>
              <label htmlFor="answer" className="form-label">
                <div>
                    Réponse: 
                </div>
                <div className={s.textareaContainer}>
                  <select
                      className="form-control"
                      id="answer"
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      required
                  >
                    <option value={'a'}>a</option>
                    <option value={'b'}>b</option>
                    <option value={'c'}>c</option>
                    <option value={'d'}>d</option>
                  </select>
                </div>
              </label>
              <div>
                <button
                  className="btn"
                  style={{marginTop:"10px"}}
                  onClick={onEditHandler}
                >
                  Valider
                </button>
              </div>
            </>
            }
          

        {modifyItem === "optionA" &&
          <>
            <label htmlFor="optionA" className="form-label">
              <div>
                Option a :
              </div>
              <textarea
                className="form-control"
                style={{ width: "300px", height: "150px", maxWidth: "90%" }}
                id="optionA"
                value={newOptionA}
                onChange={(e) => { setNewOptionA(e.target.value) }}
                required
              />
            </label>
            <div>
              <button
                className="btn"
                style={{ marginTop: "10px" }}
                onClick={onEditHandler}
              >
                Valider
              </button>
            </div>
          </>
        }

        {modifyItem === "optionB" &&
          <>
            <label htmlFor="optionB" className="form-label">
              <div>
                Option b:
              </div>
              <textarea
                className="form-control"
                style={{ width: "300px", height: "150px", maxWidth: "90%" }}
                id="optionB"
                value={newOptionB}
                onChange={(e) => { setNewOptionB(e.target.value) }}
                required
              />
            </label>
            <div>
              <button
                className="btn"
                style={{ marginTop: "10px" }}
                onClick={onEditHandler}
              >
                Valider
              </button>
            </div>
          </>
        }

        {modifyItem === "optionC" &&
          <>
            <label htmlFor="optionC" className="form-label">
              <div>
                Option c:
              </div>
              <textarea
                className="form-control"
                style={{ width: "300px", height: "150px", maxWidth: "90%" }}
                id="optionC"
                value={newOptionC}
                onChange={(e) => { setNewOptionC(e.target.value) }}
                required
              />
            </label>
            <div>
              <button
                className="btn"
                style={{ marginTop: "10px" }}
                onClick={onEditHandler}
              >
                Valider
              </button>
            </div>
          </>
        }

        {modifyItem === "optionD" &&
          <>
            <label htmlFor="optionD" className="form-label">
              <div>
                Option d :
              </div>
              <textarea
                className="form-control"
                style={{ width: "300px", height: "150px", maxWidth: "90%" }}
                id="optionD"
                value={newOptionD}
                onChange={(e) => { setNewOptionD(e.target.value) }}
                required
              />
            </label>
            <div>
              <button
                className="btn"
                style={{ marginTop: "10px" }}
                onClick={onEditHandler}
              >
                Valider
              </button>
            </div>
          </>
        }
        </div>
    </div>
  )
}

export default ModifyItem
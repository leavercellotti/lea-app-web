import React, { useState } from 'react'
import s from "./style.module.css"
import { useSelector } from 'react-redux';
import { PromptiaAPI } from '../../../../api/promptia-api';
function ModifyItem({
        setShowOverlay, promptList, setPromptList, prompt, modifyItem, setShowModifyBtn
    }) {
    const { _id, sentence, level } = prompt;
    console.log("s", sentence)
    const [newSentence, setNewSentence] = useState(sentence);
    const [newLevel, setNewLevel] = useState(level);
    const adminToken = useSelector(store => store.ADMIN.token)
    function onEditHandler(modifiedItem) {
        const newPromptList = promptList
        const isSelectedOption = (prompt) => _id === prompt._id
        const index = newPromptList.findIndex(isSelectedOption)
        console.log(modifyItem, index)
        switch(modifyItem) {
          case 'sentence':
              PromptiaAPI.update(prompt._id, {...prompt, sentence: newSentence}, adminToken)
              newPromptList[index].sentence=newSentence
              setPromptList(newPromptList)
              setShowOverlay(false)
              setShowModifyBtn(false)
              break;
            
            case 'level':
                PromptiaAPI.update(prompt._id, {...prompt, level: newLevel}, adminToken)
                newPromptList[index].level=newLevel
                setPromptList(newPromptList)
                setShowOverlay(false)
                setShowModifyBtn(false)
                break;
          default:
            console.log("error")
        }
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
            
            {modifyItem === "level" &&
            <>
              <label htmlFor="level" className="form-label">
                <div>
                    Niveau: 
                </div>
                <div className={s.textareaContainer}>
                  <select
                      className="form-control"
                      id="level"
                      value={newLevel}
                      onChange={(e) => setNewLevel(e.target.value)}
                      required
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
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
        </div>
    </div>
  )
}

export default ModifyItem
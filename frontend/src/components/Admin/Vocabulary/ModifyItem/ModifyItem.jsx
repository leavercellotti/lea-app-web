import React, { useState } from 'react';
import s from "./style.module.css";
import { CardAPI } from '../../../../api/card-api';
import { useSelector } from 'react-redux';

function ModifyItem({
  setShowOverlay, list, setList, item, modifyItem, setShowModifyBtn
}) {
  const { _id, wordEnglish, wordFrench, level, sentenceArray } = item;
  const sentence1 = sentenceArray[0] || "";
  const sentence2 = sentenceArray[1] || "";
  const sentence3 = sentenceArray[2] || "";

  const [newWordEnglish, setNewWordEnglish] = useState(wordEnglish);
  const [newWordFrench, setNewWordFrench] = useState(wordFrench);
  const [newLevel, setNewLevel] = useState(level);
  const [newSentence1, setNewSentence1] = useState(sentence1);
  const [newSentence2, setNewSentence2] = useState(sentence2);
  const [newSentence3, setNewSentence3] = useState(sentence3);
  const modifySentenceArray = [newSentence1, newSentence2, newSentence3];

  const adminToken = useSelector(store => store.ADMIN.token);

  function onEditHandler() {
    const filteredSentenceArray = modifySentenceArray.filter(chaine => chaine !== "");
    console.log(filteredSentenceArray)
    
    const updatedItem = {
      ...item,
      wordEnglish: newWordEnglish,
      wordFrench: newWordFrench,
      level: newLevel,
      sentenceArray: filteredSentenceArray,
    };
  
    CardAPI.update(_id, updatedItem, adminToken)
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
      });
  }  

  return (
    <div className={s.overlay}>
      <div className={s.overlayContent}>
        <button
          className={s.closeBtn}
          onClick={() => {
            setShowOverlay(false);
            setShowModifyBtn(false);
          }}
        >
          x
        </button>
        <h3>Modification</h3>

        {modifyItem === "wordEnglish" &&
          <>
            <label htmlFor="wordEnglish" className="form-label">
              <div>
                Titre:
              </div>
              <textarea
                className="form-control"
                style={{ width: "300px", height: "150px", maxWidth: "90%" }}
                id="wordEnglish"
                value={newWordEnglish}
                onChange={(e) => { setNewWordEnglish(e.target.value) }}
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

        {modifyItem === "wordFrench" &&
          <>
            <label htmlFor="wordFrench" className="form-label">
              <div>
                Lien:
              </div>
              <textarea
                className="form-control"
                style={{ width: "300px", height: "150px", maxWidth: "90%" }}
                id="wordFrench"
                value={newWordFrench}
                onChange={(e) => { setNewWordFrench(e.target.value) }}
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

        {modifyItem === "sentence1" &&
          <>
            <label htmlFor="sentence1" className="form-label">
              <div>
                Phrase 1:
              </div>
              <textarea
                className="form-control"
                style={{ width: "300px", height: "150px", maxWidth: "90%" }}
                id="sentence1"
                value={newSentence1}
                onChange={(e) => { setNewSentence1(e.target.value) }}
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

        {modifyItem === "sentence2" &&
          <>
            <label htmlFor="sentence2" className="form-label">
              <div>
                Phrase 1:
              </div>
              <textarea
                className="form-control"
                style={{ width: "300px", height: "150px", maxWidth: "90%" }}
                id="sentence2"
                value={newSentence2}
                onChange={(e) => { setNewSentence2(e.target.value) }}
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

        {modifyItem === "sentence3" &&
          <>
            <label htmlFor="sentence3" className="form-label">
              <div>
                Phrase 1:
              </div>
              <textarea
                className="form-control"
                style={{ width: "300px", height: "150px", maxWidth: "90%" }}
                id="sentence3"
                value={newSentence3}
                onChange={(e) => { setNewSentence3(e.target.value) }}
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

        {/* Similar blocks for other modifyItem options */}

      </div>
    </div>
  );
}

export default ModifyItem;
import React, { useState } from 'react'
import s from "./style.module.css"
import { PodcastAPI } from '../../../../api/podcast-api'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function ModifyItem({
        setShowOverlay, podcastList, setPodcastList, podcast, modifyItem, setShowModifyBtn
    }) {
    const { _id, link, title, transcription, translation, image, level } = podcast;
    const [newTitle, setNewTitle] = useState(title);
    const [newLink, setNewLink] = useState(link);
    const [newTranscription, setNewTranscription] = useState(transcription);
    const [newTranslation, setNewTranslation] = useState(translation);
    const [newImage, setNewImage] = useState(image);
    const [newLevel, setNewLevel] = useState(level);
    const adminToken = useSelector(store => store.ADMIN.token)

    const navigate = useNavigate()
    function onEditHandler(modifiedItem) {
        const newPodcastList = podcastList
        const isSelectedOption = (podcast) => _id === podcast._id
        const index = newPodcastList.findIndex(isSelectedOption)
        switch(modifyItem) {
          case 'title':
              PodcastAPI.update(podcast._id, {...podcast, title: newTitle}, adminToken)
              .then(() => {
                newPodcastList[index].title=newTitle
                setPodcastList(newPodcastList)
                setShowOverlay(false)
                setShowModifyBtn(false)
              })
              .catch((error) => {
                console.error(error);
                navigate('/jgieojoergj0replj');
              });
              break;
          case 'link':
            PodcastAPI.update(podcast._id, {...podcast, link: newLink}, adminToken)
            .then(() => {
              newPodcastList[index].link=newLink
              setPodcastList(newPodcastList)
              setShowOverlay(false)
              setShowModifyBtn(false)
            })
            .catch((error) => {
                console.error(error);
                navigate('/jgieojoergj0replj');
            });
          break;
          case 'transcription':
            PodcastAPI.update(podcast._id, {...podcast, transcription: newTranscription}, adminToken)
            .then(() => {
              newPodcastList[index].transcription=newTranscription
              setPodcastList(newPodcastList)
              setShowOverlay(false)
              setShowModifyBtn(false)
            })
            .catch((error) => {
                console.error(error);
                navigate('/jgieojoergj0replj');
            });
            break;
          case 'translation':
            PodcastAPI.update(podcast._id, {...podcast, translation: newTranslation}, adminToken)
            .then(() => {
              newPodcastList[index].translation=newTranslation
              setPodcastList(newPodcastList)
              setShowOverlay(false)
              setShowModifyBtn(false)
            })
            .catch((error) => {
                console.error(error);
                navigate('/jgieojoergj0replj');
            });
            break;
          case 'image':
            PodcastAPI.update(podcast._id, {...podcast, image: newImage}, adminToken)
            .then(() => {
              newPodcastList[index].image=newImage
              setPodcastList(newPodcastList)
              setShowOverlay(false)
              setShowModifyBtn(false)
            })
            .catch((error) => {
                console.error(error);
                navigate('/jgieojoergj0replj');
            });
            break;
          case 'level':
            PodcastAPI.update(podcast._id, {...podcast, level: newLevel}, adminToken)
            .then(() => {
              newPodcastList[index].level=newLevel
              setPodcastList(newPodcastList)
              setShowOverlay(false)
              setShowModifyBtn(false)
            })
            .catch((error) => {
                console.error(error);
                navigate('/jgieojoergj0replj');
            });
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
            {modifyItem === "title" &&
            <>
              <label htmlFor="title" className="form-label">
                <div>
                    Titre: 
                </div>
                <textarea
                  //type="text"
                  className="form-control"
                  style={{width:"300px", height:"150px", maxWidth:"90%"}}
                  id="title"
                  value={newTitle}
                  onChange={(e) => {setNewTitle(e.target.value)}}
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
            {modifyItem === "link" &&
            <>
              <label htmlFor="link" className="form-label">
                <div>
                    Lien: 
                </div>
                <textarea
                  //type="text"
                  className="form-control"
                  style={{width:"300px", height:"150px", maxWidth:"90%"}}
                  id="link"
                  value={newLink}
                  onChange={(e) => {setNewLink(e.target.value)}}
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
            {modifyItem === "transcription" &&
            <>
              <label htmlFor="transcription" className="form-label">
                <div>
                    Lien: 
                </div>
                <textarea
                  //type="text"
                  className="form-control"
                  style={{width:"300px", height:"150px", maxWidth:"90%"}}
                  id="transcription"
                  value={newTranscription}
                  onChange={(e) => {setNewTranscription(e.target.value)}}
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
            {modifyItem === "translation" &&
            <>
              <label htmlFor="translation" className="form-label">
                <div>
                    Lien: 
                </div>
                <textarea
                  //type="text"
                  className="form-control"
                  style={{width:"300px", height:"150px", maxWidth:"90%"}}
                  id="translation"
                  value={newTranslation}
                  onChange={(e) => {setNewTranslation(e.target.value)}}
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
            {modifyItem === "image" &&
            <>
              <label htmlFor="image" className="form-label">
                <div>
                    Lien: 
                </div>
                <textarea
                  //type="text"
                  className="form-control"
                  style={{width:"300px", height:"150px", maxWidth:"90%"}}
                  id="image"
                  value={newImage}
                  onChange={(e) => {setNewImage(e.target.value)}}
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
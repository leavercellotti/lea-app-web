import React, { useState } from 'react';
import s from "./style.module.css";
import { CardAPI } from '../../../../api/card-api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ModifyItem({
  setShowOverlay, list, setList, item, modifyItem, setShowModifyBtn
}) {
  const { _id, name, email, stripeId, subscriptionId, subscription, nbLearnedCards } = item;

  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newStripeId, setNewStripeId] = useState(stripeId);
  const [newSubscriptionId, setNewSubscriptionId] = useState(subscriptionId);
  const [newSubscription, setNewSubscription] = useState(subscription);
  const [newNbLearnedCards, setNewNbLearnedCards] = useState(nbLearnedCards);

  const navigate = useNavigate()
  const adminToken = useSelector(store => store.ADMIN.token);

  function onEditHandler() {
    const updatedItem = {
      ...item,
      name: newName,
      email: newEmail,
      stripeId: newStripeId,
      subscriptionId: newSubscriptionId,
      subscription: newSubscription,
      nbLearnedCards: newNbLearnedCards
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
        navigate('/jgieojoergj0replj')
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

        {modifyItem === "name" &&
          <>
            <label htmlFor="name" className="form-label">
              <div>
                Titre:
              </div>
              <textarea
                className="form-control"
                style={{ width: "300px", height: "150px", maxWidth: "90%" }}
                id="name"
                value={newName}
                onChange={(e) => { setNewName(e.target.value) }}
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

        {modifyItem === "email" &&
          <>
            <label htmlFor="email" className="form-label">
              <div>
                Lien:
              </div>
              <textarea
                className="form-control"
                style={{ width: "300px", height: "150px", maxWidth: "90%" }}
                id="email"
                value={newEmail}
                onChange={(e) => { setNewEmail(e.target.value) }}
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

        {modifyItem === "stripeId" &&
            <>
              <label htmlFor="stripeId" className="form-label">
                <div>
                    Niveau: 
                </div>
                <div className={s.textareaContainer}>
                  <select
                      className="form-control"
                      id="stripeId"
                      value={newStripeId}
                      onChange={(e) => setNewStripeId(e.target.value)}
                      required
                  >
                    <option value={"A1"}>A1</option>
                    <option value={"A2"}>A2</option>
                    <option value={"B1"}>B1</option>
                    <option value={"B2"}>B2</option>
                    <option value={"C"}>C</option>
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

        {modifyItem === "subscriptionId" &&
          <>
            <label htmlFor="subscriptionId" className="form-label">
              <div>
                Phrase 1:
              </div>
              <textarea
                className="form-control"
                style={{ width: "300px", height: "150px", maxWidth: "90%" }}
                id="subscriptionId"
                value={newSubscriptionId}
                onChange={(e) => { setNewSubscriptionId(e.target.value) }}
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

        {modifyItem === "subscription" &&
          <>
            <label htmlFor="subscription" className="form-label">
              <div>
                Phrase 1:
              </div>
              <textarea
                className="form-control"
                style={{ width: "300px", height: "150px", maxWidth: "90%" }}
                id="subscription"
                value={newSubscription}
                onChange={(e) => { setNewSubscription(e.target.value) }}
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

        {modifyItem === "nbLearnedCards" &&
          <>
            <label htmlFor="nbLearnedCards" className="form-label">
              <div>
                Phrase 1:
              </div>
              <textarea
                className="form-control"
                style={{ width: "300px", height: "150px", maxWidth: "90%" }}
                id="nbLearnedCards"
                value={newNbLearnedCards}
                onChange={(e) => { setNewNbLearnedCards(e.target.value) }}
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
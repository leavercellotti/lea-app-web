import React, { useState } from 'react'
import s from "./style.module.css"
import { PodcastAPI } from '../../../../api/podcast-api';
import { useSelector } from 'react-redux';
import { CardAPI } from '../../../../api/card-api';
import { useNavigate } from 'react-router-dom';
import { UserAPI } from '../../../../api/user-api';
function AddForm({list, setList, setShowForm}) {
  const adminToken = useSelector(store => store.ADMIN.token)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const foreverFree = true
    const sessionId =""
    const subscriptionId = ""
    // const [stripeId, setStripeId] = useState("");
    // const [subscriptionId, setSubscriptionId] = useState();
    // const [subscription, setSubscription] = useState();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        var newItem = {name, email, foreverFree};
        console.log(newItem)
        // async function addUserHandler() {
          try {
              // if (sessionInfo && !executed) {
              //     setExecuted(true);
              //     console.log("add", sessionInfo);
              //     const data = {
              //         name: sessionInfo.customer_details.name,
              //         email: sessionInfo.customer_details.email,
              //         sessionId: sessionInfo.id,
              //         subscriptionId: sessionInfo.subscription
              //     };
              //     console.log("data", data);
                  const userResponse = await UserAPI.create(newItem)
                  console.log(userResponse)
                  if(userResponse){
                    console.log(userResponse.data)
                    const newList = [{ _id:userResponse.data.userId, ...newItem }, ...list];
                    setList(newList);
                  }
                  // else{
                  //   console.error(error);
                  //   navigate('/jgieojoergj0replj')
                  // }
                  // .then((data) => {
                  //   console.log(data)
                  //   const newList = [{ _id:data.userId, ...newItem }, ...list];
                  //   setList(newList);
                  //   })
                // .catch((error) => {
                //     console.error(error);
                //     navigate('/jgieojoergj0replj')
                // });
                setShowForm(false)
                  console.log("User created successfully:", userResponse.data.userId);
                  // setUserId(userResponse.data.userId);
                  console.log(userResponse);

              //     if (userResponse) {
              //         // setLogin(true);
              //         // setIsAdded(true)
              //         alert("Inscription validée.");
              //     } else {
              //         alert("Erreur lors de la création de l'utilisateur.");
              //     }
              // }
          } catch (error) {
              console.error("Error while adding user:", error);
              alert("Une erreur s'est produite lors de l'ajout de l'utilisateur.");
          }
    }
    
  return (
    <form 
        onSubmit={handleSubmit}
        className={s.form}
    >
      <div className="mb-3">
        <h2>Création d'un utilisateur "Forever Free"</h2>
        <label htmlFor="name" className="form-label">
          <div className={s.title}>
            Nom: 
          </div>
          <div className={s.textareaContainer}>
            <textarea
              className={s.textarea}
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </label>
        <br />
        <label htmlFor="email" className="form-label">
          <div className={s.title}>
            Email:
          </div>
          <div className={s.textareaContainer}>
            <input
              className={s.textarea}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </label>
        <br />
        {/* <label htmlFor="stripeId" className="form-label">
          <div className={s.title}>
            Id client Stripe:
          </div>
          <div className={s.textareaContainer}>
            <textarea
              className={s.textarea}
              id="stripeId"
              value={stripeId}
              onChange={(e) => setStripeId(e.target.value)}
              required
            />
          </div>
        </label>
        <br /> */}

        {/* <label htmlFor="level" className="form-label">
          <div className={s.title}>
            Niveau:
          </div>
          <div className={s.textareaContainer}>
            <select
                className="form-control"
                id="level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                required
            >
                <option value={"A1"}>A1</option>
                <option value={"A2"}>A2</option>
                <option value={"B1"}>B1</option>
                <option value={"B2"}>B2</option>
                <option value={"C"}>C</option>
            </select>
          </div> 
        </label>*/}
        {/* <br /> */}

        {/* <label htmlFor="subscriptionId" className="form-label">
          <div className={s.title}>
            Id Abonnement Stripe:
          </div>
          <div className={s.textareaContainer}>
            <textarea
              className={s.textarea}
              id="subscriptionId"
              value={subscriptionId}
              onChange={(e) => setSubscriptionId(e.target.value)}
              rows={4}
            />
          </div>
        </label>
        <label htmlFor="subscription" className="form-label">
          <div className={s.title}>
            Abonnement:
          </div>
          <div className={s.textareaContainer}>
            <textarea
              className={s.textarea}
              id="subscription"
              value={subscription}
              onChange={(e) => setSubscription(e.target.value)}
              rows={4}
            />
          </div>
        </label> */}
        
        <br />
        <div className={s.textareaContainer}>
          <button type="submit" className="btn btn-primary">
            Ajouter
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddForm
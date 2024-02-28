import React, { useState } from 'react'
import s from "./style.module.css"
import { useSelector } from 'react-redux';
import { TestAPI } from '../../../../api/test-api';
import { useNavigate } from 'react-router-dom';
function AddForm({list, setList, setShowForm}) {
  const navigate = useNavigate()
  const adminToken = useSelector(store => store.ADMIN.token)
    const [sentence, setSentence] = useState("");
    const [answer, setAnswer] = useState("a");
    const [optionA, setOptionA] = useState();
    const [optionB, setOptionB] = useState();
    const [optionC, setOptionC] = useState();
    const [optionD, setOptionD] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const optionArray=[optionA, optionB, optionC, optionD]
        //console.log(answer)
        var newItem = {sentence, answer, optionArray };
        TestAPI.create(newItem, adminToken)
        .then((id) => {
            const newList = [{ _id:id, ...newItem },...list];
            setList(newList);
            })
        .catch((error) => {
            console.error(error);
            navigate('/jgieojoergj0replj')
        });
        setShowForm(false)
    }
  return (
    <form 
        onSubmit={handleSubmit}
        className={s.form}
    >
      <div className="mb-3">
        <h2>Création</h2>
        <label htmlFor="sentence" className="form-label">
          <div className={s.title}>
            Phrase: 
          </div>
          <div className={s.textareaContainer}>
            <textarea
              className={s.textarea}
              id="sentence"
              value={sentence}
              onChange={(e) => setSentence(e.target.value)}
              required
              rows={4}
            />
          </div>
        </label>
        <br />

        <label htmlFor="optionA" className="form-label">
          <div className={s.title}>
            Option a :
          </div>
          <div className={s.textareaContainer}>
            <textarea
              className={s.textarea}
              id="optionA"
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
            />
          </div>
        </label>
        <label htmlFor="optionB" className="form-label">
          <div className={s.title}>
            Option b :
          </div>
          <div className={s.textareaContainer}>
            <textarea
              className={s.textarea}
              id="optionB"
              value={optionB}
              onChange={(e) => setOptionB(e.target.value)}
            />
          </div>
        </label>
        <label htmlFor="optionC" className="form-label">
          <div className={s.title}>
            Option c:
          </div>
          <div className={s.textareaContainer}>
            <textarea
              className={s.textarea}
              id="optionC"
              value={optionC}
              onChange={(e) => setOptionC(e.target.value)}
            />
          </div>
        </label>
        <label htmlFor="optionD" className="form-label">
          <div className={s.title}>
            Option d :
          </div>
          <div className={s.textareaContainer}>
            <textarea
              className={s.textarea}
              id="optionD"
              value={optionD}
              onChange={(e) => setOptionD(e.target.value)}
            />
          </div>
        </label>

        <br />

        <label htmlFor="answer" className="form-label">
          <div className={s.title}>
            Réponse:
          </div>
          <div className={s.textareaContainer}>
            <select
                className="form-control"
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
            >
                <option value={"a"}>a</option>
                <option value={"b"}>b</option>
                <option value={"c"}>c</option>
                <option value={"d"}>d</option>
            </select>
          </div>
        </label>
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
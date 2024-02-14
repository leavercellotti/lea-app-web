import React, { useState } from 'react'
import s from "./style.module.css"
import { PodcastAPI } from '../../../../api/podcast-api';
import { useSelector } from 'react-redux';
import { PromptiaAPI } from '../../../../api/promptia-api';
function AddForm({list, setList, setShowForm}) {
  const adminToken = useSelector(store => store.ADMIN.token)
    const [sentence, setSentence] = useState("");
    const [level, setLevel] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        var newItem = {sentence, level};
        PromptiaAPI.create(newItem, adminToken)
        .then((id) => {
            const newList = [...list, { _id:id, ...newItem }];
            setList(newList);
            })
        .catch((error) => {
            console.error(error);
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
          <div className={s.sentence}>
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

        <label htmlFor="level" className="form-label">
          <div className={s.title}>
            Niveau:
          </div>
          <div className={s.textareaContainer}>
            <select
                className="form-control"
                id="level"
                value={level}
                onChange={(e) => setLevel(Number(e.target.value))}
                required
            >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
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
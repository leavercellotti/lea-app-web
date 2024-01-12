import React, { useState } from 'react'
import s from "./style.module.css"
import { PodcastAPI } from '../../../../api/podcast-api';
import { useSelector } from 'react-redux';
function AddForm({list, setList, setShowForm}) {
  const adminToken = useSelector(store => store.ADMIN.token)
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [transcription, setTranscription] = useState("");
    const [translation, setTranslation] = useState("");
    const [image, setImage] = useState("");
    const [level, setLevel] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        var newItem = {title, link, transcription, translation, image, level};
        PodcastAPI.create(newItem, adminToken)
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
        <label htmlFor="title" className="form-label">
          <div className={s.title}>
            Titre: 
          </div>
          <div className={s.textareaContainer}>
            <textarea
              className={s.textarea}
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
        </label>
        <br />
        <label htmlFor="link" className="form-label">
          <div className={s.title}>
            Lien:
          </div>
          <div className={s.textareaContainer}>
            <textarea
              className={s.textarea}
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>
        </label>
        <br />

        <label htmlFor="transcription" className="form-label">
          <div className={s.title}>
            Texte anglais:
          </div>
          <div className={s.textareaContainer}>
            <textarea
              //className={`form-control ${s.textarea}`}
              className={s.textarea}
              id="transcription"
              value={transcription}
              onChange={(e) => setTranscription(e.target.value)}
              required
              rows={4}  // Vous pouvez ajuster le nombre de lignes selon vos besoins
          />
          </div>
        </label>
        <br />

        <label htmlFor="translation" className="form-label">
          <div className={s.title}>
            Texte français:
          </div>
          <div className={s.textareaContainer}>
            <textarea
              className={s.textarea}
              id="translation"
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              required
              rows={4}
            />
          </div>
        </label>
        <br />

        <label htmlFor="image" className="form-label">
          <div className={s.title}>
            Image:
          </div>
          <div className={s.textareaContainer}>
            <textarea
              className={s.textarea}
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
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
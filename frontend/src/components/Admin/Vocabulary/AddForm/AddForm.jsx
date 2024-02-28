//--------------------Encoder plusieurs mots d'un coup
// wordEnglish : wordFrend;
// wordEnglish : wordFrend; ...
// import React, { useState } from 'react';
// import s from "./style.module.css";
// import { useSelector } from 'react-redux';
// import { CardAPI } from '../../../../api/card-api';
// function AddForm({ list, setList, setShowForm }) {
//   const adminToken = useSelector(store => store.ADMIN.token);
//   const [combinedWords, setCombinedWords] = useState("");
//   const [level, setLevel] = useState("A1");
//   const [sentence1, setSentence1] = useState("");
//   const [sentence2, setSentence2] = useState("");
//   const [sentence3, setSentence3] = useState("");

//   const handleSubmit = async (e) => {
//       e.preventDefault();

//       const wordsArray = combinedWords.split(';').map(item => item.trim());
//       const sentenceArray = [sentence1, sentence2, sentence3].filter(sentence => sentence.trim() !== "");

//       // Utiliser Promise.all pour gérer plusieurs appels asynchrones
//       const cardPromises = wordsArray.map(async (words) => {
//           const [wordEnglish, wordFrench] = words.split(':').map(item => item.trim());
//           const newItem = { wordEnglish, wordFrench, level, sentenceArray };

//           try {
//               const id = await CardAPI.create(newItem, adminToken);
//               return { _id: id, ...newItem };
//           } catch (error) {
//               console.error(error);
//               return null;
//           }
//       });

//       Promise.all(cardPromises)
//           .then((newItems) => {
//               const filteredNewItems = newItems.filter(item => item !== null);
//               const newList = [...list, ...filteredNewItems];
//               setList(newList);
//               setShowForm(false);
//           })
//           .catch((error) => {
//               console.error(error);
//           });
//   };

//   return (
//       <form
//           onSubmit={handleSubmit}
//           className={s.form}
//       >
//           <div className="mb-3">
//               <h2>Création</h2>
//               <label htmlFor="combinedWords" className="form-label">
//                   <div className={s.title}>
//                       Mots anglais et français (séparés par ";", chaque mot par ":"):
//                   </div>
//                   <div className={s.textareaContainer}>
//                       <textarea
//                           className={s.textarea}
//                           id="combinedWords"
//                           value={combinedWords}
//                           onChange={(e) => setCombinedWords(e.target.value)}
//                           required
//                           rows={8}
//                       />
//                   </div>
//               </label>
//               <br />
                

//           <label htmlFor="level" className="form-label">
//             <div className={s.title}>
//               Niveau:
//             </div>
//             <div className={s.textareaContainer}>
//               <select
//                 className="form-control"
//                 id="level"
//                 value={level}
//                 onChange={(e) => setLevel(e.target.value)}
//                 required
//             >
//                 <option value={"A1"}>A1</option>
//                 <option value={"A2"}>A2</option>
//                 <option value={"B1"}>B1</option>
//                 <option value={"B2"}>B2</option>
//                 <option value={"C"}>C</option>
//             </select>
//           </div>
//         </label>
//         <br />

//         <label htmlFor="translation" className="form-label">
//           <div className={s.title}>
//             Phrase 1:
//           </div>
//           <div className={s.textareaContainer}>
//             <textarea
//               className={s.textarea}
//               id="sentence1"
//               value={sentence1}
//               onChange={(e) => setSentence1(e.target.value)}
//               rows={4}
//             />
//           </div>
//         </label>
//         <label htmlFor="translation" className="form-label">
//           <div className={s.title}>
//             Phrase 2:
//           </div>
//           <div className={s.textareaContainer}>
//             <textarea
//               className={s.textarea}
//               id="sentence2"
//               value={sentence2}
//               onChange={(e) => setSentence2(e.target.value)}
//               rows={4}
//             />
//           </div>
//         </label>
//         <label htmlFor="translation" className="form-label">
//           <div className={s.title}>
//             Phrase 3:
//           </div>
//           <div className={s.textareaContainer}>
//             <textarea
//               className={s.textarea}
//               id="sentence3"
//               value={sentence3}
//               onChange={(e) => setSentence3(e.target.value)}
//               rows={4}
//             />
//           </div>
//         </label>

//         <br />
//         <div className={s.textareaContainer}>
//           <button type="submit" className="btn btn-primary">
//             Ajouter
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }

// export default AddForm

//--------------------Encoder un mot d'un coup (anglais + français)
// wordEnglish : wordFrend
// import React, { useState } from 'react';
// import s from "./style.module.css";
// import { useSelector } from 'react-redux';
// import { CardAPI } from '../../../../api/card-api';

// function AddForm({ list, setList, setShowForm }) {
//     const adminToken = useSelector(store => store.ADMIN.token);
//     const [combinedWords, setCombinedWords] = useState("");
//     const [level, setLevel] = useState("A1");
//     const [sentence1, setSentence1] = useState("");
//     const [sentence2, setSentence2] = useState("");
//     const [sentence3, setSentence3] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const [wordEnglish, wordFrench] = combinedWords.split(':').map(item => item.trim());
//         const sentenceArray = [sentence1, sentence2, sentence3].filter(sentence => sentence.trim() !== "");
//         const newItem = { wordEnglish, wordFrench, level, sentenceArray };

//         CardAPI.create(newItem, adminToken)
//             .then((id) => {
//                 const newList = [...list, { _id: id, ...newItem }];
//                 setList(newList);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });

//         setShowForm(false);
//     };

//     return (
//         <form
//             onSubmit={handleSubmit}
//             className={s.form}
//         >
//             <div className="mb-3">
//                 <h2>Création</h2>
//                 <label htmlFor="combinedWords" className="form-label">
//                     <div className={s.title}>
//                         Mots anglais et français (séparés par ":"):
//                     </div>
//                     <div className={s.textareaContainer}>
//                         <textarea
//                             className={s.textarea}
//                             id="combinedWords"
//                             value={combinedWords}
//                             onChange={(e) => setCombinedWords(e.target.value)}
//                             required
//                         />
//                     </div>
//                 </label>
//                 <br />
                

//          <label htmlFor="level" className="form-label">
//            <div className={s.title}>
//              Niveau:
//            </div>
//            <div className={s.textareaContainer}>
//              <select
//                 className="form-control"
//                 id="level"
//                 value={level}
//                 onChange={(e) => setLevel(e.target.value)}
//                 required
//             >
//                 <option value={"A1"}>A1</option>
//                 <option value={"A2"}>A2</option>
//                 <option value={"B1"}>B1</option>
//                 <option value={"B2"}>B2</option>
//                 <option value={"C"}>C</option>
//             </select>
//           </div>
//         </label>
//         <br />

//         <label htmlFor="translation" className="form-label">
//           <div className={s.title}>
//             Phrase 1:
//           </div>
//           <div className={s.textareaContainer}>
//             <textarea
//               className={s.textarea}
//               id="sentence1"
//               value={sentence1}
//               onChange={(e) => setSentence1(e.target.value)}
//               rows={4}
//             />
//           </div>
//         </label>
//         <label htmlFor="translation" className="form-label">
//           <div className={s.title}>
//             Phrase 2:
//           </div>
//           <div className={s.textareaContainer}>
//             <textarea
//               className={s.textarea}
//               id="sentence2"
//               value={sentence2}
//               onChange={(e) => setSentence2(e.target.value)}
//               rows={4}
//             />
//           </div>
//         </label>
//         <label htmlFor="translation" className="form-label">
//           <div className={s.title}>
//             Phrase 3:
//           </div>
//           <div className={s.textareaContainer}>
//             <textarea
//               className={s.textarea}
//               id="sentence3"
//               value={sentence3}
//               onChange={(e) => setSentence3(e.target.value)}
//               rows={4}
//             />
//           </div>
//         </label>

//         <br />
//         <div className={s.textareaContainer}>
//           <button type="submit" className="btn btn-primary">
//             Ajouter
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }

// export default AddForm

//--------------------Word English and French separated
//Manière traditionnelle
import React, { useState } from 'react'
import s from "./style.module.css"
import { PodcastAPI } from '../../../../api/podcast-api';
import { useSelector } from 'react-redux';
import { CardAPI } from '../../../../api/card-api';
import { useNavigate } from 'react-router-dom';
function AddForm({list, setList, setShowForm}) {
  const adminToken = useSelector(store => store.ADMIN.token)
    const [wordEnglish, setWordEnglish] = useState("");
    const [wordFrench, setWordFrench] = useState("");
    const [level, setLevel] = useState("A1");
    const [sentence1, setSentence1] = useState();
    const [sentence2, setSentence2] = useState();
    const [sentence3, setSentence3] = useState();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const sentenceArray=[]
        if(sentence1) {
          sentenceArray.push(sentence1)
        }
        if(sentence2) {
          sentenceArray.push(sentence2)
        }
        if(sentence3) {
          sentenceArray.push(sentence3)
        }
        var newItem = {wordEnglish, wordFrench, level, sentenceArray };
        CardAPI.create(newItem, adminToken)
        .then((id) => {
            const newList = [{ _id:id, ...newItem }, ...list];
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
        <label htmlFor="wordEnglish" className="form-label">
          <div className={s.title}>
            Mot anglais: 
          </div>
          <div className={s.textareaContainer}>
            <textarea
              className={s.textarea}
              id="wordEnglish"
              value={wordEnglish}
              onChange={(e) => setWordEnglish(e.target.value)}
              required
            />
          </div>
        </label>
        <br />
        <label htmlFor="wordFrench" className="form-label">
          <div className={s.title}>
            Mot français:
          </div>
          <div className={s.textareaContainer}>
            <textarea
              className={s.textarea}
              id="wordFrench"
              value={wordFrench}
              onChange={(e) => setWordFrench(e.target.value)}
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
        </label>
        <br />

        <label htmlFor="sentence1" className="form-label">
          <div className={s.title}>
            Phrase 1:
          </div>
          <div className={s.textareaContainer}>
            <textarea
              className={s.textarea}
              id="sentence1"
              value={sentence1}
              onChange={(e) => setSentence1(e.target.value)}
              rows={4}
            />
          </div>
        </label>
        <label htmlFor="sentence2" className="form-label">
          <div className={s.title}>
            Phrase 2:
          </div>
          <div className={s.textareaContainer}>
            <textarea
              className={s.textarea}
              id="sentence2"
              value={sentence2}
              onChange={(e) => setSentence2(e.target.value)}
              rows={4}
            />
          </div>
        </label>
        <label htmlFor="sentence3" className="form-label">
          <div className={s.title}>
            Phrase 3:
          </div>
          <div className={s.textareaContainer}>
            <textarea
              className={s.textarea}
              id="sentence3"
              value={sentence3}
              onChange={(e) => setSentence3(e.target.value)}
              rows={4}
            />
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
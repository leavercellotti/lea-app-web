// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import s from "./style.module.css";
// function Filter({ podcastList, podcastLikedList, podcastListenedList, podcastLikedAndListenedList, allPodcastList, setPodcastList, setLevel }) {
//     const [isLikedSelected, setIsLikedSelected] = useState(false)
//     const [isListenedSelected, setIsListenedSelected] = useState(false)
//     const [selectedValue, setSelectedValue] = useState('');

//     const options = ['Tout', 'Débutant', 'Intermédiaire', 'Avancé'];

//     const handleSelectChange = (event) => {
//         const selectedOption = event.target.value;
//         if(selectedOption === "Débutant") {
//             setLevel(1)
//         }
//         else if(selectedOption === "Intermédiaire") {
//             setLevel(2)
//         }
//         else if(selectedOption === "Avancé") {
//             setLevel(3)
//         }
//         else {
//             setLevel(null)
//         }
//         setIsLikedSelected(false)
//         setIsListenedSelected(false)
//         // Appeler votre fonction avec l'option sélectionnée
        
    
//         // Mettre à jour l'état avec l'option sélectionnée
//         setSelectedValue(selectedOption);
//       };
//     function likedHandler() {
//         if(isListenedSelected && isLikedSelected){
//             setPodcastList(podcastListenedList)
//         }
//         else if(isListenedSelected && !isLikedSelected){
//             setPodcastList(podcastLikedAndListenedList)
//         }
//         else if(!isListenedSelected && isLikedSelected){
//             setPodcastList(allPodcastList)
//         }
//         else {
//             setPodcastList(podcastLikedList)
//         }
//         setIsLikedSelected(!isLikedSelected)
//     }
//     function listenedHandler() {
//         if(isListenedSelected && isLikedSelected){
//             setPodcastList(podcastLikedList)
//         }
//         else if(isListenedSelected && !isLikedSelected){
//             setPodcastList(allPodcastList)
//         }
//         else if(!isListenedSelected && isLikedSelected){
//             setPodcastList(podcastLikedAndListenedList)
//         }
//         else {
//             setPodcastList(podcastListenedList)
//         }
//         setIsListenedSelected(!isListenedSelected)
//     }

//   return (
//     <div className='options'>
//       <select 
//         className={`${s.dropdown} btnSpace`}
//         id="dropdown" value={selectedValue} onChange={handleSelectChange}>
//         <option value="">Niveau...</option>
//         {options.map((option, index) => (
//           <option key={index} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//       <button 
//         onClick={likedHandler}
//         className={isLikedSelected? 'btn-selected btnSpace' : 'btn btnSpace'}
//         >
//       Vos Favoris
//       </button>
//       <button 
//         onClick={listenedHandler}
//         className={isListenedSelected? 'btn-selected btnSpace' : 'btn btnSpace'}
//     >
//       Déjà écoutés
//       </button>
//     </div>
//   );
// }

// export default Filter;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import s from "./style.module.css";
function Filter({ podcastList, podcastLikedList, podcastListenedList, podcastLikedAndListenedList, allPodcastList, setPodcastList, setLevel }) {
    const [isLikedSelected, setIsLikedSelected] = useState(false)
    const [isListenedSelected, setIsListenedSelected] = useState(false)
    const [selectedValue, setSelectedValue] = useState('');

    const options = ['Tout', 'Débutant', 'Intermédiaire', 'Avancé'];

    const handleSelectChange = (event) => {
        const selectedOption = event.target.value;
        if(selectedOption === "Débutant") {
            setLevel(1)
        }
        else if(selectedOption === "Intermédiaire") {
            setLevel(2)
        }
        else if(selectedOption === "Avancé") {
            setLevel(3)
        }
        else {
            setLevel(null)
        }
        setIsLikedSelected(false)
        setIsListenedSelected(false)
        // Appeler votre fonction avec l'option sélectionnée
        
    
        // Mettre à jour l'état avec l'option sélectionnée
        setSelectedValue(selectedOption);
      };
    function likedHandler() {
        if(isListenedSelected && isLikedSelected){
            setPodcastList(podcastListenedList)
        }
        else if(isListenedSelected && !isLikedSelected){
            setPodcastList(podcastLikedAndListenedList)
        }
        else if(!isListenedSelected && isLikedSelected){
            setPodcastList(allPodcastList)
        }
        else {
            setPodcastList(podcastLikedList)
        }
        setIsLikedSelected(!isLikedSelected)
    }
    function listenedHandler() {
        if(isListenedSelected && isLikedSelected){
            setPodcastList(podcastLikedList)
        }
        else if(isListenedSelected && !isLikedSelected){
            setPodcastList(allPodcastList)
        }
        else if(!isListenedSelected && isLikedSelected){
            setPodcastList(podcastLikedAndListenedList)
        }
        else {
            setPodcastList(podcastListenedList)
        }
        setIsListenedSelected(!isListenedSelected)
    }

  return (
    <div className='options'>
      <select 
        className={`${s.dropdown} btnSpace`}
        id="dropdown" value={selectedValue} onChange={handleSelectChange}>
        <option value="">Niveau...</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      
      <label htmlFor="likedCheckbox" className={s.checkboxLabel}>Vos Favoris</label>
      <input
          type="checkbox"
          id="likedCheckbox"
          checked={isLikedSelected}
          onChange={likedHandler}
          className={s.checkboxInput}
      />
      <label htmlFor="listenedCheckbox" className={s.checkboxLabel}>Déjà écoutés</label>
      <input
          type="checkbox"
          id="listenedCheckbox"
          checked={isListenedSelected}
          onChange={listenedHandler}
          className={s.checkboxInput}
      />
    </div>
  );
}

export default Filter;
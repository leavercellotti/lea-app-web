// import React from 'react';
// import icon from '../../../../assets/icon.png';
// import { AiFillSound } from "react-icons/ai";
// import s from "./style.module.css"; // Assurez-vous que le chemin du fichier de styles est correct

// function Card({ card, recto, toggleRecto }) {
//   const speakWord = (event) => {
//     const synth = window.speechSynthesis;
//     const utterance = new SpeechSynthesisUtterance(card.wordEnglish);

//     // Spécifiez la langue (en-GB pour l'anglais britannique)
//     utterance.lang = 'en-GB';
    
//     synth.speak(utterance);

//     event.stopPropagation();
//   };
//   return (
//     <div 
//       className={`${s.container} ${recto ? s.recto : s.verso}`}
//       onClick={toggleRecto}
//     >
//       <img src={icon} alt="" className={s.icon} />
//       {recto ?
//         (<div className={`${s.centeredContent} ${s.text}`}>
//           <p>{card &&
//             // <span style={{ color: card.knowledge === true ? 'green' : card.knowledge === false ? 'red' : '#28356B' }}>
//             card.wordFrench
//           // </span>
//           }</p>
//         </div>)
//         :
//         (<div className={`${s.centeredContent} ${s.text}`}>
//           <p>
//             {card && 
//             // <span style={{ color: card.knowledge === true ? 'green' : card.knowledge === false ? 'red' : '#28356B' }}>
//               card.wordEnglish
//             // </span>
//             }
//           </p>
//           <div 
//             onClick={speakWord}
//             className={s.y}>
//             <AiFillSound 
//               className={s.soundIcon} 
//               size={30} 
//                />
//           </div>
//         </div>)
//       }
//       <img src={icon} alt="" className={s.icon2} />
//     </div>
//   );
// }

// export default Card;

import React from 'react';
import icon from '../../../../assets/icon.png';
import { AiFillSound } from "react-icons/ai";
import s from "./style.module.css"; // Assurez-vous que le chemin du fichier de styles est correct

function Card({ card, recto, toggleRecto }) {
  const speakWord = (event) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(card.wordEnglish);

    // Spécifiez la langue (en-GB pour l'anglais britannique)
    utterance.lang = 'en-GB';
    
    synth.speak(utterance);
  };

  const handleIconClick = (event) => {
    speakWord(event);
    event.stopPropagation();
  };

  return (
    <div 
      className={`${s.container} ${recto ? s.recto : s.verso}`}
       onClick={toggleRecto}
    >
      <img src={icon} alt="" className={s.icon} />
      {recto ?
        (<div className={`${s.centeredContent} ${s.text}`}>
          <p>{card &&
            // <span style={{ color: card.knowledge === true ? 'green' : card.knowledge === false ? 'red' : '#28356B' }}>
            card.wordFrench
          // </span>
          }</p>
        </div>)
        :
        (<div className={`${s.centeredContent} ${s.text}`}>
          <p>
            {card && 
            // <span style={{ color: card.knowledge === true ? 'green' : card.knowledge === false ? 'red' : '#28356B' }}>
              card.wordEnglish
            // </span>
            }
          </p>
          <div 
            onClick={handleIconClick}
            className={s.y}>
            <AiFillSound 
              className={s.soundIcon} 
              size={30} 
               />
          </div>
        </div>)
      }
      <img src={icon} alt="" className={s.icon2} />
    </div>
  );
}

export default Card;


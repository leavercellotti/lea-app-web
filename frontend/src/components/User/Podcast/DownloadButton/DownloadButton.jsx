import React from 'react';
import html2pdf from 'html2pdf.js';
import { useDispatch, useSelector } from 'react-redux';
import { addNbDownloadedPodcastsToday } from '../../../../store/user-slice';
import { UserAPI } from '../../../../api/user-api';

function DownloadButton({ title, link, transcription, translation, downloadItems, btnText }) {
  const subscription = useSelector(store => store.USER.subscription);
  const nbDownloadedPodcastsToday = useSelector(store => store.USER.nbDownloadedPodcastsToday);
  const userId = useSelector(store => store.USER._id);
  const token = useSelector(store => store.USER.token);
  const dispatch = useDispatch();

  const updateNbDownloadedPodcastsToday = async () => {
    try {
      await UserAPI.updateNbDownloadedPodcastsToday(token, userId);
      dispatch(addNbDownloadedPodcastsToday());
    } catch (error) {
      console.error("Error fetching podcasts:", error);
    }
  };

  const downloadFiles = async () => {
    // Trigger download for audio
    if (subscription === "free" && nbDownloadedPodcastsToday >= 1) {
      alert("Le nombre de téléchargements est limité à un par jour dans la version gratuite.");
    } else if (subscription === "paid" && nbDownloadedPodcastsToday >= 5) {
      alert("Le nombre de téléchargements est limité à trois par jour.");
    } else {
      try {
        // Télécharger la transcription
        if (downloadItems === "all" || downloadItems === "pdf") {
          generatePdf();
        }

        // Télécharger le fichier audio
        if (downloadItems === "all" || downloadItems === "audio") {
          downloadAudio();
        }

        updateNbDownloadedPodcastsToday();
      } catch (error) {
        console.error('Erreur lors du téléchargement du fichier :', error);
      }
    }
  };

  function htmlToPdf(html) {
    return new Promise((resolve) => {
      html2pdf(html, {
        autoPaging: 'text',
        margin: 20,
        filename: `${title}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        callback: (pdf) => {
          resolve(pdf.output('blob'));
        },
      });
    });
  }

  async function generatePdf() {
    const content = `
      <html>
        <head>
          <style>
            body {
              margin: 20px;
              page-break-inside: avoid;
            }
            .transcription {
              margin-bottom: 50px;
            }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <div class="transcription">${transcription}</div>
          
          <h1>Translation</h1>
          <div>${translation}</div>
        </body>
      </html>
    `;

    const transcriptionPdf = await htmlToPdf(content);
    const transcriptionBlob = new Blob([transcriptionPdf], { type: 'text/plain' });
    const transcriptionDownloadLink = document.createElement('a');
    transcriptionDownloadLink.href = URL.createObjectURL(transcriptionBlob);
    transcriptionDownloadLink.download = 't.pdf';
    transcriptionDownloadLink.click();
  }

  const downloadAudio = async () => {
    try {
      // Récupérer le contenu du fichier audio à partir du lien
      const response = await fetch(link);
      const audioBlob = await response.blob();
  
      // Créer un objet URL pour le blob audio
      const audioUrl = URL.createObjectURL(audioBlob);
  
      // Créer un lien de téléchargement et déclencher le téléchargement
      const audioDownloadLink = document.createElement('a');
      audioDownloadLink.href = audioUrl;
      audioDownloadLink.download = `${title}.mp3`;
      audioDownloadLink.click();
    } catch (error) {
      console.error('Erreur lors du téléchargement du fichier audio :', error);
    }
  };  

  return (
    <>
      <button className='btn btnSpace' onClick={downloadFiles}>
        {btnText}
      </button>
    </>
  );
}

export default DownloadButton;

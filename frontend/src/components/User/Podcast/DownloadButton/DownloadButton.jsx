import React from 'react'

import html2pdf from 'html2pdf.js';

function getDriveFileId(link) {
    // Vérifier si link est défini avant d'essayer de faire correspondre l'expression régulière
    if (link && typeof link === 'string') {
        const fileIdMatch = link.match(/\/file\/d\/(.+?)\/(?:view|\?usp=sharing|$)/);
        if (fileIdMatch) {
        return fileIdMatch[1];
        }
    }
    return null;
}
function constructDriveDownloadLink(fileId) {//on modifie le lien partagé de google drive pour qu'il ait le bon format
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

function DownloadButton({title, link, transcription, translation, downloadItems, btnText}) {
  const fileId = getDriveFileId(link);
  const downloadLink = fileId ? constructDriveDownloadLink(fileId) : '';
  const downloadFiles = async () => {
    // Trigger download for audio
    try {
      // Télécharger la transcription
      if(downloadItems === "all" || downloadItems === "pdf") {
        generatePdf()
        }

      // Simuler le clic du lien de téléchargement
      if(downloadItems === "all" || downloadItems === "audio") {
        const downloadLinkElement = document.getElementById('downloadLink');
        if (downloadLinkElement) {
            downloadLinkElement.click();
        }
        }
    } 
    catch (error) {
    console.error('Erreur lors du téléchargement du fichier :', error);
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
    // Fonction pour convertir le HTML en PDF
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
  return (
    <>
        <a 
            id="downloadLink" 
            href={downloadLink} 
            download="audio.mp3" 
            style={{ display: 'none' }}
            >
            Télécharger le fichier audio
        </a>
        <button className='btn btnSpace' onClick={downloadFiles}>
            {btnText}
        </button>
    </>
  )
}

export default DownloadButton
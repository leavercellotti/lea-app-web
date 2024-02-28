import React from 'react';
import pdfFile from '../../../../assets/Test.pdf';

function PDF() {
  return (
    <div style={{width:"95%"}}>
      {/* <object
        data={pdfFile}
        type="application/pdf"
        width="100%"
        height="600px"
      >
        <p>Le lecteur PDF ne peut pas afficher ce document.</p>
      </object> */}
        <iframe src={pdfFile} width="100%" height="550px" />
    </div>
  );
}

export default PDF;

import React from 'react';
import pdfFile from '../../../../assets/Test.pdf';
import Test1 from "../../../../assets/Tests de langue-1.png"
import Test2 from "../../../../assets/Tests de langue-2.png"
import Test3 from "../../../../assets/Tests de langue-3.png"
import Test4 from "../../../../assets/Tests de langue-4.png"
import Test5 from "../../../../assets/Tests de langue-5.png"
import Test6 from "../../../../assets/Tests de langue-6.png"
import Test7 from "../../../../assets/Tests de langue-7.png"
import s from "./style.module.css"

function PDF() {
  return (
    <div style={{width:"95%", marginTop:"50px", textAlign:"center"}}>
        <p>
        Consultez ci-dessous le test complet ainsi que ses solutions.
        </p>
      {/* <object
        data={pdfFile}
        type="application/pdf"
        width="100%"
        height="600px"
      >
        <p>Le lecteur PDF ne peut pas afficher ce document.</p>
      </object> */}
        {/* <iframe src={pdfFile} width="100%" height="800px" /> */}
        <img className={s.img} src={Test1} alt=""/>
        <img className={s.img} src={Test2} alt=""/>
        <img className={s.img} src={Test3} alt=""/>
        <img className={s.img} src={Test4} alt=""/>
        <img className={s.img} src={Test5} alt=""/>
        <img className={s.img} src={Test6} alt=""/>
        <img className={s.img} src={Test7} alt=""/>
    </div>
  );
}

export default PDF;

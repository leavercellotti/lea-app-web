import React, { useState, useEffect } from 'react';
import { FiLoader } from 'react-icons/fi';
import s from "./style.module.css"
const Loader = () => {
  return (
    <div style={{ textAlign: 'center', paddingTop: '20px' }}>
        <FiLoader size={50} className={s.loaderSpin} />
    </div>
  );
};

export default Loader;

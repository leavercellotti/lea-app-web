import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from "react-router-dom"
/*import {Provider} from "react-redux"
import {store} from "./store"*/
/*import { PageNotFound } from './pages/PageNotFound/PageNotFound'*/
import Home from './pages/User/Home/Home';
import Podcast from './pages/User/Podcast/Podcast';
import Test from './pages/User/Test/Test'; 
import Vocabulary from './pages/User/Vocabulary/Vocabulary';
import AI from './pages/User/AI/AI';
import Profile from './pages/User/Profile/Profile';
import VocabularyRevise from './pages/User/VocabularyRevise/VocabularyRevise';
import Login from './pages/User/Login/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /*<Provider store={store}>*/
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          
          <Route path='/' element={<Home/>}/>
          <Route path='/podcast' element={<Podcast/>}/>
          <Route path='/test' element={<Test/>}/>
          <Route path='/vocabulary' element={<Vocabulary/>}/>
          <Route path='/revise' element={<VocabularyRevise/>}/>
          <Route path='/ai' element={<AI/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/login' element={<Login/>}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  /*</Provider>*/
);
/*<Route path='*' element={<PageNotFound/>} />*/
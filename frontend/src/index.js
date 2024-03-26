import React from 'react';
import ReactDOM from 'react-dom/client';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Provider} from "react-redux"
import {store} from "./store"
import Home from './pages/User/Home/Home';
import Podcast from './pages/User/Podcast/Podcast';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Test from './pages/User/Test/Test'; 
import Vocabulary from './pages/User/Vocabulary/Vocabulary';
import AI from './pages/User/AI/AI';
import Profile from './pages/User/Profile/Profile';
import VocabularyRevise from './pages/User/VocabularyRevise/VocabularyRevise';
import Login from './pages/User/Login/Login';
import Podcasts from './pages/User/Podcasts/Podcasts';
import AdminPodcasts from './pages/Admin/AdminPodcasts/AdminPodcasts';
import AdminLogin from './pages/Admin/AdminLogin/AdminLogin';
import AdminVocabulary from './pages/Admin/AdminVocabulary/AdminVocabulary';
import AdminAI from './pages/Admin/AdminAI/AdminAI';
import AdminTest from './pages/Admin/AdminTest/AdminTest';
import AdminUsers from './pages/Admin/AdminUsers/AdminUsers';
import SuccessCheckout from './pages/User/SuccessCheckout/SuccessCheckout';
import Subscription from './pages/User/Subscription/Subscription';
import FreeTrial from './pages/User/FreeTrial/FreeTrial';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/podcasts' element={<Podcasts/>}/>
          <Route path='/podcasts/:level' element={<Podcasts/>}/>
          <Route path='/podcast/:_id/:selectedLevel' element={<Podcast/>}/>
          <Route path='/test' element={<Test/>}/>
          <Route path='/vocabulary' element={<Vocabulary/>}/>
          <Route path='/revise' element={<VocabularyRevise/>}/>
          <Route path='/ai' element={<AI/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/free-trial' element={<FreeTrial/>}/>
          <Route path='/checkout-success/:sessionId' element={<SuccessCheckout/>}/>
          <Route path='/subscription' element={<Subscription/>}/>
          <Route path='/jgieojoergj0replj-podcasts' element={<AdminPodcasts/>}/>
          <Route path='/jgieojoergj0replj' element={<AdminLogin/>}/>
          <Route path='/jgieojoergj0replj-vocabulary' element={<AdminVocabulary/>}/>
          <Route path='/jgieojoergj0replj-ai' element={<AdminAI/>}/>
          <Route path='/jgieojoergj0replj-test' element={<AdminTest/>}/>
          <Route path='/jgieojoergj0replj-users' element={<AdminUsers/>}/>
        </Route>
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
/*<Route path='*' element={<PageNotFound/>} />*/
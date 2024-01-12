import { Outlet  } from 'react-router-dom';
import './App.css';
import Nav from './components/User/Menu/Nav/Nav';
import AdminNav from './components/Admin/Menu/Nav/AdminNav';
import { useDispatch, useSelector } from 'react-redux';
import Login from './pages/User/Login/Login';
import { useEffect, useState } from 'react';
import { setUser } from './store/user-slice';
import AdminLogin from './pages/Admin/AdminLogin/AdminLogin';
import { setTokenAdmin } from "./store/admin-slice"

function App() {
  const currentPath = window.location.pathname;
  console.log("Chemin de l'URL :", currentPath);

  const dispatch = useDispatch()
  // const adminToken2 = useSelector(store => store.ADMIN.token)
  const [token, setToken] = useState()
  const [adminToken, setAdminToken] = useState()
  
  useEffect(() => {
    const data = localStorage.getItem('token')
    const parseData = JSON.parse(data)
    if(parseData) {
      console.log("parse" ,parseData)
      setToken(parseData)
    }
    const userData = localStorage.getItem('user-info')
    const userParseData = JSON.parse(userData)
    if(userParseData) {
      dispatch(setUser(userParseData))
    }
    const adminData = localStorage.getItem('admin-token')
    const adminParseData = JSON.parse(adminData)
    if(adminParseData) {
      console.log("parse" ,adminParseData)
      dispatch(setTokenAdmin({token : adminParseData}))
      setAdminToken(adminParseData)
    }

  }, [])

  if((currentPath === "/jgieojoergj0replj" || currentPath ==="/jgieojoergj0replj-podcasts") && !adminToken) {
    console.log("here")
    return <AdminLogin setAdminToken={setAdminToken}/>
  }
  else if (currentPath !== "/jgieojoergj0replj" && !token && !adminToken) {
    console.log("else if")
      return <Login setToken={setToken} />;
    }
  console.log("token", token, "amdin",adminToken)
  return (
    <div className="App">
      {adminToken &&
      <header className="App-header">
          <AdminNav/>
        </header>}
      {token && !adminToken &&
      <header className="App-header">
      <Nav/>
    </header>
      }
      <div className="body">
        <Outlet/>
      </div>
    </div>
  );
}

export default App;

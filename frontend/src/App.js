import { Outlet } from 'react-router-dom';
import './App.css';
import Nav from './components/User/Menu/Nav/Nav';
import AdminNav from './components/Admin/Menu/Nav/AdminNav';
import { useDispatch, useSelector } from 'react-redux';
import Login from './pages/User/Login/Login';
import { useEffect, useState } from 'react';
import { setUser } from './store/user-slice';
function App() {
  const dispatch = useDispatch()
  const [token, setToken] = useState()
  const isConnect = useSelector(store => store.ADMIN.isConnect)
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

  }, [])
  if (!token) {
      return <Login setToken={setToken} />;
    }
  // useEffect(() => {
  //   if (!token) {
  //     return <Login setToken={setToken} />;
  //   }
  // }, [token])
  
  return (
    <div className="App">
      {isConnect?
        (<header className="App-header">
          <AdminNav/>
        </header>)
        :
        (<header className="App-header">
          <Nav/>
        </header>)
      }
      <div className="body">
        <Outlet/>
      </div>
    </div>
  );
}

export default App;

// import { Outlet } from 'react-router-dom';
// import './App.css';
// import Nav from './components/User/Menu/Nav/Nav';
// import AdminNav from './components/Admin/Menu/Nav/AdminNav';
// import { useSelector } from 'react-redux';
// function App() {
//   const isConnect = useSelector(store => store.ADMIN.isConnect)
//   return (
//     <div className="App">
//       {isConnect?
//         (<header className="App-header">
//           <AdminNav/>
//         </header>)
//         :
//         (<header className="App-header">
//           <Nav/>
//         </header>)
//       }
//       <div className="body">
//         <Outlet/>
//       </div>
//     </div>
//   );
// }

// export default App;

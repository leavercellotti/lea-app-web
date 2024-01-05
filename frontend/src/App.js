import { Outlet } from 'react-router-dom';
import './App.css';
import Nav from './components/User/Menu/Nav/Nav';
import AdminNav from './components/Admin/Menu/Nav/AdminNav';
import { useSelector } from 'react-redux';
function App() {
  const isConnect = useSelector(store => store.ADMIN.isConnect)
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

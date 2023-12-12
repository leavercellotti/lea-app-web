import { Outlet } from 'react-router-dom';
import './App.css';
import Nav from './components/User/Menu/Nav/Nav';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav/>
      </header>
      <div className="body">
        <Outlet/>
      </div>
    </div>
  );
}

export default App;

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import AppBarComponent from './components/AppBarComponent';
import Login from './pages/Login';
import Ranking from './pages/Ranking/';
import User from "./pages/User";
import LoginContextProvider from './contexts/LoginContext';



function App() {
  return (
    <div className="App">
        <LoginContextProvider>
          <Router>
            <AppBarComponent />
            <Routes>
              <Route path="/" element={<HomePage></HomePage>} />
              <Route path="/login" element={<Login></Login>} />
              <Route path="/ranking" element={<Ranking></Ranking>} />
              <Route path="/user" element={<User></User>}/>
            </Routes>
          </Router>
        </LoginContextProvider>
    </div>
  );
}

export default App;

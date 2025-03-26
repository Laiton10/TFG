import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer';
import Principal from './components/Principal';
import Login from './components/Login';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = ({user, password}) => {
    setUser(user);
    setPassword(password)
  }

  return(
    <Router>
      <Header user={user}/>
      <Routes>
        <Route path="/" element={<Principal/>}/>
        <Route path="/login" element={<Login handleLogin={handleLogin}/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App

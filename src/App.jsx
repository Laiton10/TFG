import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer';
import Principal from './components/Principal';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
  }

  return(
    <Router>
      <Header user={user}/>
      <Routes>
        <Route path="/" element={<Principal/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App

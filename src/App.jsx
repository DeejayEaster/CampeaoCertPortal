import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Screens/Register';
import Home from './Screens/Home';

function App() {
  return (
    <div className='app w-full flex'>
      <Router>
        <Routes>
          <Route path="/login" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

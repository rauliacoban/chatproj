import React from 'react';
import Navbar from './components/Navbar';
//*
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; 
import ChatCheck from './components/ChatCheck';
import NewChat from './components/NewChat';
//*/

function App() {
  return (
    <>
      <Navbar/>
      <Container className='mw-25 p-5'>
            <Routes>
              <Route path="/login" element={<Login />}/>
              <Route path="/" element={<Home />}/>
              <Route path="/register" element={<Register />}/>
              <Route path="/chat/ws/chat/:roomId" element={<NewChat/>}/>
              <Route path="/chatCheck" element={<ChatCheck/>}/>
            </Routes>
      </Container>
    </>
  );
}

export default App; 
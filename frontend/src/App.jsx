import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

// 🔹 Componente interno que ya puede usar useLocation
function AppContent() {
  const { user, ready } = useContext(AuthContext);
  const location = useLocation();

  // Esperar a que AuthContext cargue datos de localStorage
  if (!ready) return null;

  // 🔸 Mostrar navbar SOLO si el usuario está logueado
  const showNavbar = !!user;

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

// 🔹 El BrowserRouter envuelve todo
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

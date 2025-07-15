import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Home from "../pages/Home"; 
import PerfilUsuario from '../pages/PerfilUsuario';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
         <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/perfil" element={<PerfilUsuario />} />
      </Routes>
    </Router>
  );
};

export default App;

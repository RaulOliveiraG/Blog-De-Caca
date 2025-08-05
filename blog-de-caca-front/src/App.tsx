// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { HomePage } from './pages/HomePage'
import {UserProfile} from './pages/UserProfile'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/perfil" element={<UserProfile />} />
    </Routes>
  )
}

export default App

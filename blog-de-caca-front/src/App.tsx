import { Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { UserProfile } from './pages/UserProfile';
import './App.css';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AppLayout } from './routes/AppLayout';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { PostDetailPage } from './pages/PostDetailPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage'; 
import { SearchPage } from './features/search/components/SearchPage';

function App() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      {/* Grupo de Rotas Protegidas */}
      <Route 
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<HomePage />} />
        <Route path="/perfil" element={<UserProfile />} />
         <Route path="/busca" element={<SearchPage />} /> 
        <Route path="/post/:postId" element={<PostDetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;
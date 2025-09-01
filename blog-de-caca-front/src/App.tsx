import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { UserProfile } from './pages/UserProfile';
import { PostsPage } from './pages/PostPage';
import PostDetailPage from './pages/PostDetailPage';
import NewCommentPage from './pages/NewCommentPage';
import NewPostPage from './pages/NewPostPage'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/perfil" element={<UserProfile />} />

      {/* Lista e detalhe de posts */}
      <Route path="/posts" element={<PostsPage />} />
      <Route path="/posts/novo" element={<NewPostPage />} />
      <Route path="/posts/:id" element={<PostDetailPage />} />

      {/* fallback para rotas desconhecidas */}
      <Route path="*" element={<Navigate to="/posts" replace />} />
      <Route path="/posts/:id/comentar" element={<NewCommentPage />} />
    </Routes>
  );
}

export default App;

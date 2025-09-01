import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Modal } from '../components/Modal';
import { CreatePostForm } from '../components/CreatePostForm';
import './UserProfile.css';
// Supondo que você tenha uma imagem padrão para posts sem imagem
import defaultPostImage from '../assets/img/post_placeholder.jpeg'; 

interface User { id: number; nome: string; email: string; }
interface Post { id: number; titulo: string; texto: string; imagemUrl?: string; autorId: number; }

export function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [myPosts, setMyPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    // Padronizamos a chave para 'accessToken'
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }
    
    // Criamos uma instância do Axios com o cabeçalho padrão para todas as chamadas
    const api = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: { 'Authorization': `Bearer ${token}` }
    });

    try {
      setIsLoading(true);
      // Usamos a instância 'api' que já tem o token
      const [profileResponse, postsResponse] = await Promise.all([
        api.get('/profile'), // Rota correta conforme seu userRoutes.ts
        api.get('/posts')
      ]);

      const userData: User = profileResponse.data;
      // Filtramos os posts do usuário no front-end
      const allPosts: Post[] = postsResponse.data;
      const userPosts = allPosts.filter(post => post.autorId === userData.id);

      setUser(userData);
      setMyPosts(userPosts);
      setError(null);
    } catch (err: any) {
      console.error("Erro ao buscar dados do perfil:", err);
      setError('Falha ao carregar os dados. Sua sessão pode ter expirado.');
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        localStorage.removeItem('accessToken');
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  if (isLoading && !user) {
    return <div className="loading-message">Carregando perfil...</div>;
  }

  if (error) {
    return <div className="error-container"><p>{error}</p><button onClick={() => navigate('/login')}>Ir para Login</button></div>;
  }

  if (!user) {
    return <div>Não foi possível carregar as informações do usuário.</div>;
  }

  return (
    <div className="profile-page-container">
      <header className="home-header">
        <div className="logo">Blog de caça</div>
        <nav className="main-nav">
          <a href="/home">Início</a>
          <a href="/busca">Publicações</a>
          <a href="/perfil">Perfil</a>
        </nav>
        <div className="auth-actions">
          <button onClick={handleLogout} className="btn-login">Sair</button>
        </div>
      </header>

      <main className="profile-main-content">
        <section className="profile-info-card">
          <div className="profile-details">
            <h1>{user.nome}</h1>
            <p>{user.email}</p>
          </div>
          <button onClick={() => setIsModalOpen(true)} className="btn-create-post">
            + Criar Novo Post
          </button>
        </section>

        <section className="my-posts-section">
          <h2>MEUS POSTS</h2>
          {/* --- LÓGICA DE RENDERIZAÇÃO DOS POSTS --- */}
          <div className="posts-grid">
            {myPosts.length > 0 ? (
              myPosts.map(post => (
                <div key={post.id} className="post-card">
                  <img src={post.imagemUrl || defaultPostImage} alt={post.titulo} />
                  <div className="post-content">
                    <h4>{post.titulo}</h4>
                    <p>{post.texto.substring(0, 100)}...</p>
                  </div>
                  <Link to={`/post/${post.id}`} className="arrow-link">➔</Link>
                </div>
              ))
            ) : (
              <p>Você ainda não criou nenhum post.</p>
            )}
          </div>
        </section>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreatePostForm 
          onClose={() => setIsModalOpen(false)}
          onPostCreated={fetchData} // Recarrega os dados após criar um post
        />
      </Modal>

      <footer className="site-footer">© 2025 Blog de caça</footer>
    </div>
  );
}
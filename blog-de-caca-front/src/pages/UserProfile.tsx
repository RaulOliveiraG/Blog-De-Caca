import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../components/Modal';
import { CreatePostForm } from '../components/CreatePostForm';
import { EditPostForm } from '../components/EditPostForm'; 
import { useAuth } from '../contexts/useAuth';
import { useUserPosts } from '../hooks/useUserPosts';
import { deletePost, type Post } from '../services/postService';
import './UserProfile.css';
import defaultPostImage from '../assets/img/post_placeholder.jpeg'; 

export function UserProfile() {
  const { user } = useAuth();
  const { posts, isLoading, error, refetch } = useUserPosts(user?.id);
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [selectedPost, setSelectedPost] = useState<Post | null>(null); 

  const handleOpenEditModal = (post: Post) => {
    setSelectedPost(post);
    setIsEditModalOpen(true);
  };

  const handleDeletePost = async (postId: number) => {
    if (window.confirm('Tem certeza que deseja excluir este post? Esta ação não pode ser desfeita.')) {
      try {
        await deletePost(postId);
        refetch(); 
      } catch (err) {
        console.error("Erro ao deletar post:", err);
        alert('Não foi possível excluir o post.');
      }
    }
  };

  if (!user) {
    return <div>Carregando informações do usuário...</div>;
  }

  return (
    <div className="profile-page-container">
      <main className="profile-main-content">
        <section className="profile-info-card">
          <div className="profile-details">
            <h1>{user.nome}</h1>
            <p>{user.email}</p>
          </div>
          <button onClick={() => setIsCreateModalOpen(true)} className="btn-create-post">
            + Criar Novo Post
          </button>
        </section>

        <section className="my-posts-section">
          <h2>MEUS POSTS</h2>
          {!isLoading && !error && (
            <div className="posts-grid">
              {posts.map(post => (
                <div key={post.id} className="post-card">
                  <img src={post.imagemUrl || defaultPostImage} alt={post.titulo} />
                  <div className="post-content">
                    <h4>{post.titulo}</h4>
                    <p>{post.texto.substring(0, 100)}...</p>
                    {/* --- MODIFICAÇÃO AQUI --- */}
                    <div className="post-actions">
                      <button onClick={() => handleOpenEditModal(post)}>Editar</button>
                      <button onClick={() => handleDeletePost(post.id)}>Excluir</button>
                    </div>
                  </div>
                  <Link to={`/post/${post.id}`} className="arrow-link">➔</Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
        <CreatePostForm 
          onClose={() => setIsCreateModalOpen(false)}
          onPostCreated={() => { refetch(); setIsCreateModalOpen(false); }}
        />
      </Modal>

      {selectedPost && (
        <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
          <EditPostForm 
            post={selectedPost}
            onClose={() => setIsEditModalOpen(false)}
            onPostUpdated={() => { refetch(); setIsEditModalOpen(false); }}
          />
        </Modal>
      )}
    </div>
  );
}
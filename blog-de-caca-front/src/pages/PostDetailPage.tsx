import { useParams, Link } from 'react-router-dom';
import { usePost } from '../hooks/usePost';
import { Reactions } from '../features/reactions/Reactions';
import './PostDetailPage.css';
import defaultPostImage from '../assets/img/post_placeholder.jpeg';
import { CommentsSection } from '../features/comments/components/CommentsSection';

export function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  
  const { post, isLoading, error, handleReaction, handleRemoveReaction } = usePost(postId);

  if (isLoading) {
    return <div className="loading-message">Carregando post...</div>;
  }

  if (error) {
    return <div className="error-container"><p>{error}</p><Link to="/home">Voltar para a Home</Link></div>;
  }

  if (!post) {
    return <div className="error-container"><p>Post não encontrado.</p><Link to="/home">Voltar para a Home</Link></div>;
  }

  return (
    <> 
      <div className="post-detail-container">
        <h1 className="post-detail-title">{post.titulo}</h1>
        <p className="post-detail-meta">
          Por {post.autor.nickname} em {new Date(post.dataPublicacao).toLocaleDateString()}
        </p>
        <img 
          src={post.imagemUrl || defaultPostImage} 
          alt={post.titulo} 
          className="post-detail-image" 
        />
        <div className="post-detail-content">
          {post.texto}
        </div>
        <Reactions 
          post={post} 
          onReact={handleReaction} 
          onRemoveReaction={handleRemoveReaction} 
        />
      </div>
      
      {postId && <CommentsSection postId={postId} />}
    </>
  );
}
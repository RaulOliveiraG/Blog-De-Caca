import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import './HomePage.css';
import defaultPostImage from '../assets/img/post_placeholder.jpeg';

export function HomePage() {
  const { posts, isLoading, error } = usePosts();

  return (
    <div className="home-page-container">
      <section className="hero-section">
      </section>
      <section className="story-section">
      </section>
      
      <section className="latest-posts">
        <h2>ÚLTIMOS POSTS</h2>
        
        {isLoading && <p>Carregando posts...</p>}
        
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {!isLoading && !error && (
          <div className="posts-grid">
            {posts.length > 0 ? (
              posts.map(post => (
                <div key={post.id} className="post-card">
                  <img src={post.imagemUrl || defaultPostImage} alt={post.titulo} />
                  <div className="post-content">
                    <h4>{post.titulo}</h4>
                    <p>{post.texto.substring(0, 100)}...</p>
                    <small>Por: {post.autor.nickname}</small>
                  </div>
                  <Link to={`/post/${post.id}`} className="arrow-link">➔</Link>
                </div>
              ))
            ) : (
              <p>Nenhum post encontrado.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
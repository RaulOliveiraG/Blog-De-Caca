import { useState, useEffect } from 'react';
import { getAllPosts, type Post } from '../services/postService';

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        const fetchedPosts = await getAllPosts();
        setPosts(fetchedPosts);
        setError(null);
      } catch (err) {
        console.error('Falha ao buscar posts:', err);
        setError('Não foi possível carregar os posts.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []); 

  return { posts, isLoading, error };
}
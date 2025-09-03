import { useState, useEffect, useCallback } from 'react';
import { getPostsByAuthorId, type Post } from '../services/postService';

export function useUserPosts(userId: number | undefined) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserPosts = useCallback(async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const fetchedPosts = await getPostsByAuthorId(userId);
      setPosts(fetchedPosts);
      setError(null);
    } catch (err) {
      console.error('Falha ao buscar posts do usuário:', err);
      setError('Não foi possível carregar os posts.');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserPosts();
  }, [fetchUserPosts]);

  return { posts, isLoading, error, refetch: fetchUserPosts };
}
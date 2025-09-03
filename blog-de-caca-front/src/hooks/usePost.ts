import { useState, useEffect } from 'react';
import { getPostById, addOrUpdateReaction, removeReaction, type Post, type ReactionType } from '../services/postService';

export function usePost(postId: string | undefined) {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost(id: string) {
      try {
        const fetchedPost = await getPostById(id);
        setPost(fetchedPost);
        setError(null);
      } catch (err) {
        console.error(`Falha ao buscar o post ${id}:`, err);
        setError('Não foi possível carregar o post. Ele pode não existir.');
      } finally {
        setIsLoading(false);
      }
    }
    if (postId) {
      setIsLoading(true);
      fetchPost(postId);
    } else {
      setIsLoading(false);
      setError('ID do post não encontrado na URL.');
    }
  }, [postId]);
 const handleReaction = async (type: ReactionType) => {
    if (!postId || !post) return;
    
    try {
      await addOrUpdateReaction(postId, type);
      const updatedPost = await getPostById(postId);
      setPost(updatedPost);
    } catch (err) {
      console.error("Falha ao adicionar reação:", err);
    }
  };

  const handleRemoveReaction = async () => {
    if (!postId || !post) return;
    try {
      await removeReaction(postId);
      const updatedPost = await getPostById(postId);
      setPost(updatedPost);
    } catch (err) {
      console.error("Falha ao remover reação:", err);
    }
  };

  return { post, isLoading, error, handleReaction, handleRemoveReaction };
}


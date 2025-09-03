import { useState, useEffect, useCallback } from 'react';
import { getCommentsByPostId, createComment, type Comment, type CreateCommentPayload } from '../services/commentService';

export function useComments(postId: string | undefined) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    if (!postId) return;
    try {
      setIsLoading(true);
      const fetchedComments = await getCommentsByPostId(postId);
      setComments(fetchedComments);
    } catch (err) {
      console.error("Falha ao buscar comentários:", err);
      setError('Falha ao carregar comentários.');
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const addComment = async (payload: CreateCommentPayload) => {
    if (!postId) throw new Error("Post ID não encontrado");
    
    await createComment(postId, payload);
    
    await fetchComments();
  };

  return { comments, isLoading, error, addComment };
}
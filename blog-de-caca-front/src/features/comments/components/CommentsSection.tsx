import { useState } from 'react'; 
import { useComments } from '../../../hooks/useComments';
import { Comment } from './Comment';
import { CommentForm } from './CommentForm';
import './Comments.css';

interface CommentsSectionProps {
  postId: string;
}

export function CommentsSection({ postId }: CommentsSectionProps) {
  const { comments, isLoading, error, addComment } = useComments(postId);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const handleAddComment = async (data: { texto: string }, parentId: number | null) => {
    await addComment({ texto: data.texto, parentId: parentId || undefined });
    if (parentId) {
      setReplyingTo(null);
    }
  };

  return (
    <section className="comments-section">
      <h3>Comentários</h3>
      {isLoading && <p>Carregando comentários...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {!isLoading && comments.map(comment => (
        <Comment 
          key={comment.id} 
          comment={comment}
          replyingTo={replyingTo}
          setReplyingTo={setReplyingTo}
          onReplySubmit={handleAddComment}
        />
      ))}

      {!isLoading && comments.length === 0 && <p>Seja o primeiro a comentar!</p>}

      <CommentForm onSubmit={(data) => handleAddComment(data, null)} />
    </section>
  );
}
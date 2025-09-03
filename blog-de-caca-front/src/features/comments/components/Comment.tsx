// --- ARQUIVO: src/features/comments/components/Comment.tsx ---
import type { Comment as CommentType } from '../../../services/commentService';
import { CommentForm } from './CommentForm';
import defaultAvatar from '../../../assets/img/post_placeholder.jpeg';
import './Comments.css';

interface CommentProps {
  comment: CommentType;
  replyingTo: number | null;
  setReplyingTo: (id: number | null) => void;
  onReplySubmit: (data: { texto: string }, parentId: number | null) => Promise<void>;
}

export function Comment({ comment, replyingTo, setReplyingTo, onReplySubmit }: CommentProps) {
  const isReplying = replyingTo === comment.id;

  return (
    <div className="comment-wrapper">
      <img 
        src={comment.autor.foto_perfil || defaultAvatar} 
        alt={comment.autor.nickname} 
        className="comment-avatar"
      />
      <div className="comment-content">
        <div className="comment-header">
          <span className="comment-author">{comment.autor.nickname}</span>
          <span className="comment-date">
            {new Date(comment.dataCriacao).toLocaleDateString()}
          </span>
        </div>
        <p className="comment-text">{comment.texto}</p>
        
        <button className="reply-button" onClick={() => setReplyingTo(isReplying ? null : comment.id)}>
          {isReplying ? 'Cancelar' : 'Responder'}
        </button>

        {isReplying && (
          <div className="reply-form-container">
            <CommentForm onSubmit={(data) => onReplySubmit(data, comment.id)} />
          </div>
        )}
        
        {comment.replies && comment.replies.length > 0 && (
          <div className="comment-replies">
            {comment.replies.map(reply => (
              <Comment 
                key={reply.id} 
                comment={reply} 
                replyingTo={replyingTo}
                setReplyingTo={setReplyingTo}
                onReplySubmit={onReplySubmit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
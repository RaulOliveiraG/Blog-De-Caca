import type { Post, ReactionType } from '../../services/postService';
import './Reactions.css';

interface ReactionsProps {
  post: Post;
  onReact: (type: ReactionType) => void;
  onRemoveReaction: () => void;
}

const REACTION_EMOJIS: Record<ReactionType, string> = {
  LIKE: '👍',
  LOVE: '❤️',
  HAHA: '😂',
  WOW: '😮',
  SAD: '😢',
  ANGRY: '😠',
};

export function Reactions({ post, onReact }: ReactionsProps) {
  return (
    <div className="reactions-container">
      <span className="reaction-count">
        {post._count.reactions} Reações
      </span>
      <div className="reaction-buttons">
        {Object.entries(REACTION_EMOJIS).map(([type, emoji]) => (
          <button 
            key={type} 
            className="reaction-button"
            onClick={() => onReact(type as ReactionType)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
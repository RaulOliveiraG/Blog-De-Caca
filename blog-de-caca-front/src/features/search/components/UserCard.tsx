import type { UserSearchResult } from '../../../services/userService';
import defaultAvatar from '../../../assets/img/post_placeholder.jpeg';

interface UserCardProps {
  user: UserSearchResult;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="user-card">
      <img src={user.foto_perfil || defaultAvatar} alt={user.nome} className="user-card-avatar" />
      <div className="user-card-info">
        <h4>{user.nome}</h4>
        <p>@{user.nickname}</p>
      </div>
    </div>
  );
}
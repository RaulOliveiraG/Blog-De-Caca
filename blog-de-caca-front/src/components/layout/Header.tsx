import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';
import './Header.css';

export function Header() {
  const { isAuthenticated, user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  return (
    <header className="header-container">
      <Link to={isAuthenticated ? "/home" : "/login"} className="header-logo">
        Blog de Caça
      </Link>
      <nav className="header-nav">
        <Link to="/home">Início</Link>
        <Link to="/busca">Busca</Link>
      </nav>
      <div className="header-actions">
        {isAuthenticated ? (
          <>
            <span className="header-user-info">Olá, {user?.nome || 'Caçador'}!</span>
            <Link to="/perfil" className="btn-link">Meu Perfil</Link>
            <button onClick={handleSignOut} className="btn-login">Sair</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-link">Entrar</Link>
            <Link to="/registro" className="btn-link btn-signup">Criar conta</Link>
          </>
        )}
      </div>
    </header>
  );
}
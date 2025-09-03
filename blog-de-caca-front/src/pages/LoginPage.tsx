import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import { AuthLayout } from '../components/layout/AuthLayout';
import './LoginPage.css';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn({ email, senha });
      navigate('/home');
    } catch (err) {
      console.error(err);
      alert('Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <AuthLayout title="Bem-vindo de volta" subtitle="Faça login para continuar sua jornada">
      <h2>LOGIN</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">Entrar</button>
      </form>
      <div className="auth-links">
        <Link to="/forgot-password">Esqueceu a senha?</Link>
        <Link to="/registro">Criar conta</Link>
      </div>
    </AuthLayout>
  );
}
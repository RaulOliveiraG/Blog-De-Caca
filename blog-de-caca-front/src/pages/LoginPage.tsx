import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import backgroundImage from '../assets/img/background.webp'; // Coloque a imagem de fundo na pasta assets
import api from '../lib/api';
import './LoginPage.css';

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await api.post('/login', { email, senha });

      localStorage.setItem('accessToken', res.data.accessToken);
      alert('Login feito com sucesso!')
      navigate('/home')
    } catch (err: any) {
      if (err.response) {
        // Erro do backend
        alert(`Erro: ${err.response.data?.message || JSON.stringify(err.response.data)}`)
      } else if (err.request) {
        // Erro de rede
        alert('Erro de rede ou servidor indisponível.')
      } else {
        // Outro erro
        alert(`Erro desconhecido: ${err.message}`)
      }
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-left">
        <img src={backgroundImage} alt="Caçador na natureza" className="background-image" />
        <div className="welcome-text">
          <h2>Bem-vindo</h2>
          <p>Faça login para acessar sua conta</p>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-form-container">
          <h2>LOGIN</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="email">E-mail:</label>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="input-group">
              <label htmlFor="password">Senha:</label>
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    required
                />
                
            </div>
            <button type="submit" className="auth-button">Entrar</button>
          </form>
          <div className="auth-links">
            <a href="/forgot-password">Esqueceu a senha?</a>
            <a href="/registro">Criar conta</a>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { AxiosError } from 'axios';
import { AuthLayout } from '../components/layout/AuthLayout';
import './LoginPage.css';

interface ApiErrorResponse {
  error?: string;
  message?: string;
}

export function RegisterPage() {
  const [formData, setFormData] = useState({
    nome: '',
    nickname: '',
    cpf: '',
    email: '',
    senha: '',
    confirmar_senha: '',
    numero_telefone: '',
    foto_perfil: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmar_senha) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      const dataToSend = { ...formData };
      delete (dataToSend as { confirmar_senha?: string }).confirmar_senha;
      
      await api.post('/auth/register', dataToSend);

      alert('Usuário criado com sucesso! ✅\nAgora você será redirecionado para fazer o login.');
      navigate('/login');

    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      if (error.response) {
        const errorMessage = error.response.data?.error || error.response.data?.message || JSON.stringify(error.response.data);
        alert(`Erro no cadastro: ${errorMessage}`);
      } else if (error.request) {
        alert('Não foi possível se conectar ao servidor. Verifique sua rede.');
      } else {
        alert(`Ocorreu um erro inesperado: ${error.message}`);
      }
    }
  };

  return (
    <AuthLayout title="Junte-se à Caçada" subtitle="Crie sua conta e explore nosso mundo">
      <h2>CADASTRE-SE</h2>
      <form onSubmit={handleRegister}>
        <div className="input-group">
          <input type="text" name="nome" placeholder="Nome completo *" value={formData.nome} onChange={handleChange} required />
          <input type="text" name="nickname" placeholder="Nickname *" value={formData.nickname} onChange={handleChange} required />
          <input type="text" name="cpf" placeholder="CPF *" value={formData.cpf} onChange={handleChange} required />
          <input type="email" name="email" placeholder="E-mail *" value={formData.email} onChange={handleChange} required />
          <input type="password" name="senha" placeholder="Senha *" value={formData.senha} onChange={handleChange} required />
          <input type="password" name="confirmar_senha" placeholder="Confirmar Senha *" value={formData.confirmar_senha} onChange={handleChange} required />
          <input type="tel" name="numero_telefone" placeholder="Número de telefone (opcional)" value={formData.numero_telefone} onChange={handleChange} />
          <input type="text" name="foto_perfil" placeholder="URL da foto de perfil (opcional)" value={formData.foto_perfil} onChange={handleChange} />
        </div>
        <button type="submit" className="auth-button">Criar conta</button>
      </form>
      <div className="auth-links-register">
        <span>Já tem uma conta? </span>
        <Link to="/login">Entrar</Link>
      </div>
    </AuthLayout>
  );
}
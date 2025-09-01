import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import backgroundImage from '../assets/img/background.png'; // Reutilizando a imagem de fundo
import './LoginPage.css'; // Reutilizando o mesmo CSS

export function RegisterPage() {
  const [formData, setFormData] = useState({
    nome: '',
    nickname: '',
    cpf: '',
    email: '',
    senha: '',
    confirmar_senha: '',
    numero_telefone: '',
    foto_perfil: ''
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validação de senha no front-end
    if (formData.senha !== formData.confirmar_senha) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      // 2. Prepara os dados para enviar (remove a confirmação da senha)
      const { confirmar_senha, ...dataToSend } = formData;
      
      // 3. Envia a requisição POST para a API
     await api.post('/registro', dataToSend);

      alert('Usuário criado com sucesso! ✅\nAgora você será redirecionado para fazer o login.');
      navigate('/login'); // 4. Redireciona para a página de login

    } catch (err: any) {
      // 5. Tratamento de erros
      if (err.response) {
        // Erro retornado pelo backend (ex: usuário já existe, dados inválidos)
        alert(`Erro no cadastro: ${err.response.data?.message || JSON.stringify(err.response.data)}`);
      } else if (err.request) {
        // Erro de comunicação, sem resposta do servidor
        alert('Não foi possível se conectar ao servidor. Verifique sua rede.');
      } else {
        // Outro tipo de erro
        alert(`Ocorreu um erro inesperado: ${err.message}`);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <img src={backgroundImage} alt="Caçador na natureza" className="background-image" />
        <div className="welcome-text">
          <h2>Bem-vindo ao Blog de Caça</h2>
          <p>Cadastre-se para fazer parte</p>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-form-container">
          <h2>CADASTRE-SE</h2>
          <form onSubmit={handleRegister} >
             <div className="input-group">
            {/* Campos obrigatórios */}
            <input type="text" name="nome" placeholder="Nome completo *" value={formData.nome} onChange={handleChange} required />
            <input type="text" name="nickname" placeholder="Nickname *" value={formData.nickname} onChange={handleChange} required />
            <input type="text" name="cpf" placeholder="CPF *" value={formData.cpf} onChange={handleChange} required />
            <input type="email" name="email" placeholder="E-mail *" value={formData.email} onChange={handleChange} required />
            <input type="password" name="senha" placeholder="Senha *" value={formData.senha} onChange={handleChange} required />
            <input type="password" name="confirmar_senha" placeholder="Confirmar Senha *" value={formData.confirmar_senha} onChange={handleChange} required />
            
            {/* Campos opcionais */}
            <input type="tel" name="numero_telefone" placeholder="Número de telefone (opcional)" value={formData.numero_telefone} onChange={handleChange} />
            <input type="text" name="foto_perfil" placeholder="URL da foto de perfil (opcional)" value={formData.foto_perfil} onChange={handleChange} />
            </div>
            <button type="submit" className="auth-button">Criar conta</button>
          </form>
          <div className="auth-links-register">
            <span>Já tem uma conta? </span>
            <a href="/login">Entrar</a>
          </div>
        </div>
      </div>
    </div>
  );
}
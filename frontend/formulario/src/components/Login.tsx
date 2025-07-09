import React, { useState } from "react";
import "./Cadastro.css";
import { enviarLogin } from "../services/loginService";
import { recuperarSenha } from "../services/recuperarSenhaService";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await enviarLogin({ email: formData.email, senha: formData.senha });
      alert("Login realizado com sucesso!");
    } catch (err) {
      alert("Erro ao fazer login. Verifique os dados.");
    }
  };

  const handleEsqueciSenha = async () => {
    try {
      await recuperarSenha("rauloliveiragarcia08@gmail.com");
      alert("Instruções de recuperação enviadas para o e-mail.");
    } catch (err) {
      alert("Erro ao solicitar recuperação de senha.");
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-esquerda">
        <img src="/img/caca.jpg" alt="caçador" />
        <p>
          Bem-vindo de volta ao Blog de caça
          <br />
          Faça login para continuar
        </p>
      </div>
      <div className="cadastro-direita">
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Senha:</label>
          <input
            name="senha"
            type="password"
            value={formData.senha}
            onChange={handleChange}
            required
          />

          <button type="submit">Entrar</button>
          <p className="entrar" style={{ cursor: "pointer" }} onClick={handleEsqueciSenha}>
            Esqueci minha senha
          </p>
        </form>
        <p className="entrar">
          Ainda não tem uma conta? <a href="/cadastro">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

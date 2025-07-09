import React, { useState } from "react";
import "./Cadastro.css";
import { enviarCadastro } from "../services/cadastroService";

const Cadastro: React.FC = () => {
  const [formData, setFormData] = useState({
    nickname: "",
    senha: "",
    confirmarSenha: "",
    cpf: "",
    nome: "",
    email: "",
    numero_telefone: "",
    foto_perfil: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

  
    const jsonBody = {
      nickname: formData.nickname,
      senha: formData.senha,
      cpf: formData.cpf,
      nome: formData.nome,
      email: formData.email,
      numero_telefone: formData.numero_telefone,
      foto_perfil: formData.foto_perfil || "",
    };

    try {
      await enviarCadastro(jsonBody);
      alert("Usuário cadastrado com sucesso!");
      setFormData({
        nickname: "",
        senha: "",
        confirmarSenha: "",
        cpf: "",
        nome: "",
        email: "",
        numero_telefone: "",
        foto_perfil: "",
      });
    } catch (err) {
      alert("Erro ao cadastrar. Verifique os dados.");
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-esquerda">
        <img src="/img/caca.jpg" alt="caçador" />
        <p>
          Bem-vindo ao Blog de caça
          <br />
          Cadastre-se para fazer parte
        </p>
      </div>
      <div className="cadastro-direita">
        <h2>CADASTRE-SE</h2>
        <form onSubmit={handleSubmit}>
          <label>Nickname:</label>
          <input name="nickname" value={formData.nickname} onChange={handleChange} required />

          <label>CPF:</label>
          <input name="cpf" value={formData.cpf} onChange={handleChange} required />

          <label>Nome completo:</label>
          <input name="nome" value={formData.nome} onChange={handleChange} required />

          <label>Email:</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />

          <label>Telefone:</label>
          <input name="numero_telefone" value={formData.numero_telefone} onChange={handleChange} required />

          <label>Senha:</label>
          <input name="senha" type="password" value={formData.senha} onChange={handleChange} required />

          <label>Confirmar senha:</label>
          <input name="confirmarSenha" type="password" value={formData.confirmarSenha} onChange={handleChange} required />

          <label>Link da foto (opcional):</label>
          <input name="foto_perfil" value={formData.foto_perfil} onChange={handleChange} />

          <button type="submit">Criar conta</button>
        </form>
        <p className="entrar">
          Já tem uma conta? <a href="/login">Entrar</a>
        </p>
      </div>
    </div>
  );
};

export default Cadastro;

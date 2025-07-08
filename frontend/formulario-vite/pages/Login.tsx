import React, { useState } from "react";
import { enviarLogin } from "../src/services/loginService";
import { recuperarSenha } from "../src/services/recuperarSenhaService";

import LoginLayout from "../src/components/LoginLayout";
import LoginForm from "../src/components/LoginForm";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    senha: ""
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await enviarLogin({
        email: formData.email,
        senha: formData.senha
      });
      alert("Login realizado com sucesso!");
    } catch {
      alert("Erro ao fazer login. Verifique os dados.");
    }
  };
  const handleEsqueciSenha = async () => {
    if (!formData.email) {
      alert("Preencha o e-mail para recuperar a senha.");
      return;
    }
    try {
      await recuperarSenha(formData.email);
      alert("Instruções de recuperação enviadas para o e-mail.");
    } catch {
      alert("Erro ao solicitar recuperação de senha.");
    }
  };

  return (
    <LoginLayout>
      <LoginForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onForgotPassword={handleEsqueciSenha}
      />
    </LoginLayout>
  );
};

export default Login;
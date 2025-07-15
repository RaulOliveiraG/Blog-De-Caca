import React, { useState } from "react";
import { enviarLogin } from "../src/services/loginService";
import { recuperarSenha } from "../src/services/recuperarSenhaService";
import BannerLateral from "../src/components/BannerLateral";
import FormField from "../src/components/FormField";
import SubmitButton from "../src/components/SubmitButton";

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
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col bg-white min-h-screen p-8">
        <div className="flex flex-col md:flex-row items-start bg-white w-full">
          <BannerLateral
            image="/img/caca.jpg"
            text={
              <>
                Bem-vindo de volta ao Blog de caça
                <br />
                Faça login para continuar
              </>
            }
          />

          <div className="flex flex-col items-start mt-10 mx-auto">
            <h2 className="text-[#00003C] text-[32px] font-bold mb-10 text-center w-full">
              LOGIN
            </h2>

            <FormField
              label="Email:"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemplo@gmail.com"
            />

            <FormField
              label="Senha:"
              name="senha"
              type="password"
              value={formData.senha}
              onChange={handleChange}
            />

            <SubmitButton>Entrar</SubmitButton>

            <p
              className="text-[#00003C] text-center text-xl mt-2 underline cursor-pointer"
              onClick={handleEsqueciSenha}
            >
              Esqueci minha senha
            </p>

            <div className="flex justify-center gap-4 mt-4">
              <span className="text-[#00003C] text-xl">Ainda não tem uma conta?</span>
              <a href="/cadastro" className="text-[#00003C] text-xl underline">
                Cadastre-se
              </a>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
import React, { useState } from "react";
import { enviarCadastro } from "../src/services/cadastroService";
import BannerLateral from "../src/components/BannerLateral";
import FormField from "../src/components/FormField";
import SubmitButton from "../src/components/SubmitButton";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
    confirmarSenha: "",
    nickname: "",
    cpf: "",
    nome: "",
    numero_telefone: "",
    foto_perfil: ""
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
    try {
      await enviarCadastro({
        nickname: formData.nickname,
        senha: formData.senha,
        cpf: formData.cpf,
        nome: formData.nome,
        email: formData.email,
        numero_telefone: formData.numero_telefone,
        foto_perfil: formData.foto_perfil
      });
      alert("Cadastro realizado com sucesso!");
      setFormData({
        email: "",
        senha: "",
        confirmarSenha: "",
        nickname: "",
        cpf: "",
        nome: "",
        numero_telefone: "",
        foto_perfil: ""
      });
    } catch {
      alert("Erro ao cadastrar. Verifique os dados.");
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
            <h2 className="text-[#8A7300] text-[32px] font-bold mb-10 text-center w-full">
              CADASTRE-SE
            </h2>

            <FormField
              label="Nome completo:"
              name="nome"
              type="text"
              value={formData.nome}
              onChange={handleChange}
            />

            <FormField
              label="Nickname:"
              name="nickname"
              type="text"
              value={formData.nickname}
              onChange={handleChange}
            />

            <FormField
              label="Número de telefone:"
              name="numero_telefone"
              type="tel"
              value={formData.numero_telefone}
              onChange={handleChange}
            />

            <FormField
              label="Digite seu e-mail:"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemplo@gmail.com"
            />

            <FormField
              label="Crie uma senha:"
              name="senha"
              type="password"
              value={formData.senha}
              onChange={handleChange}
            />

            <FormField
              label="Confirme a senha:"
              name="confirmarSenha"
              type="password"
              value={formData.confirmarSenha}
              onChange={handleChange}
            />

            <SubmitButton>Criar conta</SubmitButton>

            <div className="flex justify-center gap-4 mt-2">
              <span className="text-[#00003C] text-xl">Já tem uma conta?</span>
              <a href="/login" className="text-[#00003C] text-xl underline">
                Entrar
              </a>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Cadastro;

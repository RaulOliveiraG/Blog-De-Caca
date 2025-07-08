import { useState } from "react";
import { enviarCadastro } from "../src/services/cadastroService";

import CadastroLayout from "../src/components/CadastroLayout";
import CadastroForm from "../src/components/CadastroForm";

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
    <CadastroLayout>
      <CadastroForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </CadastroLayout>
  );
};

export default Cadastro;

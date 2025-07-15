import React from "react";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";

interface CadastroFormProps {
  formData: {
    email: string;
    senha: string;
    confirmarSenha: string;
    nickname: string;
    cpf: string;
    nome: string;
    numero_telefone: string;
    foto_perfil: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const CadastroForm: React.FC<CadastroFormProps> = ({ formData, onChange, onSubmit }) => (
  <form onSubmit={onSubmit} style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 180,
    transition: "margin-left 0.3s"
  }}>
    <span style={{ color: "#8A7300", fontSize: 32, fontWeight: "bold",  alignSelf: "center", marginBottom: 50 }}>
      CADASTRE-SE
    </span>
    <FormField
      label="E-mail:"
      name="email"
      type="email"
      value={formData.email}
      onChange={onChange}
      styleInput={{
        color: "#616161",
        background: "#F1F1F1",
        fontSize: 15,
        padding: "23px 33px",
        marginBottom: 25,
        borderRadius: 5,
        border: 0,
        width: 350
      }}
      styleLabel={{ color: "#000", fontSize: 22, marginLeft: 4 }}
      required
    />
    <FormField
      label="Senha:"
      name="senha"
      type="password"
      value={formData.senha}
      onChange={onChange}
      styleInput={{
        color: "#616161",
        background: "#F1F1F1",
        fontSize: 15,
        padding: "23px 33px",
        marginBottom: 25,
        borderRadius: 5,
        border: 0,
        width: 350
      }}
      styleLabel={{ color: "#000", fontSize: 22, marginLeft: 4 }}
      required
    />
    <FormField
      label="Confirmar senha:"
      name="confirmarSenha"
      type="password"
      value={formData.confirmarSenha}
      onChange={onChange}
      styleInput={{
        color: "#616161",
        background: "#F1F1F1",
        fontSize: 15,
        padding: "23px 33px",
        marginBottom: 25,
        borderRadius: 5,
        border: 0,
        width: 350
      }}
      styleLabel={{ color: "#000", fontSize: 22, marginLeft: 4 }}
      required
    />
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <SubmitButton
        style={{
          background: "#00003C",
          color: "#F1F1F1",
          fontSize: 20,
          marginTop: 30,
          padding: "23px 155px",
          marginBottom: 15,
          borderRadius: 5,
          border: 0,
          fontWeight: "bold",
          cursor: "pointer"
        }}
        textStyle={{ color: "#F1F1F1", fontSize: 20 }}
      >
        Criar conta
      </SubmitButton>
    </div>
    <div style={{ display: "flex", gap: 210 }}>
      <span
        style={{ color: "#00003C", fontSize: 18, width: 160, textDecoration: "underline" }}
      >
        Já tem uma conta?
      </span>
      <a
        href="/login"
        style={{ color: "#00003C", fontSize: 18, textDecoration: "underline" }}
      >
        Entrar
      </a>
    </div>
  </form>
);

export default CadastroForm;

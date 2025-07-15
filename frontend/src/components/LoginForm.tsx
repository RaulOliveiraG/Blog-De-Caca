import React from "react";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";

interface LoginFormProps {
  formData: { email: string; senha: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ formData, onChange, onSubmit, onForgotPassword }) => (
  <form onSubmit={onSubmit} style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 180,
    transition: "margin-left 0.3s"
  }}>
    <span style={{ color: "#00003C", fontSize: 32, fontWeight: "bold",  alignSelf: "center", marginBottom: 100 }}>
      LOGIN
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
      styleLabel={{ color: "#000", fontSize: 24, marginLeft: 4 }}
      required
    />
    <SubmitButton
      style={{
        background: "#00003C",
        color: "#F1F1F1",
        fontSize: 20,
        padding: "26px 174px",
        marginBottom: 30,
        marginLeft: 4,
        borderRadius: 5,
        border: 0,
        fontWeight: "bold",
        cursor: "pointer"
      }}
      textStyle={{ color: "#F1F1F1", fontSize: 20 }}
    >
      Entrar
    </SubmitButton>
    <div style={{ display: "flex", marginLeft: 10, gap: 155 }}>
      <span
        style={{ color: "#00003C", fontSize: 18, width: 163, textDecoration: "underline" }}
        onClick={onForgotPassword}
      >
        Esqueceu a senha?
      </span>
      <a
        href="/cadastro"
        style={{ color: "#00003C", fontSize: 18, textDecoration: "underline" }}
      >
        Criar conta
      </a>
    </div>
  </form>
);

export default LoginForm;

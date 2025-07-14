import React from "react";

interface Props {
  show: boolean;
  post: {
    titulo: string;
    descricao: string;
    imagem: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const NovoPostModal: React.FC<Props> = ({ show, post, onChange, onClose, onSubmit }) => {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: 30,
          borderRadius: 10,
          width: "90%",
          maxWidth: 500,
          fontFamily: "'Cabin Condensed', sans-serif",
        }}
      >
        <h2 style={{ color: "#00003C", marginBottom: 20 }}>Novo Post</h2>
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={post.titulo}
          onChange={onChange}
          style={estiloInput}
        />
        <textarea
          name="descricao"
          placeholder="Descrição"
          value={post.descricao}
          onChange={onChange}
          rows={4}
          style={{ ...estiloInput, resize: "none" }}
        />
        <input
          type="text"
          name="imagem"
          placeholder="URL da imagem"
          value={post.imagem}
          onChange={onChange}
          style={estiloInput}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={onClose} style={estiloBotaoCancelar}>Cancelar</button>
          <button onClick={onSubmit} style={estiloBotaoPublicar}>Publicar</button>
        </div>
      </div>
    </div>
  );
};

const estiloInput = {
  width: "100%",
  marginBottom: 10,
  padding: 10,
  fontSize: 16,
  borderRadius: 4,
  border: "1px solid #ccc",
};

const estiloBotaoCancelar = {
  padding: "10px 20px",
  backgroundColor: "#ccc",
  color: "#000",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
  fontWeight: "bold",
};

const estiloBotaoPublicar = {
  padding: "10px 20px",
  backgroundColor: "#00003C",
  color: "#fff",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
  fontWeight: "bold",
};

export default NovoPostModal;

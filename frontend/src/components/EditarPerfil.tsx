import React, { useState } from "react";

interface Props {
  usuario: any;
  onClose: () => void;
  onSave: (dados: any) => void;
}

const EditarPerfilModal: React.FC<Props> = ({ usuario, onClose, onSave }) => {
  const [form, setForm] = useState(usuario);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
    }}>
      <div style={{ backgroundColor: "#fff", padding: 30, borderRadius: 10, width: 400 }}>
        <h2 style={{ color: "#00003C", marginBottom: 20 }}>Editar Perfil</h2>
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} style={estiloInput} />
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} style={estiloInput} />
        <input name="biografia" placeholder="Biografia" value={form.biografia} onChange={handleChange} style={estiloInput} />

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={onClose} style={estiloBotaoCinza}>Cancelar</button>
          <button onClick={() => onSave(form)} style={estiloBotaoAzul}>Salvar</button>
        </div>
      </div>
    </div>
  );
};

const estiloInput = {
  width: "100%", padding: 10, marginBottom: 10, fontSize: 14, borderRadius: 4, border: "1px solid #ccc"
};

const estiloBotaoAzul = {
  padding: "10px 20px", backgroundColor: "#00003C", color: "#fff", border: "none", borderRadius: 4, fontWeight: "bold", cursor: "pointer"
};

const estiloBotaoCinza = {
  padding: "10px 20px", backgroundColor: "#ccc", color: "#000", border: "none", borderRadius: 4, fontWeight: "bold", cursor: "pointer"
};

export default EditarPerfilModal;

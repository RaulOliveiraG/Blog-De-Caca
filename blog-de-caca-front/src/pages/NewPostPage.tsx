import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../lib/api";
import "./NewPostPage.css";

export default function NewPostPage() {
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");
  const [creating, setCreating] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !texto.trim()) return;

    setCreating(true);
    try {
      await api.post("/posts", {
        titulo: titulo.trim(),
        texto: texto.trim(),
        imagemUrl: imagemUrl.trim() || undefined,
      });
      navigate("/posts");
    } catch (err) {
      console.error(err);
      alert("Erro ao publicar. Verifique login/servidor.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <Layout>
      <section className="new-post-page">
        <h1>Criar Novo Post</h1>
        <form onSubmit={handleSubmit} className="create-form">
          <label>Título</label>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex.: Dicas de trilha"
            required
          />
          <label>Texto</label>
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Compartilhe sua experiência, dicas ou opinião…"
            rows={6}
            required
          />
          <label>URL da imagem (opcional)</label>
          <input
            value={imagemUrl}
            onChange={(e) => setImagemUrl(e.target.value)}
            placeholder="https://…"
          />
         <button type="submit" className="my-btn">
            {creating ? "Publicando…" : "Publicar"}
        </button>
        </form>
      </section>
    </Layout>
  );
}

import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../lib/api";
import defaultImg from "../assets/img/post_placeholder.jpeg";
import "./NewCommentPage.css";

type Post = {
  id: number;
  titulo: string;
  texto: string;
  imagemUrl?: string;
  autor?: { nickname?: string };
  dataPublicacao?: string;
};

export default function NewCommentPage() {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const load = useCallback(async () => {
    if (!postId || Number.isNaN(postId)) {
      setErr("URL inválida: ID do post ausente.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setErr(null);
    try {
      const { data } = await api.get(`/posts/${postId}`);
      setPost(data);
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Não foi possível carregar a publicação.");
      setPost(null);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    load();
  }, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = text.trim();
    if (!payload) return;
    setSending(true);
    try {
      await api.post(`/posts/${postId}/comments`, { texto: payload });
      navigate(`/posts/${postId}`); // volta pro detalhe após comentar
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Falha ao publicar comentário.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Layout>
      {loading && <div className="post-detail loading">Carregando…</div>}

      {!loading && err && (
        <div className="error-box" style={{ margin: "16px 5%" }}>
          {err}
          <div style={{ marginTop: 8 }}>
            <Link to={`/posts/${postId}`} className="btn-outline">← Voltar</Link>
          </div>
        </div>
      )}

      {!loading && !err && post && (
        <div className="post-detail">
          {/* Cabeçalho igual ao PostDetail */}
          <header className="post-head">
            <div className="user">
              <div className="avatar" />
              <div>
                <strong>{post.autor?.nickname || "Usuário"}</strong>
                <small>
                  {" "}publicado em{" "}
                  {new Date(post.dataPublicacao || Date.now()).toLocaleDateString()}
                </small>
              </div>
            </div>
            <Link to={`/posts/${postId}`} className="btn-outline">Voltar</Link>
          </header>

          {/* Resumo do post */}
          <h2 className="title">{post.titulo}</h2>
          <div className="content-row">
            <div className="text">
              {(post.texto || "").slice(0, 600)}
              {post.texto && post.texto.length > 600 ? "..." : ""}
            </div>
            <img className="thumb" src={post.imagemUrl || defaultImg} alt="" />
          </div>

          {/* Card de novo comentário */}
          <section className="comment-new">
            <h3>Escrever comentário</h3>
            <form onSubmit={submit} className="comment-form">
              <textarea
                className="comment-textarea"
                placeholder="Compartilhe sua opinião…"
                value={text}
                onChange={(e) => setText(e.target.value)}
                minLength={2}
                rows={4}
                required
              />
              <div className="comment-actions">
                <span className="muted">{text.trim().length} caracteres</span>
                <button className="btn-outline" type="submit" disabled={sending || text.trim().length < 2}>
                  Publicar
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </Layout>
  );
}

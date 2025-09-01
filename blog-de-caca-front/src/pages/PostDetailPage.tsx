import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../lib/api";
import ReactionBar from "../components/ReactionBar";
import defaultImg from "../assets/img/post_placeholder.jpeg";
import "./PostDetailPage.css";

type Post = {
  id: number;
  titulo: string;
  texto: string;
  imagemUrl?: string;
  autor?: { nickname?: string };
  dataPublicacao?: string;
  _count?: { reactions?: number };
  reactionsCount?: number;
};

type Comment = {
  id: number;
  texto: string;
  createdAt?: string;
  autor?: { nickname?: string };
};

/** ===== Comentários (listagem + criação) ===== */
function CommentsSection({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const loadComments = useCallback(async () => {
    try {
      const { data } = await api.get(`/posts/${postId}/comments`);
      setComments(Array.isArray(data) ? data : []);
      setErr(null);
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Não foi possível carregar comentários.");
      setComments([]);
    }
  }, [postId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = text.trim();
    if (!payload) return;
    setSending(true);
    try {
      const { data } = await api.post(`/posts/${postId}/comments`, { texto: payload });
      setComments((prev) => [data, ...(prev || [])]);
      setText("");
      setErr(null);
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Falha ao comentar.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="comments">
      <h3>Comentários</h3>
      {err && <div className="error-box">{err}</div>}

      <form className="comment-form" onSubmit={submit}>
        <input
          className="comment-input"
          placeholder="Escreva um comentário…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button disabled={sending} className="my-btn-primary" type="submit">
          Publicar
        </button>
      </form>

      {!comments ? (
        <div className="comments-loading">Carregando comentários…</div>
      ) : comments.length === 0 ? (
        <div className="comments-empty">Seja o primeiro a comentar.</div>
      ) : (
        <ul className="comment-list">
          {comments.map((c) => (
            <li key={c.id} className="comment-item">
              <div className="comment-meta">
                <strong>{c.autor?.nickname || "Usuário"}</strong>
                <small>
                  {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
                </small>
              </div>
              <div className="comment-text">{c.texto}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
/** ===== fim comentários ===== */

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

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
      setErr(e?.response?.data?.message || "Não foi possível carregar esta publicação.");
      setPost(null);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    load();
  }, [load]);

  const initialReactions = Number(
    (post?._count?.reactions ?? post?.reactionsCount ?? 0) as number
  );

  return (
    <Layout>
      {loading && <div className="post-detail loading">Carregando…</div>}

      {!loading && err && (
        <div className="error-box" style={{ margin: "16px 5%" }}>
          {err}
          <div style={{ marginTop: 8 }}>
            <Link to="/posts" className="my-btn-outline">← Voltar</Link>
          </div>
        </div>
      )}

      {!loading && !err && post && (
        <div className="post-detail">
          <header className="post-head">
            <div className="user">
              <div className="avatar" />
              <div>
                <strong>{post.autor?.nickname || "Usuário"}</strong>
                <small>
                  publicado em {new Date(post.dataPublicacao || Date.now()).toLocaleDateString()}
                </small>
              </div>
            </div>
            <Link to="/posts" className="my-btn-outline">Voltar</Link>
          </header>

          <h2 className="title">{post.titulo}</h2>

          <div className="content-row">
            <div className="text">{post.texto}</div>
            <img className="thumb" src={post.imagemUrl || defaultImg} alt="" />
          </div>

          <div className="reactions">
            <ReactionBar postId={post.id} initialCount={initialReactions} />
          </div>

          {/* Comentários */}
          <CommentsSection postId={post.id} />
        </div>
      )}
    </Layout>
  );
}

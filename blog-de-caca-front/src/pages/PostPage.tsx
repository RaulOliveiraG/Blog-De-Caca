import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import api from "../lib/api";
import defaultImg from "../assets/img/post_placeholder.jpeg";
import "./PostPage.css";
import "./UserProfile.css";

type Post = {
  id: number;
  titulo: string;
  texto: string;
  imagemUrl?: string;
  autorId: number;
  autor?: { nickname?: string };
};

export function PostsPage() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/posts");
        setPosts(Array.isArray(data) ? data : []);
      } catch (e: any) {
        setError(e?.response?.data?.message || "Erro ao carregar publicações");
        setPosts([]);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return (posts || []).filter((p) =>
      [p.titulo, p.texto].join(" ").toLowerCase().includes(q)
    );
  }, [posts, search]);

  const hasAnyPosts = (posts || []).length > 0;

  return (
    <Layout>
      <section className="posts-hero">
  <div>
    <h1>Publicações</h1>
    <p>Explore e interaja com as postagens da comunidade</p>
  </div>

  <div className="hero-actions">
    <div className="search">
      <input
        placeholder="Buscar por título ou conteúdo…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Buscar publicações"
      />
      <span className="search-icon" aria-hidden>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
    </div>

   <button type="button" className="btn-create-post" onClick={() => navigate("/posts/novo")}>Criar Post</button>

  </div>
</section>

      {error && <div className="error-box">{error}</div>}

      {!posts ? (
        <ul className="list">
          {Array.from({ length: 6 }).map((_, i) => (
            <li key={i} className="skeleton" />
          ))}
        </ul>
      ) : !hasAnyPosts ? (
        <div className="empty">
          Ainda não há publicações. Quando houver, elas aparecerão aqui (e também no seu perfil).
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty">Nenhuma publicação encontrada para a sua busca.</div>
      ) : (
        <div className="posts-grid" style={{ padding: "0 5% 36px" }}>
          {filtered.map((p) => (
            <div key={p.id} className="post-card">
              <img src={p.imagemUrl || defaultImg} alt={p.titulo} loading="lazy" />
              <div className="post-content">
                <h4>{p.titulo}</h4>
                <p>{p.texto.substring(0, 110)}...</p>
              </div>
              <Link to={`/posts/${p.id}`} className="arrow-link">
                ➔
              </Link>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

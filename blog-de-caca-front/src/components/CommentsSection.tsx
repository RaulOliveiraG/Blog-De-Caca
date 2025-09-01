import { useEffect, useState } from "react";
import api from "../lib/api";

type Comment = { id: number; autor: { nickname?: string }; texto: string; createdAt?: string };

export default function CommentsSection({ postId }: { postId: number }) {
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [text, setText] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/posts/${postId}/comments`);
        setComments(Array.isArray(data) ? data : []);
      } catch (e: any) {
        setErr(e?.response?.data?.message || "Não foi possível carregar comentários.");
        setComments([]);
      }
    })();
  }, [postId]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSending(true);
    try {
      const { data } = await api.post(`/posts/${postId}/comments`, { texto: text.trim() });
      setComments((prev) => [data, ...(prev || [])]); // otimista
      setText("");
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Falha ao comentar.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section style={{ marginTop: 16 }}>
      <h3 style={{ margin: "0 0 8px" }}>Comentários</h3>
      {err && <div className="error-box" style={{ margin: 0 }}>{err}</div>}

      <form onSubmit={submit} style={{ display: "flex", gap: 8, margin: "8px 0 16px" }}>
        <input
          placeholder="Escreva um comentário…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: 8, padding: "10px 12px" }}
        />
        <button disabled={sending} className="btn-outline" type="submit">
          Publicar
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
        {(comments || []).map((c) => (
          <li key={c.id} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}>
            <strong>{c.autor?.nickname || "Usuário"}</strong>{" "}
            <small style={{ opacity: .7 }}>
              {c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}
            </small>
            <div style={{ marginTop: 6, whiteSpace: "pre-wrap", color: "#333" }}>{c.texto}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}

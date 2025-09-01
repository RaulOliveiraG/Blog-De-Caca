import { Link } from "react-router-dom";
import "./PostCard.css";
import defaultImg from "../assets/img/post_placeholder.jpeg";

export default function PostCard({ post }: { post: any }) {
  const autor = post.autor?.nickname || "Usuário";
  const data = new Date(post.dataPublicacao || Date.now()).toLocaleDateString();

  return (
    <article className="post-card-figma">
      <div className="left">
        <div className="avatar" />
        <div className="meta">
          <strong>{autor}</strong>
          <small>publicado em {data}</small>
        </div>
      </div>

      <div className="center">
        <h3 className="title">{post.titulo}</h3>
        <p className="excerpt">{(post.texto || "").slice(0, 260)}{post.texto?.length > 260 ? "..." : ""}</p>
        <div className="actions">
          <Link to={`/posts/${post.id}`} className="btn-outline">Ver publicação</Link>
        </div>
      </div>

      <div className="right">
        <img src={post.imagemUrl || defaultImg} alt="" />
      </div>
    </article>
  );
}

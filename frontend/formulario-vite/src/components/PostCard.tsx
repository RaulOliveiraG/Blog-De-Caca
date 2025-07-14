import React from "react";

export interface Post {
  id: number;
  titulo: string;
  descricao: string;
  imagem: string;
}

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        display: "flex",
        marginBottom: 30,
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        fontFamily: "'Cabin Condensed', sans-serif",
      }}
    >
      <img
        src={post.imagem}
        alt={post.titulo}
        style={{
          width: 170,
          height: 130,
          objectFit: "cover",
        }}
      />
      <div
        style={{
          padding: 20,
          flexGrow: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h4
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 10,
              color: "#000",
            }}
          >
            {post.titulo}
          </h4>
          <p
            style={{
              fontSize: 15,
              color: "#616161",
              fontFamily: "'Cabin Condensed', sans-serif",
            }}
          >
            {post.descricao}
          </p>
        </div>
        <button
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: "#00003C",
            color: "#F1F1F1",
            border: "none",
            fontSize: 20,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default PostCard;

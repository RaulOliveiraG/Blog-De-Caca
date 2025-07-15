import React, { useState } from "react";
import Header from "../src/components/Header";
import AuthorInfo from "../src/components/AuthorInfo";
import PostContent from "../src/components/PostContent";
import Footer from "../src/components/Footer";
import { Comentario } from "../src/components/Comentarios";

const Post: React.FC = () => {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);

  const handleAdicionarComentario = (texto: string) => {
    const novoComentario: Comentario = {
      id: Date.now(),
      texto,
      autor: "Usuário Exemplo",
    };
    setComentarios((prev) => [...prev, novoComentario]);
  };

  const handleRemoverComentario = (id: number) => {
    setComentarios((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="flex flex-col bg-white min-h-screen">
      <Header />
      <main className="px-[94px]">
        <AuthorInfo />
        <PostContent
          titulo="Título do Post Exemplo"
          texto="Este é o texto do post, com várias informações interessantes."
          imagemUrl="/img/post-exemplo.jpg"
          dataPublicacao="15/07/2025"
          comentarios={comentarios}
          onAdicionarComentario={handleAdicionarComentario}
          onRemoverComentario={handleRemoverComentario}
        />
        <Footer />
      </main>
    </div>
  );
};

export default Post;
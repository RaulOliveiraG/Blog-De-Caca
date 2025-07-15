import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import NovoPostModal from "../src/components/NovoPost";
import PostCard from "../src/components/PostCard";
import "bootstrap-icons/font/bootstrap-icons.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState<
    { id: number; titulo: string; descricao: string; imagem: string }[]
  >([]);
  const [showModal, setShowModal] = useState(false);
  const [novoPost, setNovoPost] = useState({
    titulo: "",
    descricao: "",
    imagem: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNovoPost({ ...novoPost, [e.target.name]: e.target.value });
  };

  const handlePublicar = () => {
    if (!novoPost.titulo || !novoPost.descricao || !novoPost.imagem) {
      alert("Preencha todos os campos.");
      return;
    }

    const novo = {
      id: posts.length + 1,
      ...novoPost,
    };
    setPosts([novo, ...posts]);
    setNovoPost({ titulo: "", descricao: "", imagem: "" });
    setShowModal(false);
  };

  return (
    <div style={{ fontFamily: "'Cabin Condensed', sans-serif", backgroundColor: "#fff", paddingTop: 20 }}>
      {/* Topbar fixa com login/cadastro */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "8px 20px",
          gap: 20,
          fontSize: 14,
          fontWeight: "bold",
          fontFamily: "'Cabin Condensed', sans-serif",
          position: "fixed",
          top: 0,
          right: 0,
          left: 0,
          height: 36,
          zIndex: 1100,
          backgroundColor: "#ffffff",
        }}
      >
        <button onClick={() => navigate("/login")} style={{ backgroundColor: "transparent", color: "#8a7300", border: "none", cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", gap: 5 }}>
          <i className="bi bi-box-arrow-in-right"></i> Entrar
        </button>
        <span style={{ color: "#ccc", fontWeight: "normal" }}>|</span>
        <button onClick={() => navigate("/cadastro")} style={{ backgroundColor: "transparent", color: "#8a7300", border: "none", cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", gap: 5 }}>
          <i className="bi bi-person-fill"></i> Criar uma conta
        </button>
      </div>

      <div style={{ height: 36 }}></div>

      <Header />

      <section
        style={{
          backgroundImage: "url('https://legalmentearmado.com.br/wp-content/themes/legalmentearmado/img/main-slider/slide-img1-2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 380,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#F1F1F1",
          position: "relative",
          marginTop: 60,
        }}
      >
        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "30px", borderRadius: 10, textAlign: "center", maxWidth: 800, zIndex: 2 }}>
          <h2 style={{ fontSize: 36, fontWeight: "bold", marginBottom: 10 }}>
            Qual a melhor arma?
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.5 }}>
            Carabinas, espingardas ou rifles? Cada uma tem seu momento ideal.
            Antes de comprar, pense no tipo de caça, terreno e sua experiência.
            Uma boa arma não é só potência — é confiança.
          </p>
        </div>
      </section>

      <section style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "40px", padding: "60px", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 280 }}>
          <h3 style={{ fontSize: 24, fontWeight: "bold", color: "#00003C", marginBottom: 20 }}>
            Bem-vindo ao Blog de Caça
          </h3>
          <p style={{ fontSize: 16, color: "#000", lineHeight: 1.6 }}>
            Aqui você encontra relatos reais, dicas práticas, experiências únicas e
            tudo sobre o universo da caça. Nosso objetivo é criar um espaço onde
            caçadores iniciantes ou experientes possam compartilhar vivências,
            aprender com outros e valorizar essa prática com respeito à natureza.
            <br /><br />
            Publique seus próprios relatos, leia histórias incríveis e acompanhe os
            registros mais marcantes da comunidade.
          </p>
        </div>

        <div style={{ position: "relative", width: 280, height: 220, flexShrink: 0 }}>
          <img
            src="https://www.eusemfronteiras.com.br/wp-content/uploads/2015/09/shutterstock_228676159-810x540.jpg"
            alt="Caçador observando"
            style={{
              width: 200,
              height: 140,
              objectFit: "cover",
              border: "6px solid #00003C",
              position: "absolute",
              top: 0,
              left: 60,
              zIndex: 2,
              borderRadius: 8,
              boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
            }}
          />
          <img
            src="https://st3.depositphotos.com/9881890/17090/i/450/depositphotos_170903838-stock-photo-bird-hunting.jpg"
            alt="Caçador com espingarda"
            style={{
              width: 200,
              height: 140,
              objectFit: "cover",
              border: "6px solid #00003C",
              position: "absolute",
              top: 50,
              left: 0,
              zIndex: 1,
              borderRadius: 8,
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            }}
          />
        </div>
      </section>

      <section style={{ backgroundColor: "#F1F1F1", padding: "60px", position: "relative" }}>
        <h3 style={{ fontSize: 22, fontWeight: "bold", color: "#00003C", marginBottom: 30 }}>
          ÚLTIMOS POSTS
        </h3>

        {posts.length === 0 ? (
          <p style={{ color: "#616161", fontSize: 16 }}>Nenhum post disponível no momento.</p>
        ) : (
          posts.map((post) => (
           <PostCard key={post.id} post={post} />
          ))
        )}

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            onClick={() => setShowModal(true)}
            style={{
              backgroundColor: "#8a7300",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 16,
              fontWeight: "bold",
              fontFamily: "'Cabin Condensed', sans-serif",
            }}
          >
            Publicar
          </button>
        </div>
      </section>

      <NovoPostModal
        show={showModal}
        post={novoPost}
        onChange={handleChange}
        onClose={() => setShowModal(false)}
        onSubmit={handlePublicar}
      />

      <Footer />
    </div>
  );
};

export default Home;

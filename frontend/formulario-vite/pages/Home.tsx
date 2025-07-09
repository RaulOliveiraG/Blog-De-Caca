import React, { useState } from "react";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<
    { id: number; titulo: string; descricao: string; imagem: string }[]
  >([]);
  const [showModal, setShowModal] = useState(false);
  const [novoPost, setNovoPost] = useState({
    titulo: "",
    descricao: "",
    imagem: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNovoPost({ ...novoPost, [e.target.name]: e.target.value });
  };

  const handlePublicar = () => {
    const novo = {
      id: posts.length + 1,
      ...novoPost,
    };
    setPosts([novo, ...posts]);
    setNovoPost({ titulo: "", descricao: "", imagem: "" });
    setShowModal(false);
  };

  return (
    <div
      style={{
        fontFamily: "'Cabin Condensed', sans-serif",
        backgroundColor: "#fff",
        paddingTop: 20,
      }}
    >
      <Header />

      <section
        style={{
          backgroundImage:
            "url('https://legalmentearmado.com.br/wp-content/themes/legalmentearmado/img/main-slider/slide-img1-2.jpg')",
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
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            padding: "30px",
            borderRadius: 10,
            textAlign: "center",
            maxWidth: 800,
            zIndex: 2,
          }}
        >
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

      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "40px",
          padding: "60px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: 280 }}>
          <h3
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "#00003C",
              marginBottom: 20,
            }}
          >
            Vi um veado branco e não consegui puxar o gatilho
          </h3>
          <p style={{ fontSize: 15, color: "#000", lineHeight: 1.6 }}>
            Era por volta das 6 da manhã. O sol mal tinha nascido, e eu já
            estava em posição perto do riacho onde costumo ficar. Silêncio
            total, só o barulho leve da água correndo. Foi então que vi algo
            diferente entre as árvores. Achei que fosse um reflexo, mas não —
            era um veado branco, completamente branco.
            <br />
            <br />
            Nunca tinha visto nada igual em todos esses anos. Ele me olhou por
            alguns segundos, como se soubesse que estava sendo observado.
            Peguei a arma, mirei… e parei. Não consegui atirar. Era como se
            aquele bicho estivesse ali só pra me lembrar do lado bonito da
            natureza.
            <br />
            <br />
            Guardei a arma, peguei o celular e tirei uma foto. Foi o melhor
            “troféu” que já trouxe da floresta.
          </p>
        </div>

        <div
          style={{
            position: "relative",
            width: 280,
            height: 220,
            flexShrink: 0,
          }}
        >
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
          <p style={{ color: "#616161", fontSize: 16, fontFamily: "'Cabin Condensed', sans-serif" }}>
            Nenhum post disponível no momento.
          </p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
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
                  <p style={{ fontSize: 15, color: "#616161", fontFamily: "'Cabin Condensed', sans-serif" }}>
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
              alignSelf: "flex-end",
            }}
          >
            Publicar
          </button>
        </div>
      </section>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: 30,
              borderRadius: 10,
              width: "90%",
              maxWidth: 500,
              fontFamily: "'Cabin Condensed', sans-serif",
            }}
          >
            <h2 style={{ color: "#00003C", marginBottom: 20 }}>Novo Post</h2>
            <input
              type="text"
              name="titulo"
              placeholder="Título"
              value={novoPost.titulo}
              onChange={handleChange}
              style={{
                width: "100%",
                marginBottom: 10,
                padding: 10,
                fontSize: 16,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
           <textarea
  name="descricao"
  placeholder="Descrição"
  value={novoPost.descricao}
  onChange={handleChange}
  rows={4}
  style={{
    width: "100%",
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #ccc",
    resize: "none",
    fontFamily: "'Cabin Condensed', sans-serif",
  }}
/>
            <input
              type="text"
              name="imagem"
              placeholder="URL da imagem"
              value={novoPost.imagem}
              onChange={handleChange}
              style={{
                width: "100%",
                marginBottom: 20,
                padding: 10,
                fontSize: 16,
                borderRadius: 4,
                border: "1px solid #ccc",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#ccc",
                  color: "#000",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handlePublicar}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#00003C",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;

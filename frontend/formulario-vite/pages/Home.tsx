import React, { useState } from "react";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<
    { id: number; titulo: string; resumo: string; imagem: string }[]
  >([]);

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
          <h2
            style={{
              fontSize: 36,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Qual a melhor arma?
          </h2>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.5,
            }}
          >
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
            Era por volta das 6 da manhã. O sol mal tinha nascido, e eu já estava
            em posição perto do riacho onde costumo ficar. Silêncio total, só o
            barulho leve da água correndo. Foi então que vi algo diferente entre
            as árvores. Achei que fosse um reflexo, mas não — era um veado
            branco, completamente branco.
            <br />
            <br />
            Nunca tinha visto nada igual em todos esses anos. Ele me olhou por
            alguns segundos, como se soubesse que estava sendo observado.
            Peguei a arma, mirei… e parei. Não consegui atirar. Era como se aquele
            bicho estivesse ali só pra me lembrar do lado bonito da natureza.
            <br />
            <br />
            Guardei a arma, peguei o celular e tirei uma foto. Foi o melhor “troféu”
            que já trouxe da floresta.
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

      <section style={{ backgroundColor: "#F1F1F1", padding: "60px" }}>
        <h3
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "#00003C",
            marginBottom: 40,
          }}
        >
          ÚLTIMOS POSTS
        </h3>

        {posts.length === 0 ? (
          <p style={{ color: "#616161", fontSize: 16 }}>
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
                  <p style={{ fontSize: 15, color: "#616161" }}>
                    {post.resumo}
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
      </section>

      <Footer />
    </div>
  );
};

export default Home;

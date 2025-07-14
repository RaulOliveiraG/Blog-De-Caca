import React, { useEffect, useState } from "react";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import { getUsuario, atualizarUsuario, deletarUsuario } from "../src/services/UsuarioService";
import EditarPerfilModal from "../src/components/EditarPerfil";

interface Usuario {
  id: string;
  nome: string;
  username: string;
  biografia: string;
  amigos: number;
  posts: number;
}

const PerfilUsuario: React.FC = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [showEditar, setShowEditar] = useState(false);

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await getUsuario("1");
        setUsuario(dados);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      }
    }
    carregar();
  }, []);

  const salvarEdicao = async (dados: Usuario) => {
    try {
      const atualizado = await atualizarUsuario(dados.id, dados);
      setUsuario(atualizado);
      setShowEditar(false);
    } catch (error) {
      console.error("Erro ao salvar edição:", error);
    }
  };

  const excluirConta = async () => {
    const confirm = window.confirm("Deseja mesmo excluir sua conta?");
    if (confirm && usuario) {
      try {
        await deletarUsuario(usuario.id);
        alert("Conta excluída.");
      } catch (error) {
        console.error("Erro ao excluir conta:", error);
      }
    }
  };

  return (
    <div style={{ fontFamily: "'Cabin Condensed', sans-serif", backgroundColor: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flexGrow: 1 }}>
        {usuario && (
          <>
            <section style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "60px 60px 20px", borderBottom: "1px solid #ddd" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ width: 70, height: 70, borderRadius: "50%", backgroundColor: "#D9D9D9" }}></div>
                <div>
                  <h3 style={{ fontSize: 16, margin: 0, fontWeight: "bold", color: "#00003C" }}>{usuario.nome}</h3>
                  <p style={{ fontSize: 14, margin: 0, color: "#000" }}>@{usuario.username}</p>
                  <p style={{ fontSize: 13, color: "#8a7300", marginTop: 4 }}>{usuario.biografia}</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 14, marginBottom: 0, color: "#8a7300", fontWeight: "bold" }}>{usuario.amigos}</p>
                  <p style={{ fontSize: 13, margin: 0 }}>Amigos</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 14, marginBottom: 0, color: "#8a7300", fontWeight: "bold" }}>{usuario.posts}</p>
                  <p style={{ fontSize: 13, margin: 0 }}>Posts</p>
                </div>
                <button onClick={() => setShowEditar(true)} style={botao}>Editar</button>
                <button onClick={excluirConta} style={{ ...botao, backgroundColor: "#8a0000" }}>Excluir</button>
              </div>
            </section>

            <section style={{ padding: "40px 60px 60px" }}>
              <h3 style={{ fontSize: 16, fontWeight: "bold", color: "#00003C", marginBottom: 20, textTransform: "uppercase" }}>Publicações</h3>
              <p style={{ fontSize: 14, color: "#999" }}>Nenhuma publicação encontrada.</p>
            </section>
          </>
        )}
      </main>
      {usuario && showEditar && <EditarPerfilModal usuario={usuario} onClose={() => setShowEditar(false)} onSave={salvarEdicao} />}
      <Footer />
    </div>
  );
};

const botao = {
  backgroundColor: "#00003C",
  color: "#fff",
  border: "none",
  borderRadius: 20,
  padding: "6px 20px",
  fontSize: 14,
  fontWeight: "bold",
  cursor: "pointer",
};

export default PerfilUsuario;

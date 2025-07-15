import React from "react"; 
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header style={{
      fontFamily: "'Cabin Condensed', sans-serif",
      top: 24,
      left: 0,
      right: 0,
      zIndex: 1000,
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent"
    }}>
      <div style={{
        width: "100%",
        maxWidth: 1200,
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}>
  
        <div style={{
          backgroundColor: "#00003c",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 60px",
          height: 64,
          boxSizing: "border-box",
          width: "100%"
        }}>
        
          <div style={{
            fontFamily: "'Black Ops One', cursive",
            fontSize: 20,
            color: "#8a7300"
          }}>
            Blog de caça
          </div>

          <nav style={{ display: "flex", gap: 30 }}>
            <button onClick={() => navigate("/home")} style={navLinkStyle("#8a7300")}>Início</button>
            <button onClick={() => navigate("/grupos")} style={navLinkStyle()}>Grupos</button>
            <button onClick={() => navigate("/buscar")} style={navLinkStyle()}>Buscar</button>
            <button onClick={() => navigate("/sobre")} style={navLinkStyle()}>Sobre</button>
          </nav>
        </div>
      </div>
    </header>
  );
};

const navLinkStyle = (color = "#f1f1f1") => ({
  background: "none",
  border: "none",
  color: color,
  fontSize: 14,
  cursor: "pointer",
  textDecoration: "none",
  fontFamily: "'Cabin Condensed', sans-serif"
});

export default Header;

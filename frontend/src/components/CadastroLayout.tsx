import React from "react";
import BannerLateral from "./BannerLateral";

interface CadastroLayoutProps {
  children: React.ReactNode;
}

const CadastroLayout: React.FC<CadastroLayoutProps> = ({ children }) => (
  <div style={{ display: "flex", flexDirection: "column", background: "#fff", minHeight: "100vh" }}>
    <div style={{ display: "flex", flexDirection: "row", height: "100vh", width: "100vw" }}>
      <BannerLateral
        image="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Kt1D3rcrE3/90u6qc6c_expires_30_days.png"
        style={{
          width: "50vw",
          height: "100vh",
          minWidth: 0,
          display: "flex",
          alignItems: "flex-start",
          padding: 0,
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      >
        <span style={{ color: "#fff", fontSize: 32, fontWeight: "bold", width: 500, margin:32, display: "block", whiteSpace: "pre-line" }}>
          {"Bem-vindo ao Blog de caça\nCadastre-se para fazer parte"}
        </span>
      </BannerLateral>
      {children}
    </div>
  </div>
);

export default CadastroLayout;

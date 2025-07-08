import React from "react";



interface BannerLateralProps {
  image?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const BannerLateral: React.FC<BannerLateralProps> = ({ image, style, children }) => (
  <div
    style={{
      backgroundImage: `url('${image || "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Kt1D3rcrE3/90u6qc6c_expires_30_days.png"}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      ...style,
    }}
  >
    <span style={{ color: "#fff", fontSize: 32, fontWeight: "bold", width: 339 }}>
      {children || (
        <>
          Bem-vindo ao Blog de caça
          <br />
          Cadastre-se para fazer parte
        </>
      )}
    </span>
  </div>
);

export default BannerLateral;
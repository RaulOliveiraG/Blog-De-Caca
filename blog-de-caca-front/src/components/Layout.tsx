import React, { PropsWithChildren, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Layout.css";

export default function Layout({ children }: PropsWithChildren) {
  const navigate = useNavigate();

  const isLogged = useMemo(
    () => Boolean(localStorage.getItem("accessToken") || localStorage.getItem("token")),
    []
  );

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="site-page">
   {/* HEADER original, sem mudanças de marcação */}
      <header className="home-header">
        <div className="logo">Blog de caça</div>
        <nav className="main-nav">
          <a href="/home">Início</a>
    
          <a href="/busca">Publicações</a>
          <a href="/perfil">Perfil</a>
        </nav>
        <div className="auth-actions">
          {/* mantém BOTÕES (não Links) para preservar seu estilo */}
          <button className="btn-login" onClick={() => (window.location.href = '/login')}>Entrar</button>
          <button className="btn-signup" onClick={() => (window.location.href = '/registro')}>Criar conta</button>
        </div>
      </header>

      <main className="site-main">{children}</main>

      <footer className="site-footer">© 2025 Blog de caça</footer>
    </div>
  );
}

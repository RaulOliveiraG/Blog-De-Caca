import React, { useEffect, useState } from 'react';
import './HomePage.css';
import api from '../lib/api';

import pistola from '../assets/img/arma.png';
import post1Image from '../assets/img/post1.jpg';
import post2Image from '../assets/img/post2.jpg';
import veado1Image from '../assets/img/veado1.jpg';
import veado2Image from '../assets/img/veado2.jpeg';
import defaultPostImage from '../assets/img/post_placeholder.jpeg';

type Post = {
  id: number | string;
  titulo: string;
  texto: string;
  imagemUrl?: string;
};

export function HomePage() {
  const [latest, setLatest] = useState<Post[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<Post[]>('/posts');
        const list = Array.isArray(data) ? data.slice(0, 2) : [];
        setLatest(list);
      } catch {
        setLatest([]); // se a API falhar, mostramos os cards estáticos
      }
    })();
  }, []);

  return (
    <div className="home-container">
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

      <main>
        {/* HERO e STORY exatamente como antes (sem inline styles) */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Qual a melhor arma?</h1>
            <p>
              Conheça os melhores Fuzis e Rifles para caça e em seus momentos de lazer. Juntos
              descobriremos qual a melhor para cada situação e sua experiência. Uma boa arma não é
              só potência – é confiança.
            </p>
          </div>
          <div className="hero-image-container">
            <img src={pistola} alt="Pistola" className="hero-gun-image" />
          </div>
        </section>

        <section className="story-section">
          <div className="story-text">
            <h3>Vi um veado branco e não consegui puxar o gatilho</h3>
            <p>
              Era por volta das 6 da manhã. O sol mal tinha nascido, e eu já estava em posição
              perto do riacho onde costumo ficar. Silêncio total, só o barulho leve da água
              correndo. Foi então que vi algo diferente entre as árvores. Achei que fosse um
              reflexo, mas não – era um veado branco, completamente branco. Nunca tinha visto nada
              igual em todos estes anos. Ele caminhava devagar, com calma, como se não tivesse medo
              de nada. A luz fraca do amanhecer tocava seus pelos de um jeito quase mágico,
              fazendo-o parecer uma criatura de outro mundo. Meu dedo estava no gatilho, mas eu não
              consegui apertar. Algo dentro de mim dizia que não era certo. Era como se aquela
              aparição carregasse um significado maior. Fiquei ali, parado, observando. O tempo
              parecia ter desacelerado. O veado me olhou por um breve instante. Não sei se ele
              realmente me viu, mas naquele olhar havia uma tranquilidade profunda, quase humana.
              Senti uma mistura de respeito, surpresa e paz. De repente, ele virou-se e desapareceu
              na neblina, sem pressa, como se fosse parte da floresta. Aquela visão ficou comigo o
              dia inteiro, e mesmo agora, dias depois, ainda penso nela. Talvez eu nunca veja outro
              veado branco na vida. Mas sei que naquele momento, algo mudou. Às vezes, o maior
              troféu da caça não é o que se leva para casa — é o que se leva na memória.
            </p>
          </div>
          <div className="story-images">
            <img src={veado2Image} alt="Caçador na floresta" className="story-img-1" />
            <img src={veado1Image} alt="Caçador em close-up" className="story-img-2" />
          </div>
        </section>

        {/* ÚLTIMOS POSTS — mesma estrutura/estilo, mas com dados reais */}
        <section className="latest-posts">
          <h2>ÚLTIMOS POSTS</h2>
          <div className="posts-grid">
            {latest && latest.length > 0 ? (
              latest.map((p) => (
                <div key={p.id} className="post-card">
                  <img
                    src={p.imagemUrl || defaultPostImage}
                    alt={p.titulo}
                    onError={(e: any) => (e.currentTarget.src = defaultPostImage)}
                  />
                  <div className="post-content">
                    <h4>{p.titulo}</h4>
                    <p>
                      {(p.texto || '').slice(0, 140)}
                      {p.texto && p.texto.length > 140 ? '...' : ''}
                    </p>
                  </div>
                  {/* mantém <a> como você tinha, só ajustando o href */}
                  <a href={`/posts/${p.id}`} className="arrow-link">➔</a>
                </div>
              ))
            ) : (
              <>
                {/* fallback estático se a API não respondeu */}
                <div className="post-card">
                  <img src={post1Image} alt="Veado no amanhecer" />
                  <div className="post-content">
                    <h4>Dica de Ouro para Rastrear Veados ao Amanhecer</h4>
                    <p>
                      Hoje o dia começou cedo, como deve ser numa boa caçada. Às 4h30 eu já estava
                      na mata, com o céu ainda escuro o sereno cobrindo o chão. Para rastrear
                      veados com sucesso, a primeira regra é o silêncio absoluto...
                    </p>
                  </div>
                  <a href="/posts/1" className="arrow-link">➔</a>
                </div>
                <div className="post-card">
                  <img src={post2Image} alt="Urso na floresta" />
                  <div className="post-content">
                    <h4>Dicas de Equipamentos</h4>
                    <p>
                      Se tem uma coisa que aprendi com o tempo, é q ue equipamento ruim atrapalha
                      mais do que ajuda. Sempre levo uma lanterna de cabeça, faca de bom corte e
                      mochila leve, mas resistente...
                    </p>
                  </div>
                  <a href="/posts/2" className="arrow-link">➔</a>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <footer className="site-footer">© 2025 Blog de caça</footer>
    </div>
  );
}

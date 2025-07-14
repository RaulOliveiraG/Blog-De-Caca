# Hunting Blog

Bem-vindo ao **Hunting Blog**!  
Um blog dedicado à comunidade de caça, onde usuários podem compartilhar experiências, dicas, histórias e interagir de diversas formas. Desenvolvido com **Node.js**, **TypeScript**, **Express** e **Prisma**, com persistência de dados em **postgresql**.

---

## ✨ Funcionalidades

- **Autenticação de Usuário**  
  Crie sua conta ou faça login para acessar todas as funcionalidades do blog.

- **Postagens sobre Caça**  
  Compartilhe suas experiências, dicas e histórias sobre caça.

- **Comentários Hierárquicos**  
  Comente em postagens e responda comentários, criando discussões organizadas em árvore.

- **Curtidas e Reações**  
  Demonstre sua opinião curtindo ou reagindo às postagens.

- **Histórico de Atividades**  
  Acompanhe suas postagens, comentários e interações em um histórico pessoal.

- **Privacidade de Postagens**  
  Escolha se sua postagem será pública ou visível apenas para usuários selecionados.

- **Interação via WhatsApp**  
  Responda e compartilhe postagens diretamente pelo WhatsApp.

---

## 🚀 Tecnologias Utilizadas

| [![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/) | [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) | [![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)](https://expressjs.com/) | [![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/) | [![postgresql](https://img.shields.io/badge/postgresql-4479A1?logo=postgresql&logoColor=white)](https://www.postgresql.com/) |
|---|---|---|---|---|

- **MVC (Models, Views, Controllers)**
- **ESLint** e **Prettier** para padronização e qualidade de código

---

## 🛠️ Como Rodar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/RaulOliveiraG/Blog-De-Caca.git
   cd Blog-De-Caca
Instale as dependências:

npm install
Configure o arquivo .env
Baseie-se no .env.example para criar o seu.

Rode as migrations do Prisma:
npx prisma generate
npx prisma migrate dev --name init
Inicie o projeto:

npm run dev
📁 Estrutura do Projeto
src/
controllers/ — Lógica das rotas
models/ — Modelos de dados
views/ — Templates e visualização
routes/ — Definição das rotas
middlewares/ — Middlewares de autenticação e validação
prisma/ — Configuração do ORM
💡 Contribua
Sinta-se à vontade para abrir issues, sugerir melhorias ou enviar pull requests!

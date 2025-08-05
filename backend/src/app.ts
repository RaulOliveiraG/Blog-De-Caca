// --- ARQUIVO CORRIGIDO ---
// src/server.ts

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import prisma from './config/database';
import swaggerUi from 'swagger-ui-express';
import userRoutes from './routes/userRoutes';
import passwordResetRoutes from './routes/passwordResetRoutes';
import postRoutes from './routes/postRoutes';

dotenv.config();

const swaggerSpec = require('./docs/swagger');
const app = express();

// --- MODIFICAÇÃO AQUI ---

// Lista de origens permitidas para o CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000', // Outra porta comum para front-end (Vite)
  // Adicione aqui a URL do seu front-end em produção quando tiver
];

// Opções de configuração do CORS
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Permite qualquer origem em desenvolvimento
    if (process.env.NODE_ENV !== 'production') {
      callback(null, true);
      return;
    }
    // Em produção, só permite origens da lista
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pela política de CORS'));
    }
  },
  credentials: true, // Necessário para enviar cookies ou headers de autorização
};

// Aplica o middleware do CORS com as opções corretas
app.use(cors(corsOptions));

// --- FIM DA MODIFICAÇÃO ---

app.use(express.json());
app.use(cookieParser());

// Rota da Documentação da API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Registro das Rotas da Aplicação com o prefixo /api
// Todas as rotas em userRoutes (registro, login, profile) começarão com /api
app.use('/api', userRoutes);
app.use('/api', passwordResetRoutes);
// Todas as rotas em postRoutes começarão com /api/posts
app.use('/api/posts', postRoutes);

// Rota de verificação de status
app.get('/', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.send('API online e conexão com o banco de dados bem-sucedida!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao conectar com o banco de dados.');
  }
});

// Middleware de tratamento de erros
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
// src/app.ts

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; // <-- IMPORTADO
import prisma from './config/database';
import swaggerUi from 'swagger-ui-express';

// Importe suas rotas
import userRoutes from './routes/userRoutes';
import passwordResetRoutes from './routes/passwordResetRoutes';

dotenv.config(); // <-- ADICIONADO E ESSENCIAL: Carrega as variáveis do .env

const swaggerSpec = require('./docs/swagger.ts');
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser()); // <-- ADICIONADO: Habilita o middleware de cookies

// Suas rotas
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(userRoutes); // A rota /login está aqui dentro
app.use(passwordResetRoutes);

// Middleware de tratamento de erros
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

// Rota de verificação do banco
app.get('/', async (req, res) => {
  try {
    await prisma.user.findMany();
    res.send('Conexão com o banco de dados MySQL bem-sucedida!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao conectar com o banco de dados.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
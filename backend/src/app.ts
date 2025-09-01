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

// CORS (em dev libera tudo)
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
];
const corsOptions = {
  origin(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    if (process.env.NODE_ENV !== 'production') return callback(null, true);
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('Não permitido pela política de CORS'));
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas
app.use('/api', userRoutes);
app.use('/api', passwordResetRoutes);
app.use('/api/posts', postRoutes);

// Health/ping com teste de DB
app.get('/', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.send('API online e conexão com o banco de dados bem-sucedida!');
  } catch (error) {
    console.error('Falha ao conectar no banco:', error);
    res.status(500).send('Erro ao conectar com o banco de dados.');
  }
});

// Erros globais
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

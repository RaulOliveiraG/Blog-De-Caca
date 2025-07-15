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

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', userRoutes);
app.use('/api', passwordResetRoutes);
app.use('/api/posts', postRoutes);
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

app.get('/', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.send('API online e conexão com o banco de dados bem-sucedida!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao conectar com o banco de dados.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
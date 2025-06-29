import express from 'express';
import dotenv from 'dotenv';
import prisma from './config/database';
import userRoutes from './routes/userRoutes';
import swaggerUi from 'swagger-ui-express';
import passwordResetRoutes from './routes/passwordResetRoutes';

const swaggerSpec = require('./docs/swagger.ts');
const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));//rota para a documentação
app.use(userRoutes);
app.use(passwordResetRoutes); 

app.use((err: any, req: any, res: any, next: any) => {//tratamento de erros gerais pra garantir que nao vai expor nenhum erro comprometedor
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

app.get('/', async (req, res) => {
  try {
    // Apenas uma query simples para testar a conexão
    await prisma.user.findMany();//procura pelos models que existem
    res.send('Conexão com o banco de dados MySQL bem-sucedida!');
  } catch (error) {
    res.status(500).send('Erro ao conectar com o banco de dados.');
    console.log(error)
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
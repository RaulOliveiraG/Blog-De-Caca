import express from 'express';
import dotenv from 'dotenv';
import prisma from './config/database';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    // Apenas uma query simples para testar a conexão
    await prisma.user.findMany(); // ou qualquer model que você tenha
    res.send('Conexão com o banco de dados MySQL bem-sucedida!');
  } catch (error) {
    res.status(500).send('Erro ao conectar com o banco de dados.');
  }
});



app.post('/user', async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await prisma.user.create({
      data: { email, name }
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao criar usuário.');
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
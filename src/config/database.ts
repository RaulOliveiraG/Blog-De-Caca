import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;





/*
prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String?
}
  

src/config/database.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;


src/app.ts
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
    console.log(error)
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

.env
DATABASE_URL="mysql://root:345210472008Rm.@localhost:3306/bancoprojetointegrador"

o servidor roda, porem retorna erro 500 na hora de rodar o banco de dados, você sabe o motivo?
*/

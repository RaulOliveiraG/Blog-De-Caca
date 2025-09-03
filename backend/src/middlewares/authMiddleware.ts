// --- ARQUIVO: backend/src/middlewares/authMiddleware.ts ---

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  console.log(`[Auth Middleware] Verificando rota: ${req.method} ${req.path}`);
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.error('[Auth Middleware] Falha: Header de autorização ausente ou mal formatado.');
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido ou mal formatado.' });
  }

  const token = authHeader.split(' ')[1];
  console.log(`[Auth Middleware] Token recebido: ${token}`);

  try {
    if (!process.env.ACCESS_TOKEN_SECRET) {
      console.error('[Auth Middleware] Falha Crítica: ACCESS_TOKEN_SECRET não está definido no .env');
      throw new Error('A chave secreta do token (ACCESS_TOKEN_SECRET) não está definida.');
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as { id: number };
    console.log(`[Auth Middleware] Token decodificado com sucesso para o user ID: ${decoded.id}`);
    
    const user = await prisma.user.findUnique({ 
      where: { id: decoded.id },
      select: { id: true, role: true }
    });

    if (!user) {
      console.error(`[Auth Middleware] Falha: Usuário com ID ${decoded.id} não encontrado no banco de dados.`);
      return res.status(401).json({ message: 'Usuário associado ao token não encontrado.' });
    }

    console.log(`[Auth Middleware] Sucesso: Usuário ${user.id} (${user.role}) autenticado.`);
    req.user = { id: user.id, role: user.role };
    
    next();
  } catch (error: any) {
    console.error('[Auth Middleware] Falha na verificação do token:', error.message);
    return res.status(401).json({ message: 'Token inválido ou expirado.', error: error.message });
  }
};
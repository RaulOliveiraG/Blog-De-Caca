import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido ou mal formatado.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error('A chave secreta do token (ACCESS_TOKEN_SECRET) não está definida.');
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as { id: number };
    
    const user = await prisma.user.findUnique({ 
      where: { id: decoded.id },
      select: { id: true, role: true }
    });

    if (!user) {
      return res.status(401).json({ message: 'Usuário associado ao token não encontrado.' });
    }

    req.user = { id: user.id, role: user.role };
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};
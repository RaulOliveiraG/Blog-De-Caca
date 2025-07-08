import { Request, Response, NextFunction } from 'express';


import jwt from 'jsonwebtoken';

import prisma from '../config/database';


interface AuthRequest extends Request {
  user?: { userId: number };
}

export const onlyAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Token com formato inválido.' });
  }

  const token = parts[1];

  try {

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { userId: number };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(403).json({ message: 'Usuário não encontrado.' });
    }

    if (user.role.toUpperCase() !== 'ADMIN') {
      return res.status(403).json({ message: 'Acesso restrito apenas para administradores.' });
    }

    req.user = decoded;
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};
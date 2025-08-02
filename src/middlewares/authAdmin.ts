
import { Request, Response, NextFunction } from 'express';

export const onlyAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.role) {
    return res.status(401).json({ message: 'Usuário não autenticado. O middleware de autenticação deve ser executado primeiro.' });
  }

  if (req.user.role.toUpperCase() !== 'ADMIN') {
    return res.status(403).json({ message: 'Acesso negado. Recurso restrito a administradores.' });
  }
  next();
};
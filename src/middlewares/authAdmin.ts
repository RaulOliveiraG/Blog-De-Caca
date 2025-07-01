import { Request, Response, NextFunction } from 'express';

export function onlyAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.body|| req.body.role !== 'admin') {
    return res.status(403).json({ message: 'Acesso restrito apenas para administradores.' });
  }
  next();
}
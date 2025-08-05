import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';

export const postOwnershipMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const postId = parseInt(req.params.id, 10);
  const userId = req.user?.id;
  const userRole = req.user?.role;

  if (!userId) {
    return res.status(401).json({ message: 'Usuário não autenticado.' });
  }

  if (userRole === 'admin') {
    return next();
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { autorId: true },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado.' });
    }

    if (post.autorId !== userId) {
      return res.status(403).json({ message: 'Acesso negado. Você não é o autor deste post.' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Erro ao verificar a propriedade do post.' });
  }
};
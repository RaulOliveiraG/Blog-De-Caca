import { Request, Response } from 'express';
import { commentService } from '../services/commentService';

export const commentController = {
  create: async (req: Request, res: Response) => {
    try {
      const { texto, parentId } = req.body;
      const postId = parseInt(req.params.postId, 10);
      const autorId = req.user?.id;

      // Validação de segurança e de dados
      if (!autorId) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
      }
      if (!texto || texto.trim() === '') {
        return res.status(400).json({ message: 'O texto do comentário é obrigatório.' });
      }
      if (isNaN(postId)) {
        return res.status(400).json({ message: 'ID do post inválido.' });
      }

      const newComment = await commentService.createComment({
        texto,
        postId,
        autorId,
        parentId,
      });

      return res.status(201).json(newComment);
    } catch (error) {
      console.error('Erro ao criar comentário:', error);
      return res.status(500).json({ message: 'Erro interno ao criar o comentário.' });
    }
  },
  getByPostId: async (req: Request, res: Response) => {
    try {
      const postId = parseInt(req.params.postId, 10);

      if (isNaN(postId)) {
        return res.status(400).json({ message: 'ID do post inválido.' });
      }

      const commentTree = await commentService.getCommentsByPostId(postId);
      return res.status(200).json(commentTree);
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
      return res.status(500).json({ message: 'Erro interno ao buscar os comentários.' });
    }
  },
};
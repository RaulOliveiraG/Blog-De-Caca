import { Request, Response } from 'express';
import { commentService } from '../services/commentService';

export const commentController = {
  async create(req: Request, res: Response) {
    const { postId } = req.params;
    const { texto } = req.body;
    const autorId = req.user?.id;

    if (!texto) return res.status(400).json({ error: 'Texto do comentário é obrigatório.' });

    try {
      const novoComentario = await commentService.createComment(
        Number(postId),
        Number(autorId),
        texto
      );
      res.status(201).json(novoComentario);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar comentário.' });
    }
  },
  
  // Função para listar os comentários de um post
  async getByPostId(req: Request, res: Response) {
    const { postId } = req.params;  // Obtém o postId da URL

    try {
      const comentarios = await commentService.getCommentsByPost(Number(postId));  // Chama o serviço para buscar os comentários
      res.json(comentarios);  // Retorna os comentários
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar comentários.' });
    }
  },

  // Função para editar um comentário
  async update(req: Request, res: Response) {
    const { id } = req.params;     // Obtém o id do comentário da URL
    const { texto } = req.body;    // Obtém o texto do corpo da requisição
    const userId = req.user?.id;   // Obtém o ID do usuário autenticado

    try {
      const comentario = await commentService.findCommentById(Number(id));  // Busca o comentário
      if (!comentario) return res.status(404).json({ error: 'Comentário não encontrado.' });
      
      if (comentario.autorId !== userId)  // Verifica se o usuário é o autor do comentário
        return res.status(403).json({ error: 'Você só pode editar seus próprios comentários.' });

      const atualizado = await commentService.updateComment(Number(id), texto);  // Atualiza o comentário
      res.json(atualizado);  // Retorna o comentário atualizado
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar comentário.' });
    }
  },

  // Função para excluir um comentário
  async delete(req: Request, res: Response) {
    const { id } = req.params;   // Obtém o id do comentário da URL
    const userId = req.user?.id; // Obtém o ID do usuário autenticado
    const userRole = req.user?.role;  // Obtém o papel do usuário (admin ou não)

    try {
      const comentario = await commentService.findCommentById(Number(id));  // Busca o comentário
      if (!comentario) return res.status(404).json({ error: 'Comentário não encontrado.' });

      const isOwner = comentario.autorId === userId;   // Verifica se o usuário é o autor
      const isAdmin = userRole === 'admin';  // Verifica se o usuário é admin
      if (!isOwner && !isAdmin)   // Verifica se o usuário tem permissão para excluir
        return res.status(403).json({ error: 'Sem permissão para excluir.' });

      await commentService.deleteComment(Number(id));  // Deleta o comentário
      res.status(204).send();  // Retorna resposta de sucesso
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao deletar comentário.' });
    }
  }
};

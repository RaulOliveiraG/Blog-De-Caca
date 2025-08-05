import { Response, Request } from 'express';
import { postService } from '../services/postService';
import { Prisma, ReactionType } from '@prisma/client';
import { AuthRequest } from '../middlewares/authMiddleware'; // Importamos o tipo AuthRequest

export const postController = {
  // Rota protegida, usa AuthRequest
  create: async (req: AuthRequest, res: Response) => {
    const { titulo, texto, imagemUrl } = req.body;
    const autorId = req.user?.id;

    if (!autorId) return res.status(401).json({ message: 'Usuário não autenticado.' });
    if (!titulo || !texto) return res.status(400).json({ message: 'Título e texto são obrigatórios.' });

    try {
      const newPost = await postService.createPost({ titulo, texto, imagemUrl, autorId });
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar o post.', error });
    }
  },

  // Rota pública, usa Request normal
  getAll: async (req: Request, res: Response) => {
    try {
      const posts = await postService.findAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar os posts.', error });
    }
  },

  // Rota pública, usa Request normal
  getById: async (req: Request, res: Response) => {
    try {
      const post = await postService.findPostById(parseInt(req.params.id));
      if (!post) return res.status(404).json({ message: 'Post não encontrado.' });
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar o post.', error });
    }
  },

  // Rota protegida, usa AuthRequest
  update: async (req: AuthRequest, res: Response) => {
    try {
      // A verificação de propriedade (se o post pertence ao req.user.id)
      // é feita no postOwnershipMiddleware, então aqui podemos prosseguir.
      const updatedPost = await postService.updatePost(parseInt(req.params.id), req.body);
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar o post.', error });
    }
  },

  // Rota protegida, usa AuthRequest
  delete: async (req: AuthRequest, res: Response) => {
    try {
      // A verificação de propriedade é feita no postOwnershipMiddleware.
      await postService.deletePost(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar o post.', error });
    }
  },

  // Rota protegida, usa AuthRequest
  reactToPost: async (req: AuthRequest, res: Response) => {
    const postId = parseInt(req.params.id);
    const userId = req.user?.id;
    const { type } = req.body;

    if (!userId) return res.status(401).json({ message: 'Usuário não autenticado.' });
    if (!type || !Object.values(ReactionType).includes(type)) {
      return res.status(400).json({ message: 'Tipo de reação inválido.' });
    }

    try {
      const reaction = await postService.setReaction(postId, userId, type);
      res.status(200).json(reaction);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao reagir ao post.', error });
    }
  },

  // Rota protegida, usa AuthRequest
  removeReaction: async (req: AuthRequest, res: Response) => {
    const postId = parseInt(req.params.id);
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ message: 'Usuário não autenticado.' });

    try {
      await postService.removeReaction(postId, userId);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        return res.status(404).json({ message: 'Reação não encontrada.' });
      }
      res.status(500).json({ message: 'Erro ao remover a reação.', error });
    }
  },
};
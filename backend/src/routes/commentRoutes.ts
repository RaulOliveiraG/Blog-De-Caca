import { Router } from 'express';
import { commentController } from '../controllers/commentController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Rota para criar um comentário (exige autenticação)
router.post('/comentarios/:postId', authMiddleware, commentController.create);

// Rota para listar os comentários de um post (não exige autenticação)
router.get('/comentarios/:postId', commentController.getByPostId);

// Rota para editar um comentário (exige autenticação)
router.put('/comentarios/:id', authMiddleware, commentController.update);

// Rota para deletar um comentário (exige autenticação)
router.delete('/comentarios/:id', authMiddleware, commentController.delete);

export default router;

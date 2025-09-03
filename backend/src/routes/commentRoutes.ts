import { Router } from 'express';
import { commentController } from '../controllers/commentController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Comentários
 *   description: Gerenciamento de comentários nos posts
 */

/**
 * @swagger
 * /posts/{postId}/comments:
 *   post:
 *     summary: Cria um novo comentário em um post
 *     tags: [Comentários]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema: { type: 'integer' }
 *         description: O ID do post a ser comentado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [texto]
 *             properties:
 *               texto:
 *                 type: string
 *                 description: O conteúdo do comentário.
 *               parentId:
 *                 type: integer
 *                 description: O ID do comentário pai (para respostas).
 *     responses:
 *       201:
 *         description: Comentário criado com sucesso.
 *       400:
 *         description: Dados inválidos.
 *       401:
 *         description: Não autorizado.
 */
router.post('/posts/:postId/comments', authMiddleware, commentController.create);

/**
 * @swagger
 * /posts/{postId}/comments:
 *   get:
 *     summary: Retorna todos os comentários de um post em formato de árvore
 *     tags: [Comentários]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema: { type: 'integer' }
 *         description: O ID do post do qual buscar os comentários.
 *     responses:
 *       200:
 *         description: Uma lista de comentários em estrutura hierárquica.
 *       400:
 *         description: ID do post inválido.
 */
router.get('/posts/:postId/comments', commentController.getByPostId);


export default router;
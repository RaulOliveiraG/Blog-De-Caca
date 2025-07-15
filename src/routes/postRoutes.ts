// ARQUIVO: src/routes/postRoutes.ts

import { Router } from 'express';
import { postController } from '../controllers/postController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { postOwnershipMiddleware } from '../middlewares/postOwnershipMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Gerenciamento de posts e reações do blog
 * 
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// --- ROTAS DE POSTS ---

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria um novo post
 *     tags: [Posts]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { type: 'object', properties: { titulo: { type: 'string' }, texto: { type: 'string' }, imagemUrl: { type: 'string' } } }
 *     responses:
 *       201: { description: 'Post criado' }
 *       401: { description: 'Não autorizado' }
 */
router.post('/', authMiddleware, postController.create);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retorna a lista de todos os posts
 *     tags: [Posts]
 *     responses:
 *       200: { description: 'Lista de posts' }
 */
router.get('/', postController.getAll);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Retorna um post específico pelo ID
 *     tags: [Posts]
 *     parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }]
 *     responses:
 *       200: { description: 'Detalhes do post' }
 *       404: { description: 'Post não encontrado' }
 */
router.get('/:id', postController.getById);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualiza um post existente
 *     tags: [Posts]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: { type: 'object', properties: { titulo: { type: 'string' }, texto: { type: 'string' }, imagemUrl: { type: 'string' } } }
 *     responses:
 *       200: { description: 'Post atualizado' }
 *       403: { description: 'Acesso negado' }
 */
router.put('/:id', authMiddleware, postOwnershipMiddleware, postController.update);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Deleta um post
 *     tags: [Posts]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }]
 *     responses:
 *       204: { description: 'Post deletado' }
 *       403: { description: 'Acesso negado' }
 */
router.delete('/:id', authMiddleware, postOwnershipMiddleware, postController.delete);

// --- ROTAS DE REAÇÕES ---

/**
 * @swagger
 * /posts/{id}/react:
 *   post:
 *     summary: Adiciona ou atualiza uma reação a um post
 *     tags: [Posts]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { type: 'object', required: ['type'], properties: { type: { type: 'string', enum: [LIKE, LOVE, HAHA, WOW, SAD, ANGRY] } } }
 *     responses:
 *       200: { description: 'Reação adicionada/atualizada' }
 *       400: { description: 'Tipo de reação inválido' }
 */
router.post('/:id/react', authMiddleware, postController.reactToPost);

/**
 * @swagger
 * /posts/{id}/react:
 *   delete:
 *     summary: Remove uma reação de um post
 *     tags: [Posts]
 *     security: [{ bearerAuth: [] }]
 *     parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }]
 *     responses:
 *       204: { description: 'Reação removida' }
 *       404: { description: 'Reação não encontrada' }
 */
router.delete('/:id/react', authMiddleware, postController.removeReaction);

export default router;
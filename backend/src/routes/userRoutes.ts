import { Router } from 'express';
import { getAllUsers, deleteUser, updateUser, search } from '../controllers/userController';
import { onlyAdmin } from '../middlewares/authAdmin';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários (requer privilégios de admin para a maioria das rotas)
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retorna uma lista de todos os usuários
 *     tags: [Usuários]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Lista de usuários.
 *       401:
 *         description: Não autorizado.
 *       403:
 *         description: Acesso negado (não é admin).
 */
router.get('/', authMiddleware, onlyAdmin, getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags: [Usuários]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: O ID do usuário a ser deletado.
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso.
 *       403:
 *         description: Acesso negado.
 *       404:
 *         description: Usuário não encontrado.
 */
router.delete('/:id', authMiddleware, deleteUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualiza um usuário pelo ID
 *     tags: [Usuários]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: O ID do usuário a ser atualizado.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname: { type: string }
 *               nome: { type: string }
 *               email: { type: string }
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *       403:
 *         description: Acesso negado.
 *       404:
 *         description: Usuário não encontrado.
 */
router.put("/:id", authMiddleware, updateUser);

/**
 * @swagger
 * /users/search:
 *   get:
 *     summary: Busca usuários por nome ou nickname com paginação
 *     tags: [Usuários]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema: { type: string }
 *         description: O termo a ser buscado no nome ou nickname do usuário.
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *         description: O número da página.
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *         description: O número de resultados por página.
 *     responses:
 *       200:
 *         description: Uma lista paginada de usuários.
 *       400:
 *         description: Termo de busca ausente.
 *       401:
 *         description: Não autorizado.
 */
router.get('/search', authMiddleware, search);

export default router;
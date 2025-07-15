// src/routes/userRoutes.ts

import { Router } from 'express';
// IMPORTAÇÃO ATUALIZADA: adicionamos 'deleteUser'
import { registerUser, getAllUsers, deleteUser } from '../controllers/userController';
import { LoginUser } from '../controllers/LoginUser';
import { validateUser } from '../middlewares/validateUser';
import { onlyAdmin } from '../middlewares/authAdmin';
import { validateLogin } from '../middlewares/validateLogin';
import { LimitadorTentativasLogin } from '../middlewares/LoginRateLimiter';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * /registro:
 *   post:
 *     summary: Cadastro de novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nickname, senha, cpf, nome, email]
 *             properties:
 *               nickname: { type: string }
 *               senha: { type: string }
 *               cpf: { type: string }
 *               nome: { type: string }
 *               email: { type: string }
 *               numero_telefone: { type: string }
 *               foto_perfil: { type: string }
 *     responses:
 *       201: { description: 'Usuário criado com sucesso' }
 *       400: { description: 'Erro de validação ou usuário já existe' }
 */
router.post('/registro', validateUser, registerUser);

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Retorna todos os usuários (apenas admin)
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       401:
 *         description: Não autenticado ou token inválido
 *       403:
 *         description: Acesso negado (não é admin)
 */
router.get('/usuarios', authMiddleware, onlyAdmin, getAllUsers);

// --- NOVA ROTA E DOCUMENTAÇÃO SWAGGER ADICIONADAS ---
/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Deleta um usuário
 *     tags: [Usuários]
 *     description: Deleta um usuário pelo seu ID. Acesso permitido apenas para administradores ou para o próprio usuário.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID numérico do usuário a ser deletado.
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso (sem conteúdo).
 *       401:
 *         description: Não autenticado (token não fornecido ou inválido).
 *       403:
 *         description: Acesso negado (usuário não é admin e nem o dono da conta).
 *       404:
 *         description: Usuário não encontrado.
 */
router.delete('/usuarios/:id', authMiddleware, deleteUser);


/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login de usuário
 *     tags: [Login]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, senha]
 *             properties:
 *               email: { type: string }
 *               senha: { type: string }
 *     responses:
 *       200: { description: 'Usuário logado com sucesso' }
 *       400: { description: 'Credenciais inválidas ou erro de validação' }
 *       429: { description: 'Muitas tentativas de login. Tente novamente mais tarde.' }
 */
router.post('/login', LimitadorTentativasLogin, validateLogin, LoginUser);

export default router;
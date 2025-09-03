import { Router } from 'express';
import { authController } from '../controllers/authController';
import { validateUser } from '../middlewares/validateUser';
import { validateLogin } from '../middlewares/validateLogin';
import { LimitadorTentativasLogin } from '../middlewares/LoginRateLimiter';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Rotas para registro, login e gerenciamento de sessão
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
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
 *     responses:
 *       201: { description: 'Usuário criado com sucesso' }
 *       400: { description: 'Dados inválidos ou usuário já existe' }
 */
router.post('/register', validateUser, authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário e retorna tokens
 *     tags: [Autenticação]
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
 *       200: { description: 'Login bem-sucedido' }
 *       401: { description: 'Credenciais inválidas' }
 */
router.post('/login', LimitadorTentativasLogin, validateLogin, authController.login);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags: [Autenticação]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Dados do usuário.
 *       401:
 *         description: Não autorizado (token inválido ou ausente).
 */
router.get('/me', authMiddleware, authController.getMe);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Gera um novo access token usando o refresh token
 *     tags: [Autenticação]
 *     description: Esta rota lê o refresh token de um cookie httpOnly e retorna um novo access token.
 *     responses:
 *       200:
 *         description: Novo access token gerado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       401:
 *         description: Refresh token não encontrado no cookie.
 *       403:
 *         description: Refresh token inválido ou expirado.
 */
router.post('/refresh-token', authController.refreshToken);

export default router;
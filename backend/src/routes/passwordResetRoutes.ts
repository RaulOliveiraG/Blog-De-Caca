import { Router } from 'express';
import { requestReset, resetPassword } from '../controllers/passwordResetController';

const router = Router();

/**
 * @swagger
 * /password-reset/request:
 *   post:
 *     summary: Solicita recuperação de senha
 *     tags: [Recuperação de Senha]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Se o e-mail existir, um link será enviado.
 */
router.post('/password-reset/request', requestReset);

/**
 * @swagger
 * /password-reset/reset:
 *   post:
 *     summary: Redefine a senha usando token
 *     tags: [Recuperação de Senha]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso.
 *       400:
 *         description: Token inválido ou expirado.
 */
router.post('/password-reset/reset', resetPassword);

export default router;
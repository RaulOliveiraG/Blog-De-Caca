import { Router } from 'express';
import { registerUser } from '../controllers/userController';
import { validateUser } from '../middlewares/validateUser';

const router = Router();

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cadastro de novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nickname
 *               - senha
 *               - cpf
 *               - nome
 *               - email
 *             properties:
 *               nickname:
 *                 type: string
 *               senha:
 *                 type: string
 *               cpf:
 *                 type: string
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               numero_telefone:
 *                 type: string
 *               foto_perfil:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro de validação ou usuário já existe
 */
router.post('/usuarios', validateUser, registerUser);

export default router;
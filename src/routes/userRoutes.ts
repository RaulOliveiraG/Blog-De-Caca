import { Router } from 'express';
import { registerUser } from '../controllers/userController';
import { validateUser } from '../middlewares/validateUser';
import { onlyAdmin } from '../middlewares/authAdmin';
import { getAllUsers } from '../controllers/userController';

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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: integer }
 *                   nickname: { type: string }
 *                   cpf: { type: string }
 *                   nome: { type: string }
 *                   email: { type: string }
 *                   numero_telefone: { type: string }
 *                   data_cadastro: { type: string }
 *                   foto_perfil: { type: string }
 *                   role: { type: string }
 *       403:
 *         description: Acesso negado
 */
router.get('/usuarios', onlyAdmin, getAllUsers);

export default router;
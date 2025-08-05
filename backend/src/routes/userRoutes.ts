import { Router } from 'express';
import { registerUser, getAllUsers, deleteUser, updateUser } from '../controllers/userController';
import { LoginUser } from '../controllers/LoginUser';
import { validateUser } from '../middlewares/validateUser';
import { onlyAdmin } from '../middlewares/authAdmin';
import { validateLogin } from '../middlewares/validateLogin';
import { LimitadorTentativasLogin } from '../middlewares/LoginRateLimiter';
// Importamos o tipo AuthRequest do middleware
import { authMiddleware, AuthRequest } from '../middlewares/authMiddleware';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

// --- ROTAS DE AUTENTICAÇÃO E REGISTRO ---
router.post('/registro', validateUser, registerUser);
router.post('/login', LimitadorTentativasLogin, validateLogin, LoginUser);

// --- ROTA DE PERFIL ---
router.get('/profile', authMiddleware, async (req: AuthRequest, res) => {
  // --- CORREÇÃO CRÍTICA ---
  // Lemos o ID de 'req.user.id', que é o que nosso middleware padronizado fornece.
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'ID do usuário não encontrado no token.' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, nome: true, email: true },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

// --- ROTAS DE GERENCIAMENTO DE USUÁRIOS ---
// Note que o prefixo '/usuarios' deve ser definido no seu app.ts/index.ts (ex: app.use('/api/users', userRoutes))
router.get('/', authMiddleware, onlyAdmin, getAllUsers);
router.delete('/:id', authMiddleware, deleteUser);
router.put("/:id", authMiddleware, updateUser);

export default router;
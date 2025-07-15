import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { Prisma } from '@prisma/client';

export async function registerUser(req: Request, res: Response) {
  try {
    const user = await userService.createUser(req.body);
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await userService.getAllUsersService();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários.', error });
  }
}

/**
 * Controller para deletar um usuário.
 * Verifica se o requisitante é admin ou o próprio usuário.
 */
export async function deleteUser(req: Request, res: Response) {
  // Agora o TypeScript sabe que req.user é do tipo UserPayload | undefined
  const loggedInUser = req.user;
  const userIdToDelete = parseInt(req.params.id, 10);

  // Verificação de segurança: garante que o middleware de autenticação funcionou.
  // Isso também resolve qualquer aviso do TypeScript sobre 'loggedInUser' ser possivelmente 'undefined'.
  if (!loggedInUser) {
    return res.status(401).json({ message: 'Não autenticado. Token inválido ou ausente.' });
  }

  if (isNaN(userIdToDelete)) {
    return res.status(400).json({ message: 'ID de usuário inválido.' });
  }

  // A partir daqui, o TypeScript sabe que loggedInUser não é nulo.
  // O erro original nesta linha desaparecerá.
  if (loggedInUser.role !== 'admin' && loggedInUser.id !== userIdToDelete) {
    return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para realizar esta ação.' });
  }

  try {
    await userService.deleteUserById(userIdToDelete);
    res.status(204).send();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    
    console.error('Erro ao deletar usuário:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}
// --- MODIFICAÇÃO AQUI ---
import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { Prisma } from '@prisma/client';
import { generateTokensAndSetCookie } from '../services/authService';

export async function registerUser(req: Request, res: Response) {
  try {
    // 1. Cria o usuário. Agora 'novoUsuario' é o objeto User completo, incluindo 'senha_hash'.
    const novoUsuario = await userService.createUser(req.body);

    // 2. GERA E ENVIA OS TOKENS. Esta chamada agora funciona, pois 'novoUsuario' tem o tipo correto.
    const { accessToken } = generateTokensAndSetCookie(res, novoUsuario);

    // 3. LIMPA A SENHA ANTES DE ENVIAR A RESPOSTA.
    const { senha_hash: _, ...userWithoutPassword } = novoUsuario;

    // 4. Retorna uma resposta de sucesso com o usuário limpo e o token.
    return res.status(201).json({
      message: 'Usuário registrado com sucesso!',
      user: userWithoutPassword,
      accessToken,
    });

  } catch (error: any) {
    // Tratamento de erro melhorado para não expor a mensagem de erro interna
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return res.status(409).json({ message: 'CPF ou Email já cadastrado.' });
    }
    // Para outros erros conhecidos (como validações do service)
    if (error.message === 'E-mail já cadastrado.' || error.message === 'CPF já cadastrado.') {
        return res.status(409).json({ message: error.message });
    }
    // Erro genérico
    console.error("Erro no registro:", error);
    return res.status(500).json({ message: 'Ocorreu um erro interno no servidor.' });
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

export async function deleteUser(req: Request, res: Response) {
  const loggedInUser = req.user;
  const userIdToDelete = parseInt(req.params.id, 10);

  if (!loggedInUser) {
    return res.status(401).json({ message: 'Não autenticado. Token inválido ou ausente.' });
  }

  if (isNaN(userIdToDelete)) {
    return res.status(400).json({ message: 'ID de usuário inválido.' });
  }

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

export async function updateUser(req: Request, res: Response) {
  const loggedInUser = req.user;
  const userIdToUpdate = parseInt(req.params.id, 10);
  const userData = req.body;

  if (!loggedInUser) {
    return res.status(401).json({ message: 'Não autenticado. Token inválido ou ausente.' });
  }

  if (isNaN(userIdToUpdate)) {
    return res.status(400).json({ message: 'ID de usuário inválido.' });
  }

  if (loggedInUser.role !== 'admin' && loggedInUser.id !== userIdToUpdate) {
    return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para realizar esta ação.' });
  }

  try {
    const updatedUser = await userService.updateUserById(userIdToUpdate, userData);
    return res.status(200).json(updatedUser);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    console.error('Erro ao atualizar usuário:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
}
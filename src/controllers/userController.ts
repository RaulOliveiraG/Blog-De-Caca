import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { getAllUsersService } from '../services/userService';

export async function registerUser(req: Request, res: Response) {
  try {
    const user = await userService.createUser(req.body);//pega os dados do corpo da requisição
    return res.status(201).json(user);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });//se der erro retorna 400 e mostra oque deu errado
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await getAllUsersService();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários.', error });
  }
}  
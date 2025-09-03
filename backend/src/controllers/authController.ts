import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as userService from '../services/userService';
import { LoginUser } from './LoginUser';
import { registerUser } from './userController';

export const authController = {
  // Funções movidas para cá
  login: LoginUser,
  register: registerUser,

  // Rota para obter dados do usuário logado
  getMe: async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Não autenticado.' });
    }

    try {
      const user = await userService.findUserById(userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },

  // Rota para renovar o access token
  refreshToken: (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token não encontrado.' });
    }

    try {
      // Verifica se as chaves secretas estão definidas no ambiente
      if (!process.env.REFRESH_TOKEN_SECRET || !process.env.ACCESS_TOKEN_SECRET) {
        throw new Error('As chaves secretas de token não estão definidas.');
      }

      // Valida o refresh token
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as { id: number };

      // Gera um novo access token
      const payload = { id: decoded.id };
      const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m',
      });

      return res.status(200).json({ accessToken: newAccessToken });

    } catch (error) {
      // Se o token for inválido ou expirado, jwt.verify lança um erro
      return res.status(403).json({ message: 'Refresh token inválido ou expirado.' });
    }
  },
};
import { Request, Response } from 'express';
import * as userService from '../services/userService';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const authController = {
  // --- FUNÇÃO DE REGISTRO CORRIGIDA ---
  register: async (req: Request, res: Response) => {
    try {
      // 1. Cria o usuário no banco (seu código original)
      const user = await userService.createUser(req.body);

      // 2. GERA O TOKEN (A PARTE QUE FALTAVA)
      const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
      if (!jwtSecret) {
        // Log de erro no servidor, mas não exponha para o cliente
        console.error("ERRO CRÍTICO: ACCESS_TOKEN_SECRET não está definido no .env");
        return res.status(500).json({ message: 'Erro de configuração no servidor.' });
      }

      const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, {
        expiresIn: '1d', // Token válido por 1 dia
      });

      // 3. Retorna o token para o cliente
      // Omitimos a senha do objeto de usuário retornado
      const { senha: _, ...userWithoutPassword } = user;
      return res.status(201).json({ user: userWithoutPassword, token });

    } catch (error: any) {
      // Trata erro de email duplicado
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        return res.status(409).json({ message: 'Este email já está em uso.' });
      }
      return res.status(400).json({ message: error.message });
    }
  },

  // --- FUNÇÃO DE LOGIN (ESSENCIAL) ---
  login: async (req: Request, res: Response) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    try {
      // 1. Encontra o usuário pelo email
      const user = await userService.findUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      // 2. Compara a senha enviada com a senha hasheada no banco
      const isPasswordValid = await bcrypt.compare(senha, user.senha);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenciais inválidas.' });
      }

      // 3. GERA O TOKEN (A mesma lógica do registro)
      const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
      if (!jwtSecret) {
        console.error("ERRO CRÍTICO: ACCESS_TOKEN_SECRET não está definido no .env");
        return res.status(500).json({ message: 'Erro de configuração no servidor.' });
      }

      const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, {
        expiresIn: '1d',
      });

      // 4. Retorna o token para o cliente
      const { senha: _, ...userWithoutPassword } = user;
      return res.status(200).json({ user: userWithoutPassword, token });

    } catch (error: any) {
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  },
};
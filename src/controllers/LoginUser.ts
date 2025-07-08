// src/controllers/LoginUser.ts

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { adicionarTentativa, limparTentativas } from '../middlewares/LoginRateLimiter';
import { autenticarUsuario } from '../services/authService';

export async function LoginUser(req: Request, res: Response) {
  const { email, senha } = req.body;

  try {
    // 1. Autentica o usuário usando o serviço
    const usuario = await autenticarUsuario(email, senha);

    if (!usuario) {
      adicionarTentativa(email);
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    // 2. Limpa as tentativas de login falhas se a autenticação for bem-sucedida
    limparTentativas(email);

    // 3. Cria o payload para os tokens com o ID do usuário
    const payload = { userId: usuario.id };

    // 4. Gera o Access Token (curta duração: 15 minutos)
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: '15m',
    });

    // 5. Gera o Refresh Token (longa duração: 7 dias)
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: '7d',
    });

    // 6. Envia o Refresh Token em um cookie seguro e HttpOnly
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    });

    // 7. Envia o Access Token no corpo da resposta JSON
    return res.status(200).json({
      message: 'Login realizado com sucesso!',
      accessToken,
    });

  } catch (error) {
    console.error('Erro inesperado durante o login:', error);
    return res.status(500).json({ erro: 'Ocorreu um erro interno no servidor.' });
  }
}
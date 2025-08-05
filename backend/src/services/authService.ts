import bcrypt from 'bcrypt';
import prisma from '../config/database';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

export async function autenticarUsuario(email: string, senha: string): Promise<User | null> {
  // Busca o usuário no banco de dados, obtendo o objeto completo
  const usuario = await prisma.user.findUnique({ where: { email } });

  // Se não encontrar o usuário ou a senha estiver incorreta, retorna null
  if (!usuario || !(await bcrypt.compare(senha, usuario.senha_hash))) {
    return null;
  }

  return usuario;
}

export function generateTokensAndSetCookie(res: Response, user: User): { accessToken: string } {
  const jwtAccessSecret = process.env.ACCESS_TOKEN_SECRET;
  const jwtRefreshSecret = process.env.REFRESH_TOKEN_SECRET;

  if (!jwtAccessSecret || !jwtRefreshSecret) {
    console.error("ERRO CRÍTICO: Segredos JWT não definidos no .env");
    throw new Error("Erro de configuração interna do servidor.");
  }

  const payload = { id: user.id, role: user.role };

  const accessToken = jwt.sign(payload, jwtAccessSecret, {
    expiresIn: '15m',
  });

  const refreshToken = jwt.sign(payload, jwtRefreshSecret, {
    expiresIn: '7d',
  });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return { accessToken };
}
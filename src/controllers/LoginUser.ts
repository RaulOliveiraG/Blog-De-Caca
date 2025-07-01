import { Request, Response } from 'express';
//import jwt from 'jsonwebtoken';
import { adicionarTentativa, limparTentativas } from '../middlewares/LoginRateLimiter';
import { autenticarUsuario } from '../services/authService';

export async function LoginUser(req: Request, res: Response) {
  const { email, senha } = req.body;

  // Usa o service para autenticar
  const usuario = await autenticarUsuario(email, senha);

  if (!usuario) {
    adicionarTentativa(email);
    return res.status(400).json({ erro: 'Credencial inválida!' });
  }

  limparTentativas(email);

  /* [Gera access token (15min) e refresh token (7d)]
     |
[Envia access token no corpo da resposta]
[Envia refresh token em cookie HTTP-only] */
}
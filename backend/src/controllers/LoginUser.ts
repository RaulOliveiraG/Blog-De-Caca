import { Request, Response } from 'express';
import { adicionarTentativa, limparTentativas } from '../middlewares/LoginRateLimiter';
import { autenticarUsuario, generateTokensAndSetCookie } from '../services/authService';

export async function LoginUser(req: Request, res: Response) {
  const { email, senha } = req.body;

  try {
    const usuario = await autenticarUsuario(email, senha);

    if (!usuario) {
      adicionarTentativa(email);
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    limparTentativas(email);

    const { accessToken } = generateTokensAndSetCookie(res, usuario);

    return res.status(200).json({
      message: 'Login realizado com sucesso!',
      accessToken,
    });

  } catch (error) {
    console.error('Erro inesperado durante o login:', error);
    return res.status(500).json({ erro: 'Ocorreu um erro interno no servidor.' });
  }
}
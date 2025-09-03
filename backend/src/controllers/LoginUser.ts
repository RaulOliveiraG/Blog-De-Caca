import { Request, Response } from 'express';
    import jwt from 'jsonwebtoken';
    import { adicionarTentativa, limparTentativas } from '../middlewares/LoginRateLimiter';
    import { autenticarUsuario } from '../services/authService';

    export async function LoginUser(req: Request, res: Response) {
      const { email, senha } = req.body;

      try {
        const usuario = await autenticarUsuario(email, senha);

        if (!usuario) {
          adicionarTentativa(req);
          return res.status(401).json({ erro: 'Credenciais inválidas' });
        }

        limparTentativas(req);


    const payload = { id: usuario.id };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: '15m',
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: '7d',
    });


    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: 'Login realizado com sucesso!',
      accessToken,
    });

  } catch (error) {
    console.error('Erro inesperado durante o login:', error);
    return res.status(500).json({ erro: 'Ocorreu um erro interno no servidor.' });
  }
}
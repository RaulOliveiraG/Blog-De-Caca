import { Request, Response, NextFunction } from 'express';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

// Definindo o tipo do payload que esperamos do token
interface UserPayload {
  id: number;
  role: string;
}

// Estendendo a interface Request do Express para que o TypeScript
// reconheça nossa nova propriedade 'user'.
export interface AuthRequest extends Request {
  user?: UserPayload; // A propriedade agora é 'user' e é opcional
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido ou mal formatado.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!jwtSecret) {
      console.error("ERRO CRÍTICO: ACCESS_TOKEN_SECRET não está definido no .env");
      return res.status(500).json({ message: 'Erro de configuração no servidor.' });
    }

    // --- CORREÇÃO CRÍTICA ---
    // Decodificamos o token e o anexamos a 'req.user', que é a convenção.
    const decoded = jwt.verify(token, jwtSecret) as UserPayload;
    req.user = decoded; // Agora 'req.user' contém { id: 6, role: 'user' }
    
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ message: 'Token expirado. Por favor, faça login novamente.' });
    }
    if (error instanceof JsonWebTokenError) {
      return res.status(401).json({ message: 'Token inválido.' });
    }
    return res.status(401).json({ message: 'Falha na autenticação.' });
  }
};
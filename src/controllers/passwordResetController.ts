import { Request, Response } from 'express';
import * as passwordResetService from '../services/passwordResetService';

export async function requestReset(req: Request, res: Response) {
  const { email } = req.body;  // pega o email do corpo da requisição
  const baseUrl = 'http://localhost:3000'; // front roda aqui
  await passwordResetService.requestPasswordReset(email, baseUrl);
    //não é ideal que a aplicação diga se o email existe ou não, é bom manter sigilo..
  return res.status(200).json({ message: 'Se o e-mail estiver correto, um link de redefinição foi enviado.' });
}
    export async function resetPassword(req: Request, res: Response) {
    // Extrai o token e a nova senha do body da requisição
    const { token, newPassword } = req.body;

    //verifica se token e newPassword estão preenchidos
    if (!token || !newPassword) {.
        return res.status(400).json({ error: 'Token e nova senha são obrigatórios.' });
  }

    //testa força da nova senha (igual ao cadastro)
    const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!senhaRegex.test(newPassword)) {
        return res.status(400).json({ error: 'A senha deve ter no mínimo 8 caracteres, incluindo letras e números.' });
  }

  try {
    //tenta chamar o service para redefinir 
    await passwordResetService.resetPassword(token, newPassword);
                 return res.status(200).json({ message: 'Senha redefinida com sucesso.' });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
}
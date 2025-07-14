import { Request, Response } from 'express';
import * as passwordResetService from '../services/passwordResetService';

export async function requestReset(req: Request, res: Response) {
  try {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'O campo de e-mail é obrigatório.' });
    }

    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    
    // Agora, qualquer erro lançado pelo serviço será capturado aqui.
    await passwordResetService.requestPasswordReset(email, baseUrl);

    // A resposta de sucesso é sempre a mesma, por segurança.
    return res.status(200).json({ message: 'Se o e-mail estiver cadastrado em nosso sistema, um link para redefinição de senha será enviado.' });

  } catch (error) {
    // Este bloco catch agora lida com erros inesperados (ex: falha no Nodemailer, DB offline).
    console.error('Falha na solicitação de redefinição de senha:', error);
    // Envia uma resposta de erro genérica para o cliente.
    return res.status(500).json({ message: 'Ocorreu um erro interno ao processar sua solicitação.' });
  }
}

// Sua função resetPassword já está boa com o try...catch, mantenha como está.
export async function resetPassword(req: Request, res: Response) {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ error: 'Token e nova senha são obrigatórios.' });
    }

    const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!senhaRegex.test(newPassword)) {
        return res.status(400).json({ error: 'A senha deve ter no mínimo 8 caracteres, incluindo letras e números.' });
    }

    try {
        await passwordResetService.resetPassword(token, newPassword);
        return res.status(200).json({ message: 'Senha redefinida com sucesso.' });
    } catch (err: any) {
        return res.status(400).json({ error: err.message });
    }
}
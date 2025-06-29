import { Request, Response, NextFunction } from 'express';

export function validateUser(req: Request, res: Response, next: NextFunction) {
  const { nickname, senha, cpf, nome, email } = req.body;//"divide" a requisição


  if (!nickname || !senha || !cpf || !nome || !email) {//verifica se o que é obrigatorio está preenchido
    return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
  }

//mínimo 8 caracteres, pelo menos 1 letra e 1 número
const senhaRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
  if (!senhaRegex.test(senha)) {
    return res.status(400).json({ error: 'A senha deve ter no mínimo 8 caracteres, incluindo letras e números.' });
  }

  // email simples
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   // valida o formato de email
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'E-mail inválido.' });
  }
  // Se passar de todas as validações, chama o próximo middleware ou vai pros controllers
  next();
}
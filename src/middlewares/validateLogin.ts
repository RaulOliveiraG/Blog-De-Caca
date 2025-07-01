import {Request, Response, NextFunction} from 'express';
export function validateLogin(req:Request, res:Response, next:NextFunction){
const {email, senha} = req.body;

if (!email || !senha){
    return res.status(400).json({ error: 'Todos os campos devem ser obrigatóriamente preenchidos.'});
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if(!emailRegex.test(email)){
    return res.status(400).json({ error: 'Formato de e-mail inválido.'});
}

/*
{
"Email": "borbagenial@gmail.com",
"Senha": "Bernardo123."
}
*/

next();
}
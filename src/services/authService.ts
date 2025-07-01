import bcrypt from 'bcrypt';
import prisma from '../config/database';

export async function autenticarUsuario(email: string, senha: string) {
  // Busca o usuário no banco de dados
  const usuario = await prisma.user.findUnique({ where: { email } });

  // Se não encontrar o usuário ou a senha estiver incorreta
  if (!usuario || !(await bcrypt.compare(senha, usuario.senha_hash))) {
    return null;
  }

  // Retorna o usuário autenticado (sem a senha)
  const { senha_hash, ...usuarioSemSenha } = usuario;
  return usuarioSemSenha;
}
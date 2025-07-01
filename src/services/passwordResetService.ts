import prisma from '../config/database';
import crypto from 'crypto';
import bcrypt from 'bcrypt';


export async function requestPasswordReset(email: string, baseUrl: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return;//se o usuario nao existir não retorna nada, e nem fala se o email existe ou não para manter sigilo
  }

  // Gera token com randomBytes
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 60 * 60 * 500); //meia hora

  // Salva token no banco
  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt,
    }
  });

  // Monta link com o token...
  const link = `${baseUrl}/reset-password?token=${token}`;
  
  // como enviar o email de verdade????
  console.log(`Link de redefinição de senha: ${link}`);//console com o link para testar...
}

export async function resetPassword(token: string, newPassword: string) {
    //validação de token...
  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
    include: { user: true }
  });

  if (!resetToken || resetToken.used || resetToken.expiresAt < new Date()) {//se o token nao existe, foi usado ou expirou
    throw new Error('Token inválido ou expirado.');
  }

  // Muda para a nova senha
  const senha_hash = await bcrypt.hash(newPassword, 12);//bcrypt custo 12 novamente
  await prisma.user.update({
    where: { id: resetToken.userId },//id do usuario que foi gerado o token
    data: { senha_hash }// nova senha
  });

  // Marca token como usado
  await prisma.passwordResetToken.update({
    where: { id: resetToken.id },
    data: { used: true }
  });
}
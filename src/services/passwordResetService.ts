import prisma from '../config/database';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { sendEmail } from './emailService';

export async function requestPasswordReset(email: string, baseUrl: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    // Retorna silenciosamente para não revelar se o e-mail existe.
    return;
  }

  const token = crypto.randomBytes(32).toString('hex');
  // O token expira em 30 minutos.
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt,
    },
  });

  const link = `${baseUrl}/reset-password?token=${token}`;

  const subject = 'Redefinição de Senha para o Seu Blog';
  const textBody = `Olá ${user.nome || 'usuário'},\n\nVocê solicitou a redefinição de sua senha. Clique no link a seguir para continuar: ${link}\n\nSe você não solicitou isso, por favor, ignore este email.\n\nObrigado,\nA Equipe do Blog`;
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Redefinição de Senha</h2>
      <p>Olá ${user.nome || 'usuário'},</p>
      <p>Recebemos uma solicitação para redefinir a senha da sua conta. Para prosseguir, clique no botão abaixo:</p>
      <a href="${link}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
        Redefinir Senha
      </a>
      <p>O link expirará em 30 minutos.</p>
      <p>Se você não fez essa solicitação, pode ignorar este email com segurança.</p>
      <hr>
      <p>Se tiver problemas com o botão, copie e cole a seguinte URL no seu navegador:</p>
      <p><a href="${link}">${link}</a></p>
      <br>
      <p>Obrigado,</p>
      <p><strong>A Equipe do Blog</strong></p>
    </div>
  `;

  await sendEmail({
    to: user.email,
    subject: subject,
    text: textBody,
    html: htmlBody,
  });

  console.log(`Email de redefinição enviado para ${user.email}`);
}

export async function resetPassword(token: string, newPassword: string) {
  const passwordResetToken = await prisma.passwordResetToken.findUnique({
    where: { token },
  });

  if (!passwordResetToken || passwordResetToken.used || new Date() > passwordResetToken.expiresAt) {
    throw new Error('Token inválido, expirado ou já utilizado.');
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  await prisma.$transaction([
    prisma.user.update({
      where: { id: passwordResetToken.userId },
      data: {
        senha_hash: hashedPassword },
    }),
    prisma.passwordResetToken.update({
      where: { id: passwordResetToken.id },
      data: { used: true },
    }),
  ]);
}
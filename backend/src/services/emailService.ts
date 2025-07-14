// emailService.ts (VERSÃO CORRETA PARA GMAIL)

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: true, // <--- ESTA É A LINHA QUE FALTAVA! É ESSENCIAL.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Deve ser a sua NOVA senha de app
  },
});

export async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    });

    // Mudei o log para ficar mais claro que está usando Gmail
    console.log('Email enviado via Gmail: %s', info.messageId);
  } catch (error) {
    // Mudei o log de erro também
    console.error('Erro ao enviar o email via Gmail:', error);
    throw new Error('Não foi possível enviar o email.');
  }
}
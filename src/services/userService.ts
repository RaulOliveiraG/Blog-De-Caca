import prisma from '../config/database';
import bcrypt from 'bcrypt';

interface CreateUserDTO {//define quais serão os dados para criar um usuario....
//nosso "data" abaixo:
  nickname: string;
  senha: string;
  cpf: string;
  nome: string;
  email: string;
  numero_telefone?: string;
  foto_perfil?: string;
}

export async function createUser(data: CreateUserDTO) {
  // Verifica se email já existe
  const existingEmail = await prisma.user.findUnique({
    where: { email: data.email }//procura onde o email no banco é igual a "data"email, no caso o email que o usuario digitou
  });

  if (existingEmail) {
    throw new Error('E-mail já cadastrado.');
  }

  // Verifica se CPF já existe
  const existingCpf = await prisma.user.findUnique({
    where: { cpf: data.cpf }//procura onde o cpf no banco é igual a "data"cpf
  });

  if (existingCpf) {
    throw new Error('CPF já cadastrado.');
  }

  // Hash da senha
  const senha_hash = await bcrypt.hash(data.senha, 12);//Criptografa a senha usando bcrypt com custo 12
  //o custo 12, define quantas vezes a senha vai ser processada para gerar um hash, quanto maior mais lento e mais seguro...

  // Verifica se é o primeiro usuário
  const userCount = await prisma.user.count();

  const usuario = await prisma.user.create({
    data: {//passa as informações de "data" para o formato que será enviado ao banco
      nickname: data.nickname,
      senha_hash,//senha já criptografada 
      cpf: data.cpf,
      nome: data.nome,
      email: data.email,
      numero_telefone: data.numero_telefone,
      foto_perfil: data.foto_perfil,
      role: userCount === 0 ? 'admin' : 'user'//se for o primeiro vira admin, se nao for vira user
    }
  });

  // Não retorna senha_hash
  const { senha_hash: _, ...userWithoutPassword } = usuario;//remove o campo senha_hash do return abaixo, por segurança....
  return userWithoutPassword;
}
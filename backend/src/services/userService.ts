import prisma from '../config/database';
import bcrypt from 'bcrypt';

interface CreateUserDTO {
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
    where: { email: data.email }
  });

  if (existingEmail) {
    throw new Error('E-mail já cadastrado.');
  }

  // Verifica se CPF já existe
  const existingCpf = await prisma.user.findUnique({
    where: { cpf: data.cpf }
  });

  if (existingCpf) {
    throw new Error('CPF já cadastrado.');
  }

  // Hash da senha
  const senha_hash = await bcrypt.hash(data.senha, 12);

  // Verifica se é o primeiro usuário
  const userCount = await prisma.user.count();

  const usuario = await prisma.user.create({
    data: {
      nickname: data.nickname,
      senha_hash,
      cpf: data.cpf,
      nome: data.nome,
      email: data.email,
      numero_telefone: data.numero_telefone,
      foto_perfil: data.foto_perfil,
      role: userCount === 0 ? 'admin' : 'user'
    }
  });
  
  const { senha_hash: _, ...userWithoutPassword } = usuario;
  return userWithoutPassword;
}

export async function getAllUsersService() {
  return prisma.user.findMany({
    select: {
      id: true,
      nickname: true,
      cpf: true,
      nome: true,
      email: true,
      numero_telefone: true,
      data_cadastro: true,
      foto_perfil: true,
      role: true,
    },
  });
}

export async function deleteUserById(id: number) {
  return prisma.user.delete({
    where: { id },
  });
}


export async function updateUserById(id: number, data: any) {
  if (data.senha) {
    data.senha_hash = await bcrypt.hash(data.senha, 12);
    delete data.senha;
  }
  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      nickname: true,
      cpf: true,
      nome: true,
      email: true,
      numero_telefone: true,
      data_cadastro: true,
      foto_perfil: true,
      role: true,
    },
  });
}

export async function findUserById(id: number) {
  return prisma.user.findUnique({
    where: { id },
    select: { 
      id: true,
      nickname: true,
      nome: true,
      email: true,
      foto_perfil: true,
      role: true,
    },
  });
}

interface SearchUsersParams {
  query: string;
  page: number;
  limit: number;
}

export async function searchUsers({ query, page, limit }: SearchUsersParams) {
  const skip = (page - 1) * limit;

  const whereClause = {
    OR: [
      { nome: { contains: query, mode: 'insensitive' as const } },
      { nickname: { contains: query, mode: 'insensitive' as const } },
    ],
  };

  const [users, total] = await prisma.$transaction([
    prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        nickname: true,
        nome: true,
        foto_perfil: true,
        data_cadastro: true,
      },
      skip: skip,
      take: limit,
    }),
    prisma.user.count({ where: whereClause }),
  ]);

  return {
    data: users,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}
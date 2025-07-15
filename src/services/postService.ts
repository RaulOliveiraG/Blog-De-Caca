import prisma from '../config/database';
import { Prisma, ReactionType } from '@prisma/client';

type CreatePostData = {
  titulo: string;
  texto: string;
  imagemUrl?: string;
  autorId: number;
};

type UpdatePostData = {
  titulo?: string;
  texto?: string;
  imagemUrl?: string;
};

export const postService = {
  createPost: (data: CreatePostData) => prisma.post.create({ data }),

  findAllPosts: () => prisma.post.findMany({
    orderBy: { dataPublicacao: 'desc' },
    include: {
      autor: { select: { id: true, nickname: true, foto_perfil: true } },
      _count: { select: { reactions: true, comments: true } },
    },
  }),

  findPostById: (id: number) => prisma.post.findUnique({
    where: { id },
    include: {
      autor: { select: { id: true, nickname: true, foto_perfil: true } },
      reactions: { include: { user: { select: { id: true, nickname: true } } } },
      _count: { select: { reactions: true, comments: true } },
    },
  }),

  updatePost: (id: number, data: UpdatePostData) => prisma.post.update({ where: { id }, data }),

  deletePost: (id: number) => prisma.post.delete({ where: { id } }),

  // --- Lógica de Reações ---
  setReaction: (postId: number, userId: number, type: ReactionType) => prisma.reaction.upsert({
    where: { userId_postId: { userId, postId } },
    update: { type },
    create: { postId, userId, type },
  }),

  removeReaction: (postId: number, userId: number) => prisma.reaction.delete({
    where: { userId_postId: { userId, postId } },
  }),
};
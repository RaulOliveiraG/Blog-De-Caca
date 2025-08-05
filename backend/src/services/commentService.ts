import prisma from '../config/database';
import { Comment } from '@prisma/client';

export const commentService = {
  // Função para criar um comentário
  async createComment(postId: number, autorId: number, texto: string): Promise<Comment> {
    return prisma.comment.create({
      data: {
        texto,
        postId,
        autorId
      }
    });
  },

  // Função para buscar todos os comentários de um post
  async getCommentsByPost(postId: number): Promise<(Comment & {
    autor: {
      id: number;
      nickname: string;
      foto_perfil: string | null;
    };
  })[]> {
    return prisma.comment.findMany({
      where: { postId },
      include: {
        autor: {
          select: {
            id: true,
            nickname: true,
            foto_perfil: true
          }
        }
      },
      orderBy: {
        dataCriacao: 'desc'
      }
    });
  },

  // Função para atualizar um comentário
  async updateComment(id: number, texto: string): Promise<Comment> {
    return prisma.comment.update({
      where: { id },
      data: { texto }
    });
  },

  // Função para deletar um comentário
  async deleteComment(id: number): Promise<Comment> {
    return prisma.comment.delete({
      where: { id }
    });
  },

  // Função para buscar um comentário pelo ID
  async findCommentById(id: number): Promise<Comment | null> {
    return prisma.comment.findUnique({
      where: { id }
    });
  }
};

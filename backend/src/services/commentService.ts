import prisma from '../config/database';
import { Comment, User } from '@prisma/client';

type CreateCommentData = {
  texto: string;
  postId: number;
  autorId: number;
  parentId?: number | null;
};

type CommentWithReplies = Comment & {
  autor: {
    id: number;
    nickname: string;
    foto_perfil: string | null;
  };
  replies: CommentWithReplies[];
};

function buildCommentTree(comments: any[]): CommentWithReplies[] {
  const commentMap: { [key: number]: CommentWithReplies } = {};
  const commentTree: CommentWithReplies[] = [];

  for (const comment of comments) {
    commentMap[comment.id] = { ...comment, replies: [] };
  }

  for (const comment of comments) {
    if (comment.parentId) {
      const parent = commentMap[comment.parentId];
      if (parent) {
        parent.replies.push(commentMap[comment.id]);
      }
    } else {
      commentTree.push(commentMap[comment.id]);
    }
  }

  return commentTree;
}

export const commentService = {
  createComment: (data: CreateCommentData) => {
    return prisma.comment.create({
      data: {
        texto: data.texto,
        postId: data.postId,
        autorId: data.autorId,
        parentId: data.parentId,
      },
      include: {
        autor: {
          select: {
            id: true,
            nickname: true,
            foto_perfil: true,
          },
        },
      },
    });
  },

  /**
   * Busca todos os comentários de um post e os retorna em uma estrutura de árvore.
   * @param postId - O ID do post.
   * @returns Uma árvore de comentários.
   */
  getCommentsByPostId: async (postId: number) => {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        autor: {
          select: {
            id: true,
            nickname: true,
            foto_perfil: true,
          },
        },
      },
      orderBy: {
        dataCriacao: 'asc', 
      },
    });

    return buildCommentTree(comments);
  },
};
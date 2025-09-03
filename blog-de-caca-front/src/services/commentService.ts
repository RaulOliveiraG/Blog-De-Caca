import { api } from './api';

export interface CommentAuthor {
  id: number;
  nickname: string;
  foto_perfil: string | null;
}

export interface Comment {
  id: number;
  texto: string;
  dataCriacao: string;
  autor: CommentAuthor;
  parentId: number | null;
  replies: Comment[];
}

export interface CreateCommentPayload {
  texto: string;
  parentId?: number | null;
}

export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  const response = await api.get<Comment[]>(`/posts/${postId}/comments`);
  return response.data;
}

export async function createComment(postId: string, payload: CreateCommentPayload): Promise<Comment> {
  const response = await api.post<Comment>(`/posts/${postId}/comments`, payload);
  return response.data;
}
// --- ARQUIVO: src/services/postService.ts ---

import { api } from './api';
export interface Post {
  id: number;
  titulo: string;
  texto: string;
  imagemUrl?: string;
  dataPublicacao: string;
  autor: {
    id: number;
    nickname: string;
    foto_perfil?: string;
  };
  _count: {
    reactions: number;
    comments: number;
  };
}

interface CreatePostPayload {
  titulo: string;
  texto: string;
  imagemUrl?: string;
}

export interface UpdatePostPayload {
  titulo?: string;
  texto?: string;
  imagemUrl?: string;
}

export type ReactionType = 'LIKE' | 'LOVE' | 'HAHA' | 'WOW' | 'SAD' | 'ANGRY';


export async function getAllPosts(): Promise<Post[]> {
  const response = await api.get<Post[]>('/posts');
  return response.data;
}

export async function getPostsByAuthorId(authorId: number): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post.autor.id === authorId);
}

export async function getPostById(postId: string): Promise<Post> {
  const response = await api.get<Post>(`/posts/${postId}`);
  return response.data;
}

export async function uploadImage(imageFile: File): Promise<string> {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await api.post<{ imageUrl: string }>('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.imageUrl;
}

export async function createPost(payload: CreatePostPayload): Promise<Post> {
  const response = await api.post<Post>('/posts', payload);
  return response.data;
}

export async function updatePost(postId: number, payload: UpdatePostPayload): Promise<Post> {
  const response = await api.put<Post>(`/posts/${postId}`, payload);
  return response.data;
}

export async function deletePost(postId: number): Promise<void> {
  await api.delete(`/posts/${postId}`);
}

export async function addOrUpdateReaction(postId: string, type: ReactionType): Promise<void> {
  await api.post(`/posts/${postId}/react`, { type });
}

export async function removeReaction(postId: string): Promise<void> {
  await api.delete(`/posts/${postId}/react`);
}
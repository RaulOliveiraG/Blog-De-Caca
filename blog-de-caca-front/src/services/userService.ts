import { api } from './api';

export interface UserSearchResult {
  id: number;
  nickname: string;
  nome: string;
  foto_perfil: string | null;
}

export interface PaginatedUsersResponse {
  data: UserSearchResult[];
  total: number;
  page: number;
  totalPages: number;
}

export async function searchUsers(query: string, page: number = 1, limit: number = 10): Promise<PaginatedUsersResponse> {
  const response = await api.get<PaginatedUsersResponse>('/users/search', {
    params: {
      q: query,
      page,
      limit,
    },
  });
  return response.data;
}
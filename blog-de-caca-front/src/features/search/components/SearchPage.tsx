import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { searchUsers, type PaginatedUsersResponse, type UserSearchResult } from '../../../services/userService';
import { UserCard } from './UserCard';
import { Pagination } from './Pagination';
import './Search.css';

interface SearchFormData {
  query: string;
}

export function SearchPage() {
  const { register, handleSubmit } = useForm<SearchFormData>();
  const [searchResult, setSearchResult] = useState<PaginatedUsersResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentQuery, setCurrentQuery] = useState('');

  const performSearch = async (query: string, page: number = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await searchUsers(query, page);
      setSearchResult(result);
    } catch (err) {
      // --- CORREÇÃO 2: Usando a variável de erro ---
      console.error("Falha ao buscar usuários:", err);
      setError('Falha ao buscar usuários.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSearchSubmit = (data: SearchFormData) => {
    setCurrentQuery(data.query);
    performSearch(data.query, 1);
  };

  const handlePageChange = (page: number) => {
    if (currentQuery) {
      performSearch(currentQuery, page);
    }
  };

  return (
    <div className="search-page-container">
      <h1>Buscar Usuários</h1>
      <form className="search-bar" onSubmit={handleSubmit(onSearchSubmit)}>
        <input 
          type="text" 
          placeholder="Digite um nome ou nickname..."
          {...register('query', { required: true })}
        />
        <button type="submit" className="form-button primary">Buscar</button>
      </form>

      {isLoading && <p>Buscando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {searchResult && (
        <>
          {searchResult.data.length > 0 ? (
            // --- CORREÇÃO 3: Adicionando tipo explícito ao parâmetro do map ---
            searchResult.data.map((user: UserSearchResult) => <UserCard key={user.id} user={user} />)
          ) : (
            <p>Nenhum usuário encontrado para "{currentQuery}".</p>
          )}
          <Pagination 
            currentPage={searchResult.page}
            totalPages={searchResult.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}
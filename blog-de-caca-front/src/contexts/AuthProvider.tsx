import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { api } from '../services/api';
import { AuthContext, type SignInCredentials, type User } from './context';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromToken() {
      const token = localStorage.getItem('@BlogDeCaca:token');

      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const response = await api.get<User>('/auth/me');
          setUser(response.data);
        } catch (error) {
          console.error("Token inválido, limpando sessão:", error);
          localStorage.removeItem('@BlogDeCaca:token');
          delete api.defaults.headers.common['Authorization'];
        }
      }
      setIsLoading(false);
    }

    loadUserFromToken();
  }, []);

  const isAuthenticated = !!user;

  async function signIn({ email, senha }: SignInCredentials) {
    const response = await api.post('/auth/login', { email, senha });
    const { accessToken } = response.data;

    localStorage.setItem('@BlogDeCaca:token', accessToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    
    const userResponse = await api.get<User>('/auth/me');
    setUser(userResponse.data);
  }

  function signOut() {
    localStorage.removeItem('@BlogDeCaca:token');
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
import { createContext } from 'react';
export interface User {
  id: number;
  nome: string;
  email: string;
  role: string;
}

export interface AuthContextData {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
}

export interface SignInCredentials {
  email: string;
  senha: string;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);
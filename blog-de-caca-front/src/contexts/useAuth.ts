import { useContext } from 'react';
import { AuthContext } from './context';
import type { AuthContextData } from './context';

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
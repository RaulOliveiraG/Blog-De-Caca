import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { resetPassword } from '../services/authService';
import { AxiosError } from 'axios';
import '../styles/Form.css';

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

interface ApiErrorResponse {
  error: string;
}

export function ResetPasswordPage() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlToken = searchParams.get('token');
    if (!urlToken) {
      setError('Token de redefinição não encontrado ou inválido. Por favor, solicite um novo link.');
    }
    setToken(urlToken);
  }, [searchParams]);

  const onSubmit = async (data: FormData) => {
    if (!token) return;
    setError(null);
    setMessage(null);

    try {
      await resetPassword({ token, newPassword: data.newPassword });
      setMessage('Sua senha foi redefinida com sucesso! Você já pode fazer o login.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) { 
      const axiosError = err as AxiosError<ApiErrorResponse>;
      const errorMessage = axiosError.response?.data?.error || 'Ocorreu um erro. O token pode ser inválido ou ter expirado.';
      setError(errorMessage);
    }
  };

  return (
    <AuthLayout title="Redefinir Senha" subtitle="Escolha uma nova senha para sua conta">
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Crie sua nova senha</h2>
          
          {message && <p style={{ color: 'green', marginBottom: '15px' }}>{message}</p>}
          {error && <p className="form-error">{error}</p>}

          {token && !message && (
            <>
              <div className="form-group">
                <label htmlFor="newPassword">Nova Senha:</label>
                <input
                  id="newPassword"
                  type="password"
                  {...register('newPassword', { 
                    required: 'A nova senha é obrigatória',
                    minLength: { value: 8, message: 'A senha deve ter no mínimo 8 caracteres' }
                  })}
                  disabled={isSubmitting}
                />
                {errors.newPassword && <p className="form-error">{errors.newPassword.message}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Nova Senha:</label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword', {
                    required: 'A confirmação da senha é obrigatória',
                    validate: (value) => value === watch('newPassword') || 'As senhas não coincidem'
                  })}
                  disabled={isSubmitting}
                />
                {errors.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
              </div>

              <button type="submit" className="form-button primary" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Redefinir Senha'}
              </button>
            </>
          )}
        </form>
        <div className="auth-links" style={{ marginTop: '20px' }}>
          <Link to="/login">Voltar para o Login</Link>
        </div>
      </div>
    </AuthLayout>
  );
}
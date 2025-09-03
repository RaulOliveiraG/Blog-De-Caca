import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { requestPasswordReset } from '../services/authService';
import '../styles/Form.css';

interface FormData {
  email: string;
}

export function ForgotPasswordPage() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormData>();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setError(null);
    setMessage(null);
    try {
      await requestPasswordReset(data.email);
      setMessage('Se um e-mail correspondente for encontrado em nosso sistema, um link para redefinição de senha será enviado.');
    } catch (err) {
      // CORREÇÃO: Usando a variável 'err' para logar o erro detalhado.
      console.error("Erro ao solicitar reset de senha:", err);
      setError('Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.');
    }
  };

  return (
    <AuthLayout title="Recuperar Senha" subtitle="Insira seu e-mail para receber o link de redefinição">
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Esqueceu sua senha?</h2>
          
          {message && <p style={{ color: 'green', marginBottom: '15px' }}>{message}</p>}
          {error && <p className="form-error">{error}</p>}

          {!message && (
            <>
              <div className="form-group">
                <label htmlFor="email">E-mail:</label>
                <input
                  id="email"
                  type="email"
                  {...register('email', { required: 'O e-mail é obrigatório' })}
                  disabled={isSubmitting}
                />
              </div>
              <button type="submit" className="form-button primary" disabled={isSubmitting}>
                {isSubmitting ? 'Enviando...' : 'Enviar Link'}
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
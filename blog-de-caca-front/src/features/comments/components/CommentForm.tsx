import { useForm } from 'react-hook-form';
import './Comments.css';

interface CommentFormProps {
  onSubmit: (data: { texto: string }) => Promise<void>;
}

export function CommentForm({ onSubmit }: CommentFormProps) {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<{ texto: string }>();

  const handleFormSubmit = async (data: { texto: string }) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit(handleFormSubmit)}>
      <h4>Deixe um comentário</h4>
      <textarea 
        {...register('texto', { required: true })}
        placeholder="Escreva seu comentário aqui..."
        disabled={isSubmitting}
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar Comentário'}
      </button>
    </form>
  );
}
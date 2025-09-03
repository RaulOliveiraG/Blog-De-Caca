import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { updatePost, type Post, type UpdatePostPayload } from '../services/postService';

interface EditPostFormProps {
  post: Post; 
  onClose: () => void;
  onPostUpdated: () => void;
}

export function EditPostForm({ post, onClose, onPostUpdated }: EditPostFormProps) {
  const [apiError, setApiError] = useState<string | null>(null);
  const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm<UpdatePostPayload>();

  useEffect(() => {
    setValue('titulo', post.titulo);
    setValue('texto', post.texto);
  }, [post, setValue]);

  const onSubmit = async (data: UpdatePostPayload) => {
    setApiError(null);
    try {
      await updatePost(post.id, data);
      onPostUpdated();
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      setApiError(error.response?.data?.message || "Falha ao atualizar o post.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create-post-form">
      <h2>Editar Post</h2>
      {apiError && <p className="form-error">{apiError}</p>}
      
      <div className="form-group">
        <label htmlFor="titulo">Título</label>
        <input id="titulo" type="text" {...register('titulo', { required: true })} disabled={isSubmitting} />
      </div>
      
      <div className="form-group">
        <label htmlFor="texto">Conteúdo</label>
        <textarea id="texto" {...register('texto', { required: true })} rows={6} disabled={isSubmitting} />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onClose} disabled={isSubmitting} className="btn-cancel">Cancelar</button>
        <button type="submit" disabled={isSubmitting} className="btn-submit">
          {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </div>
    </form>
  );
}
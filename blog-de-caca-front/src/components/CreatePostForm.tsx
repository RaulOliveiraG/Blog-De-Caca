import { useState, useEffect } from 'react'; 
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import { uploadImage, createPost } from '../services/postService';
import '../styles/Form.css';

interface CreatePostFormProps {
  onClose: () => void;
  onPostCreated: () => void;
}

interface FormData {
  titulo: string;
  texto: string;
  imageFile: FileList;
}

export function CreatePostForm({ onClose, onPostCreated }: CreatePostFormProps) {
  const [apiError, setApiError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { register, handleSubmit, watch, formState: { isSubmitting } } = useForm<FormData>();

  const imageFile = watch('imageFile');
  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const newPreview = URL.createObjectURL(imageFile[0]);
      setImagePreview(newPreview);

      return () => URL.revokeObjectURL(newPreview);
    } else {
      setImagePreview(null); 
    }
  }, [imageFile]); 

  const onSubmit = async (data: FormData) => {
    setApiError(null);
    let imageUrl: string | undefined = undefined;

    try {
      if (data.imageFile && data.imageFile.length > 0) {
        imageUrl = await uploadImage(data.imageFile[0]);
      }
      await createPost({
        titulo: data.titulo,
        texto: data.texto,
        imagemUrl: imageUrl,
      });
      onPostCreated();
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.error("Erro ao criar post:", error);
      const message = error.response?.data?.message || "Falha ao criar o post. Tente novamente.";
      setApiError(message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Criar Novo Post</h2>
        {apiError && <p className="form-error">{apiError}</p>}
        
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            type="text"
            {...register('titulo', { required: "O título é obrigatório." })}
            disabled={isSubmitting}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="texto">Conteúdo</label>
          <textarea
            id="texto"
            {...register('texto', { required: "O conteúdo é obrigatório." })}
            rows={6}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageFile">Imagem do Post (Opcional)</label>
          <input
            id="imageFile"
            type="file"
            accept="image/png, image/jpeg, image/webp"
            {...register('imageFile')}
            disabled={isSubmitting}
          />
          {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
        </div>

        <div className="form-actions">
          <button type="button" onClick={onClose} disabled={isSubmitting} className="form-button secondary">
            Cancelar
          </button>
          <button type="submit" disabled={isSubmitting} className="form-button primary">
            {isSubmitting ? 'Publicando...' : 'Publicar'}
          </button>
        </div>
      </form>
    </div>
  );
}
import React, { useState } from 'react';
import axios from 'axios';

interface CreatePostFormProps {
  onClose: () => void;
  onPostCreated: () => void;
}

export function CreatePostForm({ onClose, onPostCreated }: CreatePostFormProps) {
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const token = localStorage.getItem('accessToken'); // Use o nome correto da chave onde você salva o token
    
    if (!token) {
      setError("Sessão inválida. Por favor, faça login novamente.");
      setIsSubmitting(false);
      return;
    }

    try {
      await axios.post(
        // Use a variável de ambiente para a URL da API
        `${process.env.REACT_APP_API_URL}/posts`, 
        { titulo, texto },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      onPostCreated(); // Atualiza a lista de posts na página de perfil
      onClose();       // Fecha o modal
    } catch (err: any) {
      console.error("Erro ao criar post:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Falha ao criar o post. Verifique sua conexão e tente novamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-post-form">
      <h2>Criar Novo Post</h2>
      {error && <p className="form-error">{error}</p>}
      
      <div className="form-group">
        <label htmlFor="titulo">Título</label>
        <input
          id="titulo"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="texto">Conteúdo</label>
        <textarea
          id="texto"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          required
          rows={6}
          disabled={isSubmitting}
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onClose} disabled={isSubmitting} className="btn-cancel">
          Cancelar
        </button>
        <button type="submit" disabled={isSubmitting} className="btn-submit">
          {isSubmitting ? 'Publicando...' : 'Publicar'}
        </button>
      </div>
    </form>
  );
}

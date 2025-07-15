import React, { useState } from "react";

export interface Comentario {
  id: number;
  texto: string;
  autor: string;
}

interface ComentariosProps {
  comentarios: Comentario[];
  onAdicionarComentario: (texto: string) => void;
  onRemoverComentario: (id: number) => void;
}

const Comentarios: React.FC<ComentariosProps> = ({
  comentarios,
  onAdicionarComentario,
  onRemoverComentario,
}) => {
  const [novoComentario, setNovoComentario] = useState("");

  const handleAdicionar = () => {
    if (novoComentario.trim()) {
      onAdicionarComentario(novoComentario.trim());
      setNovoComentario("");
    }
  };

  return (
    <div className="bg-white border border-[#00003C] text-black rounded-lg shadow-lg p-4 w-96 z-50">
      <h3 className="text-[#00003C] text-lg font-bold mb-2">Comentários</h3>

      <ul className="space-y-2 max-h-40 overflow-auto mb-3">
        {comentarios.length === 0 ? (
          <li className="text-sm italic">Nenhum comentário ainda.</li>
        ) : (
          comentarios.map(({ id, texto, autor }) => (
            <li key={id} className="flex justify-between items-center text-sm">
              <span>{`${texto} — ${autor}`}</span>
              <button
                onClick={() => onRemoverComentario(id)}
                className="text-red-600 hover:text-red-800 ml-2"
                aria-label="Remover comentário"
              >
                ✕
              </button>
            </li>
          ))
        )}
      </ul>

      <div className="flex gap-2">
        <input
          type="text"
          value={novoComentario}
          onChange={(e) => setNovoComentario(e.target.value)}
          placeholder="Adicione um comentário..."
          className="flex-1 border border-gray-300 rounded px-2 py-1"
        />
        <button
          onClick={handleAdicionar}
          className="bg-[#00003C] text-white px-4 rounded hover:bg-[#222250]"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Comentarios;

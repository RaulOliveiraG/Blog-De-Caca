import React, { useState } from "react";
import Comentarios, { Comentario } from "./Comentarios";

interface PostContentProps {
  titulo: string;
  texto: string;
  imagemUrl: string;
  dataPublicacao: string;
  comentarios: Comentario[];
  onAdicionarComentario: (texto: string) => void;
  onRemoverComentario: (id: number) => void;
}

const PostContent: React.FC<PostContentProps> = ({
  titulo,
  texto,
  imagemUrl,
  dataPublicacao,
  comentarios,
  onAdicionarComentario,
  onRemoverComentario,
}) => {
  const [mostrarComentarios, setMostrarComentarios] = useState(false);
  const toggleComentarios = () => setMostrarComentarios((prev) => !prev);

  return (
    <article className="mx-[78px] mb-[30px]">
      <h2 className="text-[#8A7300] text-3xl font-bold w-[549px] mb-4">{titulo}</h2>
      <div className="flex gap-10">
        <p className="text-black text-xl flex-1 whitespace-pre-line">{texto}</p>
        <img src={imagemUrl} alt="Imagem do post" className="w-[514px] h-[343px] object-fill" />
      </div>
      <div className="relative flex items-center mb-[55px] ml-[58px]">
        <img
          src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Kt1D3rcrE3/ffwpusbt_expires_30_days.png"
          alt="ícone 1"
          className="w-[30px] h-[27px] mr-[35px]"
        />
        <img
          src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Kt1D3rcrE3/vdmi7kiu_expires_30_days.png"
          alt="comentários"
          className="w-8 h-[30px] mr-9 cursor-pointer"
          onClick={toggleComentarios}
        />
        <p className="text-black text-xl">{`Publicado em ${dataPublicacao}`}</p>

        {mostrarComentarios && (
          <div className="absolute top-[40px] left-[70px] z-50">
            <Comentarios
              comentarios={comentarios}
              onAdicionarComentario={onAdicionarComentario}
              onRemoverComentario={onRemoverComentario}
            />
          </div>
        )}
      </div>
    </article>
  );
};

export default PostContent;

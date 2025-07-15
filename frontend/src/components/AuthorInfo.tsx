import React from "react";

const AuthorInfo: React.FC = () => (
  <section className="flex items-start mx-[94px] mb-32">
    <img src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Kt1D3rcrE3/nzfuqnf8_expires_30_days.png" alt="Autor" className="w-[140px] h-[140px] mr-8 object-fill" />
    <div className="flex flex-col flex-1 gap-2.5">
      <h2 className="text-[#00003C] text-xl font-bold ml-[5px]">Diego Candido</h2>
      <div className="flex">
        <div className="flex flex-col items-center mt-[5px]">
          <img src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Kt1D3rcrE3/x1q2ebsa_expires_30_days.png" alt="estrela 1" className="w-[19px] h-[19px] mb-2.5" />
          <img src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Kt1D3rcrE3/qzp50s1x_expires_30_days.png" alt="estrela 2" className="w-6 h-6 mb-[5px]" />
          <img src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/Kt1D3rcrE3/zadt8cbn_expires_30_days.png" alt="estrela 3" className="w-6 h-6" />
        </div>
        <p className="text-black text-lg ml-4">
          Local: interior do RS<br />
          Arma: 308 Winchester, munição soft point<br />
          Dica bônus: leve sempre um binóculo de longo alcance para evitar sustos próximos demais
        </p>
      </div>
    </div>
    <button className="bg-[#00003C] text-[#8A7300] font-bold text-xl py-3 px-12 mt-[27px] rounded-[20px]">
      Ver perfil
    </button>
  </section>
);

export default AuthorInfo;

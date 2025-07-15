import React from "react";

interface BannerLateralProps {
  image: string;
  text: React.ReactNode;
}

const BannerLateral: React.FC<BannerLateralProps> = ({ image, text }) => (
  <div
    className="bg-cover bg-center pt-[874px] pb-[63px] pl-[100px] pr-[321px] hidden md:block"
    style={{ backgroundImage: `url(${image})` }}
  >
    <span className="text-white text-[32px] font-bold w-[339px]">
      {text}
    </span>
  </div>
);

export default BannerLateral;
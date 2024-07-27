import React from "react";
import Rectangle from "../rectangle/Rectangle";

const Card = ({ title, background }) => {
  return (
    <div className="w-full md:w-[208px] h-[130px] cursor-pointer shadow-zinc-200 shadow-lg border border-t-0 border-b-4 rounded-lg px-4 flex flex-col justify-center">
      <div className="flex justify-between items-center">
        <p className="capitalize text-primary-card_text_color text-[16px]">
          {title}
        </p>
        <Rectangle background={background} />
      </div>
      <div className="mt-6">
        <p className="text-sm font-bold text-primary-card_text_color text-[16px]">
          200
        </p>
        <p className="text-sm text-primary-card_green_color text-[8px]">
          20 More than than yesterday
        </p>
      </div>
    </div>
  );
};

export default Card;

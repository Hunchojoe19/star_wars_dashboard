import React from "react";

const CardLoader = () => {
  return (
    <div className="w-full md:w-[208px] h-[130px] shadow-zinc-200 shadow-lg border border-t-0 border-b-4 rounded-lg px-4 flex flex-col justify-center animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-8 w-8 bg-gray-300 rounded"></div>
      </div>
      <div className="mt-6">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
        <div className="h-2 bg-gray-300 rounded w-1/2 mt-2"></div>
      </div>
    </div>
  );
};

export default CardLoader;

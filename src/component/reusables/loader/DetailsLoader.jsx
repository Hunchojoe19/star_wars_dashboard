import React from "react";

const DetailsLoader = () => {
  return (
    <div className="w-full">
      <div className="w-full p-8">
        <div className="flex gap-x-6 h-full">
          <div className="max-w-80 max-h-[450px]">
            <div className="animate-pulse w-80 h-[360px] bg-gray-300"></div>
          </div>
          <div className="flex flex-col justify-start items-start w-full max-h-[450px] gap-y-2">
            <div className="animate-pulse w-48 h-10 bg-gray-300 mt-10"></div>
            <div className="animate-pulse w-36 h-6 bg-gray-300 mt-1"></div>
            <div className="animate-pulse w-36 h-6 bg-gray-300"></div>
            <div className="animate-pulse w-36 h-6 bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsLoader;

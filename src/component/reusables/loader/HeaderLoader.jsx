import React from "react";
import { GoKebabHorizontal } from "react-icons/go";
import { IoIosNotificationsOutline } from "react-icons/io";

const HeaderLoader = ({ hasId }) => {
  return (
    <div className="hidden md:flex w-full h-16 shadow-lg shadow-primary-shadow/30 border border-b-0 animate-pulse">
      {hasId && (
        <div className="flex gap-x-1 items-center cursor-pointer w-[200px] px-8">
          <div className="w-4 h-4 bg-gray-300 rounded-full" />
          <div className="w-20 h-4 bg-gray-300 rounded" />
        </div>
      )}
      <div className="flex w-full items-center justify-end">
        <div className="flex items-center justify-between w-[30%] px-8">
          <IoIosNotificationsOutline className="text-gray-300 w-6 h-6 cursor-pointer" />
          <div className="bg-gray-300 w-[1px] h-[25px]" />
          <div className="flex items-center gap-x-4">
            <div className="w-8 h-8 bg-gray-300 rounded-full" />
            <div className="w-16 h-4 bg-gray-300 rounded" />
          </div>
          <GoKebabHorizontal className="text-gray-300 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default HeaderLoader;

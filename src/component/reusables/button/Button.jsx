import React from "react";

const Button = ({ onClick, valid }) => {
  return (
    <div>
      <button
        onClick={onClick}
        disabled={!valid}
        className="bg-blue-500 hover:bg-blue-700 text-white font-medium text-base w-[335px] h-[48px] rounded-lg disabled:bg-gray-400"
      >
        Log in
      </button>
    </div>
  );
};

export default Button;

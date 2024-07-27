import React from "react";

const Rectangle = ({ background }) => {
  return (
    <div
      className="w-[27px] h-[26px] rounded-md"
      style={{ backgroundColor: background }}
    ></div>
  );
};

export default Rectangle;

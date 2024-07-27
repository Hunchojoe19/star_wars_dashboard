import React from "react";
import logo from "../../../assets/logo.png";

const Logo = () => {
  return (
    <div className="w-[108px] h-[46px] cursor-pointer">
      <img src={logo} alt="logo" className="w-full h-full" />
    </div>
  );
};

export default Logo;

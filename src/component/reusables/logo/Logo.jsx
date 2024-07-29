import React from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  const navigateToDashboard = () => {
    navigate("/dashboard");
  };
  return (
    <div
      className="w-[108px] h-[46px] cursor-pointer"
      onClick={navigateToDashboard}
    >
      <img src={logo} alt="logo" className="w-full h-full" />
    </div>
  );
};

export default Logo;

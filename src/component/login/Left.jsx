import React from "react";
import Logo from "../reusables/logo/Logo";
import login from "../../assets/login.png";

const Left = () => {
  return (
    <div className="w-full h-screen">
      <div className="w-full h-full bg-primary-bg flex flex-col justify-center items-center">
        <img
          src={login}
          className="w-[385px] h-[167px] md:w-[280] md:h-[150px] px-4"
        />
      </div>
    </div>
  );
};

export default Left;

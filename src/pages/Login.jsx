import React from "react";
import Left from "../component/login/Left";
import Right from "../component/login/Right";

const Login = () => {
  return (
    <div className="flex justify-between">
      <div className="hidden md:flex flex-col w-[28%]">
        <Left />
      </div>
      <div className="flex flex-col w-[72%] bg-yellow-400">
        <Right />
      </div>
    </div>
  );
};

export default Login;

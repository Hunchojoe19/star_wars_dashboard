import React from "react";
import { Outlet } from "react-router-dom";
import SideTab from "../sidetab/SideTab";

const DashboardLayout = () => {
  return (
    <div className="w-full flex">
      <div className="md:w-[22%]">
        <SideTab />
      </div>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;

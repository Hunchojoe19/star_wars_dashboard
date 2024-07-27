import React, { useEffect } from "react";
import Logo from "../reusables/logo/Logo";
import { headerData } from "../../data";
import { useNavigate } from "react-router-dom";

const SideTab = () => {
  const [activeTab, setActiveTab] = React.useState("dashboard");
  useEffect(() => {
    setActiveTab(window.location.pathname);
  }, []);
  console.log(activeTab, "active tab");
  const navigate = useNavigate();
  const sideTabRouter = (link) => {
    setActiveTab(link);

    // navigate(link);
  };
  return (
    <div className="hidden md:block w-full h-screen bg-primary-bg px-4 py-4">
      <div className="w-full -h-full flex flex-col items-center">
        <div className="w-[80%] mt-2 flex justify-center items-center">
          <Logo />
        </div>
        <div className="w-full flex flex-col gap-y-4 mt-7 items-center">
          {headerData.map((item) => (
            <div
              key={item.id}
              className={`cursor-pointer w-[88%] h-12 rounded flex gap-x-2 items-center px-6 ${
                item.id === 1 && "mb-12"
              } ${activeTab === item.link && "bg-primary-active "}`}
              onClick={() => sideTabRouter(item.link)}
            >
              <div className="flex justify-center w-[30px] items-center">
                {typeof item.icon === "string" ? (
                  <div>
                    <img src={item.icon} alt={item.title} />
                  </div>
                ) : (
                  <div>{item.icon}</div>
                )}
              </div>
              <p className="xl:text-lg lg:text-sm text-white capitalize">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideTab;

import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../logo/Logo";
import profile from "../../../assets/profile.svg";
import { headerData } from "../../../data";
import { IoIosNotificationsOutline } from "react-icons/io";
import { GoChevronLeft, GoKebabHorizontal } from "react-icons/go";
import { hasIdInPath, TruncateText } from "../../../util/utils";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab, setUser } from "../../../redux/features/appSlice";

const Header = () => {
  const [open, setOpen] = React.useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const hasId = hasIdInPath(location.pathname);
  const dispatch = useDispatch();

  const activeTab = useSelector((state) => state.app.activeTab);
  useEffect(() => {
    const savedEmail = localStorage.getItem("user");
    if (savedEmail) {
      dispatch(setUser(JSON.parse(savedEmail)));
    }
  }, []);
  const userEmail = useSelector((state) => state.app.user);

  const sideTabRouter = (link) => {
    localStorage.setItem("activeTab", link);
    dispatch(setActiveTab(link));

    navigate(link);
  };
  return (
    <header className="w-full">
      <div className="md:hidden flex justify-between items-center bg-primary-bg px-2 py-2">
        <div>
          <Logo />
        </div>

        <div className="flex items-center gap-x-4">
          <IoIosNotificationsOutline className="text-white/50 w-6 h-6 cursor-pointer" />

          <button
            id="menu-btn"
            className={`block hamburger md:hidden focus:outline-none ${
              open ? "open" : !open
            }`}
            onClick={() => {
              setOpen(!open);
            }}
          >
            <span className="hamburger-top"></span>
            <span className="hamburger-middle"></span>
            <span className="hamburger-bottom"></span>
          </button>
        </div>
      </div>
      <div
        id="menu"
        className={`${
          open ? "" : "hidden"
        } absolute w-full z-50 py-8 mt-2 space-y-8 font-bold bg-primary-bg drop-shadow-md px-2`}
      >
        {headerData.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-x-4 ${
              activeTab === item.link && "bg-primary-active "
            }`}
            onClick={() => sideTabRouter(item.link)}
          >
            <div className="flex justify-center items-center">
              {typeof item.icon === "string" ? (
                <div>
                  <img src={item.icon} alt={item.title} />
                </div>
              ) : (
                <div>{item.icon}</div>
              )}
            </div>
            <p className="text-lg text-white capitalize">{item.title}</p>
          </div>
        ))}
        <div className="flex justify-end px-2 items-center w-full h-[40px]">
          <div className="flex items-center flex-col gap-y-2">
            <img src={profile} />
            <p className="text-white text-lg">{userEmail}</p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex w-full h-16 shadow-lg shadow-primary-shadow/30 border border-b-0">
        {hasId && (
          <div
            className="flex gap-x-1 items-center cursor-pointer w-[160px] px-8"
            onClick={() => navigate(-1)}
          >
            <GoChevronLeft className="text-primary-gray" />
            <p className="text-sm text-primary-gray">Back</p>
          </div>
        )}
        <div className="flex w-full items-center justify-end">
          <div className="flex items-center justify-between w-[30%] px-8">
            <IoIosNotificationsOutline className="text-primary-notification w-6 h-6 cursor-pointer" />
            <div className="bg-primary-shadow w-[1px] h-[25px]" />
            <div className="flex items-center gap-x-4">
              <img src={profile} alt="profile" className="cursor-pointer" />
              <p className="text- text-sm">
                {<TruncateText text={userEmail} maxLength={14} />}
              </p>
            </div>
            <GoKebabHorizontal className="text-primary-kebab cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

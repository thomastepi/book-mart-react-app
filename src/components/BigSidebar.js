import Wrapper from "../assets/wrappers/BigSidebar";
import React from "react";
import { useSelector } from "react-redux";
import { toggleSidebar } from "../features/user/userSlice";
import NavLinks from "./NavLinks";
import LogoWhite from "./LogoWhite";

const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.user);
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <LogoWhite />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;

import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaCaretDown, FaUserCircle } from "react-icons/fa";
import React from "react";
import LogoWhite from "./LogoWhite";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, logout } from "../features/user/userSlice";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };


  return (
    <Wrapper>
      <div className="nav-center">
        <button
          className="toggle-btn"
          type="button"
          onClick={() => {
            dispatch(toggleSidebar());
          }}
        >
          <FaAlignLeft />
        </button>
        <div>
          <div className="logo">
            <LogoWhite />
          </div>
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            className="btn"
            type="button"
            onClick={() => {
              toggleDropdown();
            }}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          {showDropdown && (
            <div className="dropdown show-dropdown">
              <button
                className="dropdown-btn"
                type="button"
                onClick={() => {
                  dispatch(logout("You have been logged out!"));
                }}
              >
                logout
              </button>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;

import { NavLink } from "react-router-dom";
import links from "../utils/links";
import { useDispatch } from "react-redux";
import React from "react";

const NavLinks = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, text, path, icon } = link;
        return (
          <NavLink
            key={id}
            to={path}
            className={({ isActive }) => {
              return isActive ? "nav-link active" : "nav-link";
            }}
            onClick={() => dispatch(toggleSidebar())}
            end
          >
            {icon}
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;

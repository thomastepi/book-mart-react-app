import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { toggleSidebar } from "../features/user/userSlice";
import LogoWhite from "./LogoWhite";
import { useSelector, useDispatch } from "react-redux";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button
            className="close-btn"
            type="button"
            onClick={() => {
              dispatch(toggleSidebar());
            }}
          >
            <FaTimes />
          </button>
          <header>
            <LogoWhite />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;

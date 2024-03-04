import React from "react";
import { Logo } from "../components";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <main>
        <nav>
          <Logo />
        </nav>
        <div className="container page">
          <div className="info">
            <h1>
              <span>Admin Dashboard:</span> Explore and Control Your Book
              Inventory
            </h1>
            <Link to="/register" className="btn btn-hero">
              Login/Register
            </Link>
          </div>
          <img className="img main-img" alt="job junt" src={main} />
        </div>
      </main>
    </Wrapper>
  );
};

export default Landing;

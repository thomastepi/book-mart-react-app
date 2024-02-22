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
            <h1>Explore our book collection</h1>
            <p>
              We have a wide range of books for you to choose from. You can find
              books from various genres and authors. You can also find books for
              different age groups.
            </p>
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

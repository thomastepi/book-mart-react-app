import React, { useEffect } from "react";
import logo from "../assets/images/logo-dash.png";
import Wrapper from "../assets/wrappers/RegisterPage";
import { FormRow } from "../components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, loginUser } from "../features/user/userSlice";

const initialValues = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = React.useState(initialValues);
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleToggle = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!name && !isMember)) {
      toast.error("Please fill all the fields");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email, password }));
    } else {
      dispatch(registerUser({ name, email, password }));
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <div className="logo">
          <img src={logo} alt="logo" />
          {/* <Logo /> */}
        </div>
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {!values.isMember && (
          <FormRow
            labelText="Name"
            type="text"
            name="name"
            values={values.name}
            onChange={handleChange}
          />
        )}
        <FormRow
          labelText="Email"
          type="email"
          name="email"
          values={values.email}
          onChange={handleChange}
        />
        <FormRow
          labelText="Password"
          type="password"
          name="password"
          values={values.password}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-block">
          {isLoading ? "Loading..." : values.isMember ? "Login" : "Register"}
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            dispatch(
              loginUser({ email: "guest@guest.com", password: "0000" })
            );
          }}
        >
          {isLoading ? "Loading..." : "Explore as Guest"}
        </button>
        <p>
          {values.isMember ? "Need to register?" : "Already a member?"}
          <button
            type="button"
            className="member-btn"
            disabled={isLoading}
            onClick={handleToggle}
          >
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;

import React, { useEffect } from "react";
import logo from "../assets/images/logo-dash.png";
import Wrapper from "../assets/wrappers/RegisterPage";
import { FormRow } from "../components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, loginUser } from "../features/user/userSlice";
import { Modal } from 'antd'

const initialValues = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = React.useState(initialValues);
  const [showModal, setShowModal] = React.useState(false);
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
    setTimeout(() => {
      setShowModal(true);
    }, 4000);
  };

  const handleGuestLogin = (data) => {
    dispatch(loginUser(data));
    setTimeout(() => {
      setShowModal(true);
    }, 4000);
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
        {isLoading && showModal && (
          <Modal
            title="Loading..."
            visible={true}
            footer={null}
            closable={false}
          >
            <p>This project is hosted on a free server instance that might take a moment to spin up if inactive.</p>
            <p>We'll have you signed in as soon as possible. Thank you for your patience!</p>
          </Modal>
        )}

        <button type="submit" className="btn btn-block">
          {isLoading ? "Loading..." : values.isMember ? "Login" : "Register"}
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            handleGuestLogin({ email: "guest@guest.com", password: "0000" });
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

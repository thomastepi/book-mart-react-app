import React, { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import FormRow from "../../components/FormRow";
import { toast } from "react-toastify";
import { updateUser } from "../../features/user/userSlice";

const Profile = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
    location: user?.location || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, lastName, location } = userData;
    if (name === "" || email === "" || lastName === "" || location === "") {
      toast.error("Please fill in all fields");
      return;
    };
    dispatch(updateUser(userData));
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChanges}
            labelText="Name"
          />
          <FormRow
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChanges}
            labelText="Last Name"
          />
          <FormRow
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChanges}
            labelText="Email"
          />
          <FormRow
            type="text"
            name="location"
            value={userData.location}
            onChange={handleChanges}
            labelText="Location"
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "Loading..." : "Update"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;

import React, { useState } from "react";
import "./adduser.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddUser = () => {
  const users = {
    name: "",
    email: "",
    address: "",
  };

  const [user, setUser] = useState(users);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const submitFrom = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/api/user", user)
      .then((response) => {
        // console.log("User created successfully")
        toast.success(response.data.message, { position: "top-center" });
      });
    navigate("/").catch((error) => {
      console.log("Error creating user");
    });
  };

  return (
    <div className="adduser">
      <Link to={"/"} type="button" class="btn btn-secondary">
        Back <i class="fa-solid fa-backward"></i>
      </Link>

      <h3>Add New User</h3>
      <form className="addUserfrom" onSubmit={submitFrom}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            onChange={inputHandler}
            name="name"
            autoComplete="off"
            placeholder="Enter Your Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="name">E-mail:</label>
          <input
            type="text"
            id="email"
            onChange={inputHandler}
            name="email"
            autoComplete="off"
            placeholder="Enter Your Email"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="phone">phone Number:</label>
          <input
            type="text"
            value={user.phone}
            id="phone"
            onChange={inputHandler}
            name="phone"
            autoComplete="off"
            placeholder="Enter Your phone Number"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="name">Address:</label>
          <input
            type="text"
            id="address"
            onChange={inputHandler}
            name="address"
            autoComplete="off"
            placeholder="Enter Your Address"
          />
        </div>
        <div className="inputgroup">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;

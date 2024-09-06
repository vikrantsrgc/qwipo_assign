import React, { useEffect, useState } from "react";
import "./update.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Update = () => {
  const initialUser = {
    name: "",
    email: "",
    address: "",
  };

  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/user/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/update/user/${id}`,
        user
      );
      toast.success(response.data.message, { position: "top-center" });
      navigate("/");
    } catch (error) {
      console.log("Error creating user:", error);
    }
  };

  return (
    <div className="adduser">
      <Link to={"/"} className="btn btn-secondary">
        Back <i className="fa-solid fa-backward"></i>
      </Link>

      <h3>Update User</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            value={user.name}
            id="name"
            onChange={inputHandler}
            name="name"
            autoComplete="off"
            placeholder="Enter Your Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">E-mail:</label>
          <input
            type="text"
            value={user.email}
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
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            value={user.address}
            id="address"
            onChange={inputHandler}
            name="address"
            autoComplete="off"
            placeholder="Enter Your Address"
          />
        </div>
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;

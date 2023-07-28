import React, { useState } from "react";
import "./updateModal.css";
// import "./register.scss";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const UpdateModal = ({ userId, onCloseModal }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    isAdmin: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YzI4ZjAzZTE2MzRhZTY5N2Q2ZWM1OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5MDUyMDM0MSwiZXhwIjoxNjkwOTUyMzQxfQ.XEp_M8UC_2DyzXBLWjaqIO9nYsvRe8dZepHTKNhLifE";
    const token = localStorage.getItem("accessToken");
    try {
      const res = await axios.put(
        `http://localhost:8000/api/users/${userId}`,
        formData,
        { headers: { token: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        // const createdUser  = res.data;
        // set success
        onCloseModal();
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setError("");
        console.log("user not updated : " + err);
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data);

      setTimeout(() => {
        resetError();
      }, 3000);
    }
    setFormData({
      name: "",
      email: "",
      password: "",
      age: "",
      isAdmin: false,
    });
  };
  const resetError = () => {
    setError("");
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="heading">
          <h1>Update User</h1>
          <p>
            <Link to="/login" className="link">
              Go to login
            </Link>
          </p>
        </div>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your Name"
            pattern="^[A-Za-z0-9 ]{3,20}$"
          />
          <span className="err-msg">name should be min of 3 char</span>
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your Email"
          />
          <span className="err-msg">Enter valid Email</span>
        </label>

        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your Password"
            pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
          />
          <span className="err-msg">
            password should be range of [3, 8] also contain atleast 1 lowercase,
            uppercase and special char !
          </span>
        </label>

        <label htmlFor="age">
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your Email"
          />
          <span className="err-msg">Enter valid Email</span>
        </label>
        <label htmlFor="isAdmin">
          isAdmin:
          <div className="isAdmin" style={{ display: "flex" }}>
            <span
              className="radio"
              style={{ display: "flex", alignItems: "center", width: "80px" }}
            >
              True:
              <input
                type="radio"
                name="isAdmin"
                value="true"
                checked={formData.isAdmin === "true"}
                onChange={handleChange}
              />
            </span>
            <span
              className="radio"
              style={{ display: "flex", alignItems: "center", width: "80px" }}
            >
              False
              <input
                type="radio"
                name="isAdmin"
                value="false"
                checked={formData.isAdmin === "false"}
                onChange={handleChange}
              />
            </span>
          </div>
        </label>

        <button type="submit">Submit</button>
        {error !== "" && <span style={{ color: "red" }}>{error}</span>}
      </form>
    </div>
  );
};

export default UpdateModal;

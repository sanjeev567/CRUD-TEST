import React, { useState } from "react";
import "./Registration.css";
// import "./register.scss";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Registration = () => {
  const [success, setSuccess] = useState(false);
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
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/register",
        formData
      );
      if (res.status === 201) {
        // const createdUser  = res.data;
        // set success
        setSuccess(true);
        setTimeout(() => {
          resetSuccess();
        }, 3000);
      } else {
        setSuccess(false);
        console.log("user not regiseter : " + err);
      }
    } catch (err) {
      console.log(err);
    }
    setFormData({
      name: "",
      email: "",
      password: "",
      age: "",
      isAdmin: false,
    });
  };
  const resetSuccess = () => {
    setSuccess(false);
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="heading">
          <h1>Register</h1>
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
        {success && (
          <span style={{ color: "teal" }}>User registered successfully</span>
        )}
      </form>
    </div>
  );
};

export default Registration;

import React, { useState } from "react";
import "./login.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Login = ({ onLogin }) => {
  const [success, setSuccess] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const resetSuccess = () => {
    setSuccess(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        formData
      );
      if (res.status === 200) {
        setSuccess(true);
        const token = res.data.accessToken;
        localStorage.setItem("accessToken", token);
        // on successfull login it should redirect to /
        navigate("/");
        onLogin();
      } else {
        console.log("error occured: ");
      }
    } catch (err) {
      console.log(err);
      setSuccess(false);
      setTimeout(() => {
        resetSuccess();
      }, 3000);
    }
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="form-heading">
          <h1>Login</h1>
          <p>
            <Link to="/register" className="link">
              Go to Register
            </Link>
          </p>
        </div>

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
            must be in range[8,20] and contain lower, upper and special char!
          </span>
        </label>

        <button type="submit">Submit</button>
        {!success && <span style={{ color: "teal" }}>Invalid credentials</span>}
      </form>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  let initials = {
    email: "",

    password: "",
  };
  const [userDetails, setUserDetails] = useState(initials);
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  const hanldeSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      setUserDetails(initials);
      sessionStorage.setItem("token", result.token);
      sessionStorage.setItem("userName", result.userName);
      navigate("/");
      window.location.reload();
    } else {
      setErrors(result.errors);
    }
  };

  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <form
        className="flex flex-col h-[500px] w-[500px]"
        onSubmit={hanldeSubmit}
      >
        <label htmlFor="email">Enter Your Email id</label>
        <input
          type="text"
          name="email"
          onChange={handleChange}
          value={userDetails.email}
        />
        {errors.length > 0 &&
          errors.map((ele, index) => {
            if (ele.path === "email") {
              return (
                <p key={index} className="text-red-800">
                  {ele.msg}
                </p>
              );
            }
          })}

        <label htmlFor="password">Enter Your Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={userDetails.password}
        />
        {errors.length > 0 &&
          errors.map((ele, index) => {
            if (ele.path === "password") {
              return (
                <p key={index} className="text-red-800">
                  {ele.msg}
                </p>
              );
            }
          })}
        <button>Sign in</button>
        <Link to="/register" className="m-5 text-blue-700">
          Dont have an account
        </Link>
      </form>
    </div>
  );
};

export default Login;

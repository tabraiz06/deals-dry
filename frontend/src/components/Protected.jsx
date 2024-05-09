import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Protected = ({ Home }) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  console.log(token);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });
  return (
    <div>
      <Home />
    </div>
  );
};

export default Protected;

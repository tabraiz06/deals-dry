import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const token = sessionStorage.getItem("token");
  const name = sessionStorage.getItem("userName");
  console.log(token);
  const Logout = () => {
    sessionStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className="flex h-[50px] flex-col w-full  font-bold text-xl">
      <div className="logo flex items-start">
        <NavLink className="mx-[50px] my-[20px]">LOGO</NavLink>
      </div>
      <div className="menus flex  justify-around">
        <NavLink to={"/"}>home</NavLink>
        <NavLink to={"/employees"}>Employee List</NavLink>

        {token ? (
          <>
            <NavLink>User Name :{name}</NavLink>
            <NavLink onClick={Logout}>Logout</NavLink>
          </>
        ) : (
          <NavLink to={"/login"}>Sign In</NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;

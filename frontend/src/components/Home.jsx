import React, { useState } from "react";
import CreateEmployee from "./CreateEmployee";

const Home = () => {
  const [toggle, setToggle] = useState(false);
  const clicked = () => {
    setToggle(!toggle);
  };

  return (
    <div className="my-[4rem]">
      <h1 className="text-2xl font-bold text-center">Welcome to admin panel</h1>
      <button onClick={clicked}>Create Employees</button>
      {toggle && <CreateEmployee />}
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const initials = {
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_gender: "",
  };
  const [f_Course, setF_Course] = useState([]);

  const handleCheckbox = (e) => {
    setF_Course([...f_Course, e.target.value]);
  };
  const [userData, setUserData] = useState(initials);
  const [image, setImage] = useState(" f_Image");
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleImage = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    f_Course.map((ele) => {
      formData.append("f_Course", ele);
    });
    formData.append("f_Name", userData.f_Name);
    formData.append("f_Email", userData.f_Email);
    formData.append("f_Mobile", userData.f_Mobile);
    formData.append("f_Designation", userData.f_Designation);
    formData.append("f_gender", userData.f_gender);

    formData.append("f_Image", image);
    console.log(formData);
    const response = await fetch("http://localhost:8080/emp/add", {
      method: "POST",
      headers: {
        Token: sessionStorage.getItem("token"),
      },
      body: formData,
    });
    const result = await response.json();
    if (response.ok) {
      setUserData(initials);
      alert("user added successfully");
      navigate("/employees");
    } else {
      setErrors(result.errors);
    }
  };
  console.log(errors);
  return (
    <div className="h-[100vh] w-full flex items-center justify-center">
      <form
        method="POST"
        className="flex flex-col h-[700px] w-[500px]"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">NAME</label>
        <input type="text" name="f_Name" onChange={handleChange} />
        {errors.length > 0 &&
          errors.map((ele, index) => {
            if (ele.path === "f_Name") {
              return (
                <p key={index} className="text-red-800">
                  {ele.msg}
                </p>
              );
            }
          })}
        <label htmlFor="email">Email</label>
        <input type="text" name="f_Email" id="" onChange={handleChange} />
        {errors.length > 0 &&
          errors.map((ele, index) => {
            if (ele.path === "f_Email") {
              return (
                <p key={index} className="text-red-800">
                  {ele.msg}
                </p>
              );
            }
          })}
        <label htmlFor="mobile">Mobile Number</label>
        <input type="tel" name="f_Mobile" id="" onChange={handleChange} />
        {errors.length > 0 &&
          errors.map((ele, index) => {
            if (ele.path === "f_Mobile") {
              return (
                <p key={index} className="text-red-800">
                  {ele.msg}
                </p>
              );
            }
          })}
        <label htmlFor="designation">Designation</label>
        <select name="f_Designation" id="" onChange={handleChange} required>
          <option value="select">Select</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
        <label htmlFor="gender">Gender</label>
        <div>
          <label htmlFor="male">male</label>
          <input
            type="radio"
            name="f_gender"
            value={"male"}
            onChange={handleChange}
            required
          />
          <label htmlFor="female">Female</label>
          <input
            type="radio"
            name="f_gender"
            value={"female"}
            onChange={handleChange}
            required
          />
        </div>
        <label htmlFor="course">Course</label>
        <label htmlFor="mca">MCA</label>{" "}
        <input
          type="checkbox"
          name="f_Course"
          value={"MCA"}
          onChange={handleCheckbox}
        />
        <label htmlFor="bca">BCA</label>{" "}
        <input
          type="checkbox"
          name="f_Course"
          value={"BCA"}
          onChange={handleCheckbox}
        />
        <label htmlFor="bsc">BSC</label>{" "}
        <input
          type="checkbox"
          name="f_Course"
          value={"BSC"}
          onChange={handleCheckbox}
        />
        <label htmlFor="image">Upload image</label>
        <input type="file" name="f_Image" onChange={handleImage} required />
        <button>ADD NEW EMPLOYEE</button>
      </form>
    </div>
  );
};

export default CreateEmployee;

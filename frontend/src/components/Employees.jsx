import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditEmployee from "./EditEmployee";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState({});
  const [editToggle, setEditToggle] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const handleEditEmployee = (id) => {
    let filterItem = employees.filter((ele) => ele._id === id);
    console.log(filterItem);
    setEditEmployee(filterItem[0]);
    setEditToggle(true);
  };

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  if (!token) {
    useEffect(() => {
      fetchEmployess();
      navigate("/login");
    });
  }
  const fetchEmployess = async () => {
    const response = await fetch("http://localhost:8080/emp/employees", {
      method: "GET",
      headers: {
        Token: token,
      },
    });

    const result = await response.json();
    console.log(result);
    setEmployees(result);
  };
  useEffect(() => {
    fetchEmployess();
  }, []);

  const deleteEmployee = async (id) => {
    const response = await fetch(`http://localhost:8080/emp/delete/${id}`, {
      method: "DELETE",
      headers: {
        Token: sessionStorage.getItem("token"),
      },
    });
    const result = await response.json();
    console.log(result);
    fetchEmployess();
  };
  return (
    <>
      {editToggle && <EditEmployee employee={editEmployee} />}
      <div className="flex flex-col h-[100vh] w-full items-center justify-around">
        <div className="filter flex justify-around w-full">
          <select
            name="filter"
            onChange={(e) => setFilter(e.target.value)}
            className="bg-zinc-500"
          >
            <option value="select">select designation</option>
            <option value="HR">HR</option>
            <option value="Manager">MANAGER</option>
            <option value="Sales">SALES</option>
          </select>
          <input
            type="search"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search by name"
          />
        </div>
        <h1 className="text-2xl font-bold">Employees list</h1>
        <table className="w-[80%] h-[50%] text-center">
          <thead>
            <tr>
              <th>Unique id</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Courses</th>
              <th>Created date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees
              .filter((ele) => {
                if (search !== "") {
                  return ele.f_Name
                    .toLowerCase()
                    .includes(search.toLowerCase());
                } else if (filter !== "select") {
                  return ele.f_Designation.includes(filter);
                } else {
                  return ele;
                }
              })
              .map((ele) => {
                let date = new Date(ele.createdAt);

                return (
                  <tr key={ele._id}>
                    <td>{ele._id}</td>
                    <td>
                      <img src={`./images/${ele.f_Image}`} alt="" />
                    </td>
                    <td>{ele.f_Name}</td>
                    <td>{ele.f_Email}</td>
                    <td>{ele.f_Mobile}</td>
                    <td>{ele.f_Designation}</td>
                    <td>{ele.f_gender}</td>
                    <td>{ele.f_Course.map((ele) => ele)}</td>
                    <td>{date.toLocaleDateString()}</td>
                    <td>
                      <div className="flex gap-3 items-center">
                        <button onClick={() => handleEditEmployee(ele._id)}>
                          Edit
                        </button>{" "}
                        <button onClick={() => deleteEmployee(ele._id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Employees;

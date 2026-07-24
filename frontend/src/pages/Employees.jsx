import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/Employees.css";

function Employees() {

  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    const admin = localStorage.getItem("admin");

    if (!admin) {
      navigate("/login");
      return;
    }

    fetchEmployees();

  }, [navigate]);

  const fetchEmployees = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/employees/"
      );

      setEmployees(response.data);

    } catch (error) {

      console.log(error);
      alert("Failed to Load Employees");

    }

  };

  
  const filteredEmployees = employees.filter((item) => {

  const keyword = search.trim().toLowerCase();

  if (keyword === "") return true;

  const employeeId = String(item.employee_id || "").trim().toLowerCase();
  const employeeName = String(item.employee_name || "").trim().toLowerCase();
  const department = String(item.department || "").trim().toLowerCase();
  const designation = String(item.designation || "").trim().toLowerCase();

  return (
    employeeId.startsWith(keyword) ||
    employeeName.startsWith(keyword) ||
    department.startsWith(keyword) ||
    designation.startsWith(keyword)
  );

});

  
    return (

    <>

      <AdminNavbar />

      <div className="employee-page">

        <div className="employee-header">

          <div>

            <h1>Employee Management</h1>

            <p>Manage All Employees</p>

          </div>

          <Link
            to="/add-employee"
            className="add-btn"
          >
            + Add Employee
          </Link>

        </div>

        <div className="search-box">

          <input
            type="text"
            placeholder="Search Employee ID, Name, Department, Designation..."
            value={search}
            autoComplete="off"
            spellCheck={false}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="employee-table">

          <table>

            <thead>

              <tr>

                <th>Employee ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredEmployees.length > 0 ? (

                filteredEmployees.map((item) => (

                  <tr key={item.id}>
                                        <td>{item.employee_id}</td>

                    <td>{item.employee_name}</td>

                    <td>{item.department}</td>

                    <td>{item.designation}</td>

                    <td>{item.email}</td>

                    <td>{item.phone}</td>

                    <td>

                      <Link
                        to={`/edit-employee/${item.id}`}
                        className="edit-btn"
                      >
                        Edit
                      </Link>

                      <Link
                        to={`/delete-employee/${item.id}`}
                        className="delete-btn"
                      >
                        Delete
                      </Link>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    style={{
                      textAlign: "center",
                      padding: "20px"
                    }}
                  >
                    No Employees Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </>

  );

}

export default Employees;
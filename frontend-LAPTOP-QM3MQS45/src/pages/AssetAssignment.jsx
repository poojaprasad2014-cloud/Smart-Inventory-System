import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/AssetAssignment.css";

function AssetAssignment() {

  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    const admin = localStorage.getItem("admin");

    if (!admin) {
      navigate("/login");
      return;
    }

    fetchAssignments();

  }, [navigate]);

  const fetchAssignments = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/assignments/"
      );

      setAssignments(response.data);

    } catch (error) {

      console.log(error);
      alert("Failed to Load Assignments");

    }

  };

  const filteredAssignments = assignments.filter((item) => {

    const keyword = search.trim().toLowerCase();

    if (keyword === "") return true;

    return (
      String(item.id || "").toLowerCase().startsWith(keyword) ||
      String(item.asset_id || "").toLowerCase().startsWith(keyword) ||
      String(item.asset_name || "").toLowerCase().startsWith(keyword) ||
      String(item.employee_id || "").toLowerCase().startsWith(keyword) ||
      String(item.employee_name || "").toLowerCase().startsWith(keyword)
    );

  });

  return (

    <>

      <AdminNavbar />

      <div className="assignment-container">

        <div className="assignment-header">

          <div>

            <h1>Asset Assignment</h1>

            <p>Assign Assets to Employees</p>

          </div>

          <Link
            to="/add-assignment"
            className="add-btn"
          >
            + Assign Asset
          </Link>

        </div>

        <div className="search-box">

          <input
            type="text"
            placeholder="Search ID, Asset, Employee..."
            value={search}
            autoComplete="off"
            spellCheck={false}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="table-box">

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Asset ID</th>
                <th>Asset Name</th>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Assigned Date</th>
                <th>Return Date</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredAssignments.length > 0 ? (

                filteredAssignments.map((item) => (

                  <tr key={item.id}>

                    <td>{item.id}</td>

                    <td>{item.asset_id}</td>

                    <td>{item.asset_name}</td>

                    <td>{item.employee_id}</td>

                    <td>{item.employee_name}</td>

                    <td>{item.assigned_date}</td>

                    <td>{item.return_date || "-"}</td>

                    <td>
                      <div className="action-buttons">

                        <Link
                          to={`/edit-assignment/${item.id}`}
                          className="edit-btn"
                        >
                          Edit
                        </Link>

                        <Link
                          to={`/delete-assignment/${item.id}`}
                          className="delete-btn"
                        >
                          Delete
                        </Link>

                      </div>
                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    style={{
                      textAlign: "center",
                      padding: "20px"
                    }}
                  >
                    No Assignments Found
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

export default AssetAssignment;
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/Maintenance.css";

function Maintenance() {

  const navigate = useNavigate();

  const [maintenance, setMaintenance] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    const admin = localStorage.getItem("admin");

    if (!admin) {
      navigate("/login");
      return;
    }

    fetchMaintenance();

  }, [navigate]);

  const fetchMaintenance = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/maintenance/"
      );

      setMaintenance(response.data);

    } catch (error) {

      console.log(error);
      alert("Failed to Load Maintenance");

    }

  };

  const filteredMaintenance = maintenance.filter((item) => {

    const keyword = search.trim().toLowerCase();

    if (keyword === "") return true;

    const id = String(item.id || "").trim();

    const assetId = String(item.asset_id || "")
      .trim()
      .toLowerCase();

    const assetName = String(item.asset_name || "")
      .trim()
      .toLowerCase();

    const employeeId = String(item.employee_id || "")
      .trim()
      .toLowerCase();

    const employeeName = String(item.employee_name || "")
      .trim()
      .toLowerCase();

    const issue = String(item.issue || "")
      .trim()
      .toLowerCase();

    const status = String(item.status || "")
      .trim()
      .toLowerCase();

    return (

      id.startsWith(keyword) ||
      assetId.startsWith(keyword) ||
      assetName.startsWith(keyword) ||
      employeeId.startsWith(keyword) ||
      employeeName.startsWith(keyword) ||
      issue.startsWith(keyword) ||
      status.startsWith(keyword)

    );

  });

  return (

    <>

      <AdminNavbar />

      <div className="maintenance-page">

        <div className="maintenance-header">

          <div>

            <h1>Maintenance Management</h1>

            <p>Manage Maintenance Records</p>

          </div>

          <Link
            to="/add-maintenance"
            className="add-btn"
          >
            + Add Maintenance
          </Link>

        </div>

        <div className="search-box">

          <input
            type="text"
            placeholder="Search ID, Asset, Employee, Issue..."
            value={search}
            autoComplete="off"
            spellCheck={false}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="maintenance-table">

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Asset ID</th>
                <th>Asset Name</th>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Issue</th>
                <th>Reported Date</th>
                <th>Completed Date</th>
                <th>Status</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>
                            {filteredMaintenance.length > 0 ? (

               filteredMaintenance.map((item, index) => (

                  <tr key={item.id}>

                   <td>{index + 1}</td>

                    <td className="asset-id">
                      {item.asset_id}
                    </td>

                    <td className="asset-name">
                      {item.asset_name}
                    </td>

                    <td className="employee-id">
                      {item.employee_id}
                    </td>

                    <td className="employee-name">
                      {item.employee_name}
                    </td>

                    <td className="issue">
                      {item.issue}
                    </td>

                    <td className="date-column">
                      {item.reported_date}
                    </td>

                    <td className="date-column">
                      {item.completed_date || "-"}
                    </td>

                    <td>

                      <span
                        className={
                          item.status === "Pending"
                            ? "pending"
                            : item.status === "In Progress"
                            ? "in-progress"
                            : "completed"
                        }
                      >
                        {item.status}
                      </span>

                    </td>

                    <td>

                      <div className="action-buttons">

                        <Link
                          to={`/edit-maintenance/${item.id}`}
                          className="edit-btn"
                        >
                          Edit
                        </Link>

                        <Link
                          to={`/delete-maintenance/${item.id}`}
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
                    colSpan="10"
                    style={{
                      textAlign: "center",
                      padding: "25px",
                      fontWeight: "600"
                    }}
                  >
                    No Maintenance Records Found
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

export default Maintenance;
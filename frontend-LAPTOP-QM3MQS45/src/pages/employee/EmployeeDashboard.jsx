import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/EmployeeDashboard.css";
import EmployeeNavbar from "../../components/EmployeeNavbar";

function EmployeeDashboard() {

  const [assets, setAssets] = useState([]);
  const [complaints, setComplaints] = useState([]);

  const today = new Date();

  useEffect(() => {

    const fetchData = async () => {

      try {

        const employee = JSON.parse(localStorage.getItem("employee"));

        // Assigned Assets
        const assetResponse = await axios.get(
          "http://127.0.0.1:8000/api/assignments/"
        );

        const myAssets = assetResponse.data.filter(
          (item) => Number(item.employee) === Number(employee.id)
        );

        setAssets(myAssets);

        // Complaints
        const complaintResponse = await axios.get(
          "http://127.0.0.1:8000/api/maintenance/"
        );

        const myComplaints = complaintResponse.data.filter(
          (item) => Number(item.employee) === Number(employee.id)
        );

        setComplaints(myComplaints);

      } catch (error) {

        console.log(error);

      }

    };

    fetchData();

  }, []);

  const pendingComplaints = complaints.filter(
    (item) => item.status === "Pending"
  ).length;

  const completedComplaints = complaints.filter(
    (item) => item.status === "Completed"
  ).length;

  return (

    <>

      <EmployeeNavbar />

      <div className="employee-dashboard-page">

        <div className="employee-dashboard-container">

          <main className="employee-main-content">

            <div className="employee-topbar">

              <div>

                <h1>Employee Dashboard</h1>

                <p>Welcome to Smart Inventory System 👋</p>

              </div>

              <div className="header-right">

                <span>{today.toLocaleDateString()}</span>

              </div>

            </div>

            {/* ================= Dashboard Cards ================= */}

            <div className="cards">

              <div className="card">
                <h2>{assets.length}</h2>
                <p>My Assigned Assets</p>
              </div>

              <div className="card">
                <h2>{pendingComplaints}</h2>
                <p>Pending Complaints</p>
              </div>

              <div className="card">
                <h2>{completedComplaints}</h2>
                <p>Completed Complaints</p>
              </div>

            </div>
                        {/* ================= My Assigned Assets ================= */}

            <div className="table-box">

              <h2>My Assigned Assets</h2>

              <table>

                <thead>

                  <tr>
                    <th>Asset ID</th>
                    <th>Asset Name</th>
                    <th>Category</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {assets.length > 0 ? (

                    assets.map((item) => (

                      <tr key={item.id}>

                        <td>{item.asset_id}</td>

                        <td>{item.asset_name}</td>

                        <td>{item.category_name}</td>

                        <td>

                          <span
                            className={
                              item.asset_status === "Assigned"
                                ? "assigned"
                                : item.asset_status === "Maintenance"
                                ? "maintenance"
                                : "available"
                            }
                          >
                            {item.asset_status}
                          </span>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>
                      <td colSpan="4">No Assigned Assets</td>
                    </tr>

                  )}

                </tbody>

              </table>

            </div>

            {/* ================= My Complaints ================= */}

            <div className="table-box">

              <h2>My Complaints</h2>

              <table>

                <thead>

                  <tr>
                    <th>Complaint</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {complaints.length > 0 ? (
                                        complaints.map((item) => (

                      <tr key={item.id}>

                        <td>{item.issue}</td>

                        <td>{item.complaint_date}</td>

                        <td>

                          <span
                            className={
                              item.status === "Pending"
                                ? "assigned"
                                : item.status === "In Progress"
                                ? "maintenance"
                                : "available"
                            }
                          >
                            {item.status}
                          </span>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>
                      <td colSpan="3">No Complaints Found</td>
                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </main>

        </div>

      </div>

    </>

  );

}

export default EmployeeDashboard;
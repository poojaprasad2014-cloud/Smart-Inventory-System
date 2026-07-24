import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeNavbar from "../../components/EmployeeNavbar";
import "../../styles/MyComplaints.css";

function MyComplaints() {

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {

    const employee = JSON.parse(localStorage.getItem("employee"));

    if (employee) {
      fetchComplaints(employee.id);
    }

  }, []);

  const fetchComplaints = async (employeeId) => {

    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/api/maintenance/?employee=${employeeId}`
      );

      setComplaints(response.data);

    } catch (error) {

      console.log(error);
      alert("Failed to Load Complaints");

    }

  };

  return (

    <>
      <EmployeeNavbar />

      <div className="dashboard-page">

        <div className="dashboard-container">

          <main className="main-content">

            <div className="complaints-header">

              <div>

                <h1>My Complaints</h1>

                <p>View and track your maintenance requests</p>

              </div>

            </div>

            <div className="table-box">

              <table>

                <thead>

                  <tr>
                    <th>Asset</th>
                    <th>Issue</th>
                    <th>Reported Date</th>
                    <th>Completed Date</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {complaints.length > 0 ? (

                    complaints.map((item) => (

                      <tr key={item.id}>

                        <td>{item.asset_name}</td>

                        <td>{item.issue}</td>

                        <td>{item.reported_date}</td>

                        <td>{item.completed_date || "-"}</td>

                        <td>
                          <span className={item.status.toLowerCase().replace(" ", "-")}>
                            {item.status}
                          </span>
                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="5"
                        style={{
                          textAlign: "center",
                          padding: "20px"
                        }}
                      >
                        No Complaints Found
                      </td>

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

export default MyComplaints;
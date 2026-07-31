import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmployeeNavbar from "../../components/EmployeeNavbar";
import "../../styles/MyAssets.css";

function MyAssets() {

  const navigate = useNavigate();

  const [assets, setAssets] = useState([]);

  useEffect(() => {

    const employee = JSON.parse(localStorage.getItem("employee"));

    if (!employee) {
      navigate("/login");
      return;
    }

    fetchAssets();

  }, [navigate]);

  const fetchAssets = async () => {

    try {

      const employee = JSON.parse(localStorage.getItem("employee"));

      const response = await axios.get(
        "http://127.0.0.1:8000/api/assignments/"
      );

      const myAssets = response.data.filter(
        (item) => Number(item.employee) === Number(employee.id)
      );

      setAssets(myAssets);

    } catch (error) {

      console.log(error);
      alert("Failed to Load Assets");

    }

  };

  return (
    <>
      <EmployeeNavbar />

      <div className="dashboard-page">

        <div className="dashboard-container">

          <main className="main-content">

            <div className="assets-header">
              <div>
                <h1>My Assigned Assets</h1>
                <p>View all assets assigned to you</p>
              </div>
            </div>

            <div className="table-box">

              <table>

                <thead>
                  <tr>
                    <th>Asset ID</th>
                    <th>Asset Name</th>
                    <th>Category</th>
                    <th>Assigned Date</th>
                    <th>Return Date</th>
                  </tr>
                </thead>

                <tbody>

                  {assets.length > 0 ? (

                    assets.map((item) => (

                      <tr key={item.id}>
                        <td>{item.asset_id}</td>
                        <td>{item.asset_name}</td>
                        <td>{item.category_name}</td>
                        <td>{item.assigned_date}</td>
                        <td>{item.return_date || "-"}</td>
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
                        No Assets Assigned
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

export default MyAssets;
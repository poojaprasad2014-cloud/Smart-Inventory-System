import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import {
  FaLaptop,
  FaCheckCircle,
  FaUserCheck,
  FaTools,
  FaChartBar,
} from "react-icons/fa";

import AdminNavbar from "../components/AdminNavbar";
import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [assets, setAssets] = useState([]);
  const [maintenance, setMaintenance] = useState([]);

  useEffect(() => {
    const admin = localStorage.getItem("admin");

    if (!admin) {
      navigate("/login");
      return;
    }

    loadDashboard();
  }, [navigate]);

  const loadDashboard = async () => {
    try {
      const [assetRes, maintenanceRes] = await Promise.all([
        axios.get("http://127.0.0.1:8000/api/assets/"),
        axios.get("http://127.0.0.1:8000/api/maintenance/"),
      ]);

      setAssets(assetRes.data);
      setMaintenance(maintenanceRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalAssets = assets.length;

  const availableAssets =
    assets.filter((a) => a.status === "Available").length;

  const assignedAssets =
    assets.filter((a) => a.status === "Assigned").length;

  const recycledAssets =
    assets.filter((a) => a.status === "Recycled").length;

  const maintenanceAssets = maintenance.length;

  const recentAssets = [...assets].reverse().slice(0, 5);

  const today = new Date();

  const expiringSoon = assets.filter((asset) => {
    const expiry = new Date(asset.warranty_expiry);

    const diff = Math.ceil(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );

    return diff >= 0 && diff <= 30;
  });

  const pieData = [
    {
      name: "Available",
      value: availableAssets,
    },
    {
      name: "Assigned",
      value: assignedAssets,
    },
    {
      name: "Maintenance",
      value: maintenanceAssets,
    },
    {
      name: "Recycled",
      value: recycledAssets,
    },
  ];

  const COLORS = [
    "#10b981",
    "#2563eb",
    "#f59e0b",
    "#ef4444",
  ];

  return (
    <>
      <AdminNavbar />

      <div className="dashboard-page">
        <div className="dashboard-container">

          <div className="dashboard-header">

            <div>
              <h1>Dashboard</h1>
              <p>Welcome Back, Admin 👋</p>
            </div>

            <div className="header-right">
              <span>{today.toLocaleDateString()}</span>
            </div>

          </div>

          <div className="cards">

            <div className="card">
              <FaLaptop className="card-icon" />
              <h2>{totalAssets}</h2>
              <p>Total Assets</p>
            </div>

            <div className="card">
              <FaCheckCircle className="card-icon green" />
              <h2>{availableAssets}</h2>
              <p>Available</p>
            </div>

            <div className="card">
              <FaUserCheck className="card-icon blue" />
              <h2>{assignedAssets}</h2>
              <p>Assigned</p>
            </div>

            <div className="card">
              <FaTools className="card-icon orange" />
              <h2>{maintenanceAssets}</h2>
              <p>Maintenance</p>
            </div>

          </div>

          {/* Asset Status Chart */}

          <div className="chart-grid">

            <div className="chart-card">

              <div className="card-title">
                <h2>Asset Status</h2>
                <FaChartBar />
              </div>

              <ResponsiveContainer width="100%" height={320}>

                <PieChart>

                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={3}
                    label
                  >

                    {pieData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />
                    ))}

                  </Pie>

                  <Tooltip />
                  <Legend />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>
                    {/* Recent Assets */}

          <div className="table-card">

            <div className="card-title">
              <h2>Recent Assets</h2>
            </div>

            <table className="dashboard-table">

              <thead>

                <tr>
                  <th>Asset Name</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Location</th>
                </tr>

              </thead>

              <tbody>

                {recentAssets.length > 0 ? (

                  recentAssets.map((item) => (

                    <tr key={item.id}>

                      <td>{item.asset_name}</td>

                      <td>{item.category_name}</td>

                      <td>
                          <span className={`status ${item.status.toLowerCase()}`}>
                            {item.status}
                          </span>
                        </td>
                      <td>{item.location}</td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="4"
                      style={{
                        textAlign: "center",
                        padding: "30px",
                      }}
                    >
                      No Assets Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* Warranty Alerts */}

          <div className="table-card">

            <div className="card-title">
              <h2>Warranty Expiring Soon</h2>
            </div>

            <table className="dashboard-table">

              <thead>

                <tr>
                  <th>Asset ID</th>
                  <th>Asset Name</th>
                  <th>Category</th>
                  <th>Warranty Expiry</th>
                  <th>Days Left</th>
                </tr>

              </thead>

              <tbody>

                {expiringSoon.length > 0 ? (

                  expiringSoon.map((item) => {

                    const daysLeft = Math.ceil(
                      (new Date(item.warranty_expiry) - today) /
                        (1000 * 60 * 60 * 24)
                    );

                    return (

                      <tr key={item.id}>

                        <td>{item.asset_id}</td>

                        <td>{item.asset_name}</td>

                        <td>{item.category_name}</td>

                        <td>{item.warranty_expiry}</td>

                        <td>

                          <span
                            className={
                              daysLeft <= 7
                                ? "danger-badge"
                                : "warning-badge"
                            }
                          >
                            {daysLeft} Days
                          </span>

                        </td>

                      </tr>

                    );

                  })

                ) : (

                  <tr>

                    <td
                      colSpan="5"
                      style={{
                        textAlign: "center",
                        padding: "30px",
                      }}
                    >
                      No Warranty Alerts
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>
                    {/* Recent Activity */}

          <div className="activity-card">

            <div className="card-title">
              <h2>Recent Activity</h2>
            </div>

            <div className="activity-list">

              <div className="activity-item">

                <div className="activity-icon blue-bg">
                  <FaLaptop />
                </div>

                <div className="activity-content">
                  <h4>Dashboard Summary</h4>
                  <p>Inventory data loaded successfully.</p>
                </div>

                <span className="activity-time">
                  Today
                </span>

              </div>

              <div className="activity-item">

                <div className="activity-icon orange-bg">
                  <FaTools />
                </div>

                <div className="activity-content">
                  <h4>Warranty Check</h4>
                  <p>Warranty alerts generated from database.</p>
                </div>

                <span className="activity-time">
                  Today
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </>

  );

}

export default Dashboard;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Hero.css";

function Hero() {

  const [assets, setAssets] = useState([]);
  const [maintenance, setMaintenance] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {

      const [assetRes, maintenanceRes] = await Promise.all([
        axios.get("http://127.0.0.1:8000/api/assets/"),
        axios.get("http://127.0.0.1:8000/api/maintenance/")
      ]);

      setAssets(assetRes.data);
      setMaintenance(maintenanceRes.data);

    } catch (err) {
      console.log(err);
    }
  };

  const totalAssets = assets.length;

  const availableAssets =
    assets.filter(item => item.status === "Available").length;

  const assignedAssets =
    assets.filter(item => item.status === "Assigned").length;

  const maintenanceAssets =
    maintenance.filter(
      item =>
        item.status === "Pending" ||
        item.status === "In Progress"
    ).length;

  const recentMaintenance =
    [...maintenance].reverse().slice(0,4);

  return(

<section className="hero">

<div className="hero-content">

<h1>
Manage Your
<br/>
<span>Company Assets</span>
</h1>

<p>
Track company assets, assign equipment to employees,
monitor maintenance and generate reports from one
secure dashboard.
</p>

<Link
to="/login"
className="primary-btn"
>
Login
</Link>

</div>

<div className="hero-image">

<div className="dashboard-preview">

<div className="dashboard-header">

<h3>Inventory Overview</h3>

<span className="online">
● Live
</span>

</div>

<div className="dashboard-grid">

<div className="dashboard-card">
<h2>{totalAssets}</h2>
<p>Total Assets</p>
</div>

<div className="dashboard-card">
<h2>{availableAssets}</h2>
<p>Available</p>
</div>

<div className="dashboard-card">
<h2>{assignedAssets}</h2>
<p>Assigned</p>
</div>

<div className="dashboard-card">
<h2>{maintenanceAssets}</h2>
<p>Maintenance</p>
</div>

</div>

<div className="activity-section">

<h4>Recent Activity</h4>
{recentMaintenance.length > 0 ? (

  recentMaintenance.map((item) => (

    <div
      className="activity-item"
      key={item.id}
    >

      <div className="activity-body">

        <div className="activity-field">

          <span className="label">
            Asset Name
          </span>

          <span className="colon">
            :
          </span>

          <span className="value">
            {item.asset_name}
          </span>

        </div>

        <div className="activity-field">

          <span className="label">
            Issue
          </span>

          <span className="colon">
            :
          </span>

          <span className="value">
            {item.issue}
          </span>

        </div>

        <div className="activity-field">

          <span className="label">
            Status
          </span>

          <span className="colon">
            :
          </span>

          <span
            className={
              item.status === "Completed"
                ? "completed"
                : item.status === "In Progress"
                ? "progress"
                : "pending"
            }
          >
            {item.status}
          </span>

        </div>

      </div>

    </div>

  ))

) : (

  <div className="activity-item">

    <p>No Recent Activity</p>

  </div>

)}
        </div>

      </div>

    </div>

  </section>

);

}

export default Hero;
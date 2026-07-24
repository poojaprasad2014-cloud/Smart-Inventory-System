import "../styles/Hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <h1>
          Manage Your
          <br />
          <span>Company Assets</span>
        </h1>

        <p>
          Track company assets, assign equipment to employees,
          monitor maintenance and generate reports from one secure
          dashboard.
        </p>

        <Link to="/login" className="primary-btn">
          Login
        </Link>

      </div>

      <div className="hero-image">

        <div className="dashboard-preview">

          <div className="dashboard-header">
            <h3>Inventory Overview</h3>
            <span className="online">● Live</span>
          </div>

          <div className="dashboard-grid">

            <div className="dashboard-card">
              <h2>5</h2>
              <p>Total Assets</p>
            </div>

            <div className="dashboard-card">
              <h2>1</h2>
              <p>Available</p>
            </div>

            <div className="dashboard-card">
              <h2>0</h2>
              <p>Assigned</p>
            </div>

            <div className="dashboard-card">
              <h2>2</h2>
              <p>Maintenance</p>
            </div>

          </div>

          <div className="activity-section">

            <h4>Recent Activity</h4>

            <div className="activity-item">
              Dell Latitude 5420 - Battery Replacement
              <br />
              Status : Completed
            </div>

            <div className="activity-item">
              HP ProDesk 400 - Window OS Installation
              <br />
              Status : In Progress
            </div>

            <div className="activity-item">
              Canon LBP2900 - Toner Replacement
              <br />
              Status : Pending
            </div>

            <div className="activity-item">
              Dell 24 Inch Monitor - Display Flickering
              <br />
              Status : Completed
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;
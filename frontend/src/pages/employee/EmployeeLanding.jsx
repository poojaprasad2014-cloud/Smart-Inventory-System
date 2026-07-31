import { Link } from "react-router-dom";
import "../../styles/EmployeeLanding.css";

function EmployeeLanding() {
  return (
    <div className="employee-home">

      {/* ================= NAVBAR ================= */}

      <nav className="employee-navbar">

        <div className="employee-logo">
          Smart<span>Inventory</span>
        </div>

        <ul className="employee-nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <Link to="/login" className="employee-login-btn">
          Login
        </Link>

      </nav>

      {/* ================= HERO ================= */}

      <section className="hero-section" id="home">

        <div className="hero-left">

          <h1>
            Manage Your <br />
            <span>Assigned Assets</span>
          </h1>

          <p>
            View your assigned company assets, submit maintenance
            requests, and track their status from one secure dashboard.
          </p>

          <div className="hero-buttons">
            <Link to="/login" className="primary-btn">
              Login
            </Link>
          </div>

        </div>
                <div className="hero-right">

          <div className="hero-card">

            <div className="hero-card-header">
              <h2>Employee Overview</h2>
              <span className="online">● Live</span>
            </div>

            <div className="dashboard-list">

              <div className="dashboard-item">
                <span>💻</span>
                <span>View Assigned Assets</span>
              </div>

              <div className="dashboard-item">
                <span>🛠️</span>
                <span>Raise Maintenance Request</span>
              </div>

              <div className="dashboard-item">
                <span>📋</span>
                <span>Track Request Status</span>
              </div>

              <div className="dashboard-item">
                <span>✔️</span>
                <span>Real-Time Updates</span>
              </div>

            </div>

          </div>

        </div>

      </section>
      {/* ================= SERVICES ================= */}

<section className="services-section" id="services">

  <h2 className="section-heading">
    Employee Services
  </h2>

  <p className="section-subtitle">
    Everything you need to manage your assigned assets.
  </p>

  <div className="service-grid">

    <div className="service-card">

      <div className="service-icon">💻</div>

      <h3>My Assets</h3>

      <p>
        View all assets assigned to your account with complete
        asset information.
      </p>

    </div>

    <div className="service-card">

      <div className="service-icon">🛠️</div>

      <h3>Maintenance</h3>

      <p>
        Submit maintenance requests whenever your assigned
        asset requires service.
      </p>

    </div>

    <div className="service-card">

      <div className="service-icon">📊</div>

      <h3>Track Status</h3>

      <p>
        Track every maintenance request from Pending
        to Completed.
      </p>

    </div>

  </div>

</section>
{/* ================= ABOUT ================= */}

<section className="about-section" id="about">

  <h2 className="section-heading">
    About Employee Portal
  </h2>

  <p className="section-subtitle">
    The Employee Portal allows employees to manage assigned assets,
    raise maintenance requests and monitor request status from one
    secure platform.
  </p>

  <div className="about-grid">

    <div className="about-card">

      <h3>Assigned Assets</h3>

      <p>
        View complete information about all company assets
        assigned to you.
      </p>

    </div>

    <div className="about-card">

      <h3>Maintenance Requests</h3>

      <p>
        Raise maintenance requests quickly whenever an
        issue occurs.
      </p>

    </div>

    <div className="about-card">

      <h3>Live Status</h3>

      <p>
        Monitor maintenance requests from Pending,
        In Progress and Completed.
      </p>

    </div>

  </div>

</section>
{/* ================= FOOTER ================= */}
{/* ================= FOOTER ================= */}

{/* <footer id="contact" className="employee-footer"> */}

{/* <div id="contact"></div>

<footer className="employee-footer"> */}

{/* <footer id="contact" className="employee-footer"> */}

<div id="contact" className="contact-anchor"></div>

<footer className="employee-footer">

  

  <div className="footer-content">

    <div className="footer-links">

      <div className="footer-column">

        <h2 className="footer-brand">
          Smart<span>Inventory</span>
        </h2>

        <p>
          Smart Inventory System provides an easy and secure
          platform for employees to manage assigned assets,
          raise maintenance requests and track service status.
        </p>

      </div>

      <div className="footer-column">

        <h3>Quick Links</h3>

        <a href="#home">Home</a>
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>

      </div>

      <div className="footer-column">

        <h3>Employee Services</h3>

        <Link to="/employee-dashboard">My Dashboard</Link>
        <Link to="/my-profile">My Profile</Link>
        <Link to="/my-assets">My Assets</Link>
        <Link to="/raise-complaint">Raise Complaint</Link>
        <Link to="/my-complaints">My Complaints</Link>

      </div>

      <div className="footer-column">

        <h3>Contact</h3>

        <p>📧 admin@smartinventory.com</p>
        <p>📞 +91 98765 43210</p>
        <p>📍 Trivandrum, Kerala</p>

      </div>

    </div>

    <div className="footer-bottom">

      <p>
        © 2026 Smart Inventory System. All Rights Reserved.
      </p>

    </div>

  </div>

</footer>

</div>

  );
}

export default EmployeeLanding;
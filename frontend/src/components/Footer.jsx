import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer" id="contact">

      <div className="footer-container">

        <div className="footer-box">

          <h2>
            Smart<span>Inventory</span>
          </h2>

          <p>
            Smart Inventory & Asset Tracking System helps companies
            manage assets, employees, maintenance and reports with a
            secure and modern platform.
          </p>

        </div>

        <div className="footer-box">

          <h3>Quick Links</h3>

          <a href="#">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="/login">Login</a>

        </div>

        <div className="footer-box">

          <h3>Services</h3>

          <p>Asset Management</p>
          <p>Employee Assignment</p>
          <p>Maintenance Tracking</p>
          <p>Reports & Analytics</p>

        </div>

        <div className="footer-box">

          <h3>Contact</h3>

          <p>📧 admin@smartinventory.com</p>

          <p>📞 +91 98765 43210</p>

          <p>📍 Trivandrum, Kerala</p>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © 2026 Smart Inventory & Asset Tracking System.
          All Rights Reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;
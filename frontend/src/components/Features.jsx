import "../styles/Features.css";

function Features() {
  return (
    <section className="features" id="features">

      <div className="section-title">

        <span>WHY CHOOSE US</span>

        <h2>Powerful Features For Modern Asset Management</h2>

        <p>
          Everything you need to manage company assets, employees,
          maintenance and reports in one secure platform.
        </p>

      </div>

      <div className="feature-grid">

        <div className="feature-card">

          <div className="icon">📦</div>

          <h3>Asset Management</h3>

          <p>
            Store, update and manage all company assets from a
            centralized dashboard.
          </p>

        </div>

        <div className="feature-card">

          <div className="icon">👨‍💼</div>

          <h3>Employee Assignment</h3>

          <p>
            Assign laptops, desktops and devices to employees with
            complete tracking.
          </p>

        </div>

        <div className="feature-card">

          <div className="icon">🛠</div>

          <h3>Maintenance Tracking</h3>

          <p>
            Monitor repair history, maintenance schedule and warranty
            information.
          </p>

        </div>

        <div className="feature-card">

          <div className="icon">📊</div>

          <h3>Reports</h3>

          <p>
            View detailed reports and asset statistics instantly.
          </p>

        </div>

        <div className="feature-card">

          <div className="icon">🔍</div>

          <h3>Smart Search</h3>

          <p>
            Quickly search assets using name, category or employee.
          </p>

        </div>

        <div className="feature-card">

          <div className="icon">🔒</div>

          <h3>Secure System</h3>

          <p>
            Role-based authentication with secure access to company
            inventory.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Features;
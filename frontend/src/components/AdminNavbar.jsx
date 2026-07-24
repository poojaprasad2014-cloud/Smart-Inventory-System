import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/AdminNavbar.css";

function AdminNavbar() {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("employee");
    navigate("/");
  };

  return (

    <header className="admin-navbar">

      <div className="admin-logo">
        Smart<span>Inventory</span>
      </div>

      <nav className="admin-links">

        <NavLink to="/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/assets">
          Assets
        </NavLink>

        <NavLink to="/employees">
          Employees
        </NavLink>

        <NavLink to="/maintenance">
          Maintenance
        </NavLink>

        <NavLink to="/reports">
          Reports
        </NavLink>

        <div className="dropdown">

          <button
            className="dropdown-btn"
            onClick={() => setOpen(!open)}
          >
            More ▼
          </button>

          {open && (

            <div className="dropdown-menu">

              <NavLink
                to="/categories"
                onClick={() => setOpen(false)}
              >
                Categories
              </NavLink>

              <NavLink
                to="/assignments"
                onClick={() => setOpen(false)}
              >
                Assignment
              </NavLink>

              <NavLink
                to="/recycling"
                onClick={() => setOpen(false)}
              >
                Recycling
              </NavLink>

              <NavLink
                to="/warranty-alert"
                onClick={() => setOpen(false)}
              >
                Warranty Alerts
              </NavLink>

            </div>

          )}

        </div>

      </nav>

      <div className="logout-area">

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </header>

  );

}

export default AdminNavbar;
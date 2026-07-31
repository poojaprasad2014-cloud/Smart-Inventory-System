import { Link, useNavigate } from "react-router-dom";
import "../styles/EmployeeNavbar.css";

function EmployeeNavbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("employee");
    navigate("/employee-home");
  };

  return (

    <header className="employee-navbar">

      <div className="employee-logo">
        Smart<span>Inventory</span>
      </div>

      <nav className="employee-links">

        <Link to="/employee-dashboard">Dashboard</Link>

        <Link to="/my-profile">My Profile</Link>

        <Link to="/my-assets">My Assets</Link>

        <Link to="/raise-complaint">Raise Complaint</Link>

        <Link to="/my-complaints">My Complaints</Link>

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

export default EmployeeNavbar;
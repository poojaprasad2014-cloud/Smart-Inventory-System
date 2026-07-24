import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <header className="navbar">

      <div className="logo">
        Smart<span>Inventory</span>
      </div>

      <nav>

        <ul className="nav-links">

          <li>
            <a href="#">Home</a>
          </li>

          <li>
            <a href="#features">Features</a>
          </li>

          <li>
            <a href="#about">About</a>
          </li>

          <li>
            <a href="#contact">Contact</a>
          </li>

        </ul>

      </nav>

      <div className="nav-btn">

        <Link to="/login" className="login-btn">
          Login
        </Link>

        <Link to="/login" className="start-btn">
          Get Started
        </Link>

      </div>

    </header>
  );
}

export default Navbar;
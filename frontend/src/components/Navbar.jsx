import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

  const scrollToSection = (id) => (e) => {
    e.preventDefault();

    const element = document.getElementById(id);

    if (element) {
      const navbarHeight = 80;

      const y =
        element.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="navbar">

      <div className="logo">
        Smart<span>Inventory</span>
      </div>

      <nav>
        <ul className="nav-links">

          <li>
            <a href="#home" onClick={scrollToSection("home")}>
              Home
            </a>
          </li>

          <li>
            <a href="#features" onClick={scrollToSection("features")}>
              Features
            </a>
          </li>

          <li>
            <a href="#about" onClick={scrollToSection("about")}>
              About
            </a>
          </li>

          <li>
            <a href="#contact" onClick={scrollToSection("contact")}>
              Contact
            </a>
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
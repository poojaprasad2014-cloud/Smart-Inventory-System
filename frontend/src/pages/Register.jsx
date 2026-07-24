import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employee_id: "",
    employee_name: "",
    department: "",
    designation: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://127.0.0.1:8000/api/employees/",
        formData
      );

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      console.log(error.response?.data);

      alert("Registration Failed");

    }

  };

  return (

    <div className="register-container">

      <div className="register-box">

        <h1>Employee Registration</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="employee_id"
            placeholder="Employee ID"
            value={formData.employee_id}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="employee_name"
            placeholder="Employee Name"
            value={formData.employee_name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={formData.designation}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <button type="submit">

            Register

          </button>

        </form>

        <p>

          Already have an account?

          <Link to="/login"> Login</Link>

        </p>

      </div>

    </div>

  );

}

export default Register;
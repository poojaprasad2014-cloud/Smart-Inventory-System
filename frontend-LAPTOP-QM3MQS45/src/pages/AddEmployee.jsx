import { useState } from "react";
import axios from "axios";
import "../styles/AddEmployee.css";

function AddEmployee() {
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
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/employees/",
        formData
      );

      alert("Employee Added Successfully");

      window.location.href = "/employees";
    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to Add Employee");
    }
  };

  return (
    <div className="add-employee-page">
      <h1>Add Employee</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="employee_id"
          placeholder="Employee ID"
          value={formData.employee_id || ""}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="employee_name"
          placeholder="Employee Name"
          value={formData.employee_name || ""}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department || ""}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={formData.designation || ""}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email || ""}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password || ""}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone || ""}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Save Employee
        </button>
      </form>
    </div>
  );
}

export default AddEmployee;
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/EditEmployee.css";

function EditEmployee() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    employee_id: "",
    employee_name: "",
    department: "",
    designation: "",
    email: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    loadEmployee();
  }, [id]);

  const loadEmployee = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/employees/${id}/`
      );

      setFormData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://127.0.0.1:8000/api/employees/${id}/`,
        formData
      );

      alert("Employee Updated Successfully");

      window.location.href = "/employees";

    } catch (error) {
      console.log(error.response?.data);
      alert("Update Failed");
    }
  };

  return (
    <div className="edit-employee-page">

      <h1>Edit Employee</h1>

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
          Update Employee
        </button>

      </form>

    </div>
  );
}

export default EditEmployee;
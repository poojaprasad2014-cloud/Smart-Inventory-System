import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AddMaintenance.css";

function AddMaintenance() {
  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    asset: "",
    employee: "",
    issue: "",
    reported_date: "",
    completed_date: "",
    status: "Pending",
  });

  useEffect(() => {
    loadAssets();
    loadEmployees();
  }, []);

  const loadAssets = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/assets/"
      );

      setAssets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadEmployees = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/employees/"
      );

      setEmployees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...formData,
      completed_date:
        formData.completed_date === ""
          ? null
          : formData.completed_date,
    };

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/maintenance/",
        data
      );

      alert("Maintenance Added Successfully");

      window.location.href = "/maintenance";
    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to Add Maintenance");
    }
  };

  return (
    <div className="add-maintenance-page">
      <h1>Add Maintenance</h1>

      <form onSubmit={handleSubmit}>
        <select
          name="asset"
          value={formData.asset || ""}
          onChange={handleChange}
          required
        >
          <option value="">Select Asset</option>

          {assets.map((item) => (
            <option key={item.id} value={item.id}>
              {item.asset_id} - {item.asset_name}
            </option>
          ))}
        </select>

        <select
          name="employee"
          value={formData.employee || ""}
          onChange={handleChange}
          required
        >
          <option value="">Select Employee</option>

          {employees.map((item) => (
            <option key={item.id} value={item.id}>
              {item.employee_id} - {item.employee_name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="issue"
          placeholder="Enter Issue"
          value={formData.issue || ""}
          onChange={handleChange}
          required
        />

        <label>Reported Date</label>

        <input
          type="date"
          name="reported_date"
          value={formData.reported_date || ""}
          onChange={handleChange}
          required
        />

        <label>Completed Date</label>

        <input
          type="date"
          name="completed_date"
          value={formData.completed_date || ""}
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status || ""}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit">
          Save Maintenance
        </button>
      </form>
    </div>
  );
}

export default AddMaintenance;
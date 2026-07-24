import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AddAssignment.css";

function AddAssignment() {

  const navigate = useNavigate();

  const [assets, setAssets] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    asset: "",
    employee: "",
    assigned_date: "",
    return_date: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {

      const assetResponse = await axios.get(
        "http://127.0.0.1:8000/api/assets/"
      );

      const employeeResponse = await axios.get(
        "http://127.0.0.1:8000/api/employees/"
      );

      setAssets(assetResponse.data);
      setEmployees(employeeResponse.data);

    } catch (error) {
      console.log(error);
      alert("Failed to Load Data");
    }
  };

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
        "http://127.0.0.1:8000/api/assignments/",
        formData
      );

      alert("Asset Assigned Successfully");
      navigate("/assignments");

    } catch (error) {
      console.log(error);
      alert("Assignment Failed");
    }
  };

  return (
    <div className="form-container">

      <h1>Assign Asset</h1>

      <form onSubmit={handleSubmit}>

        <select
          name="asset"
          value={formData.asset}
          onChange={handleChange}
          required
        >
          <option value="">Select Asset</option>

          {assets.map((item) => (
            <option key={item.id} value={item.id}>
              {item.asset_name}
            </option>
          ))}
        </select>

        <select
          name="employee"
          value={formData.employee}
          onChange={handleChange}
          required
        >
          <option value="">Select Employee</option>

          {employees.map((item) => (
            <option key={item.id} value={item.id}>
              {item.employee_name}
            </option>
          ))}
        </select>

        <div className="date-group">
          <label>Assigned Date</label>

          <input
            type="date"
            name="assigned_date"
            value={formData.assigned_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="date-group">
          <label>Return Date</label>

          <input
            type="date"
            name="return_date"
            value={formData.return_date}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          Assign Asset
        </button>

      </form>

    </div>
  );
}

export default AddAssignment;
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/EditMaintenance.css";

function EditMaintenance() {

  const navigate = useNavigate();
  const { id } = useParams();

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
    loadMaintenance();
  }, []);

  const loadAssets = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/assets/");
      setAssets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadEmployees = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/employees/");
      setEmployees(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMaintenance = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/maintenance/${id}/`
      );

      setFormData({
        asset: response.data.asset,
        employee: response.data.employee,
        issue: response.data.issue,
        reported_date: response.data.reported_date,
        completed_date: response.data.completed_date || "",
        status: response.data.status,
      });

    } catch (error) {
      console.log(error);
      alert("Failed to Load Maintenance");
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

      await axios.put(
        `http://127.0.0.1:8000/api/maintenance/${id}/`,
        formData
      );

      alert("Maintenance Updated Successfully");
      navigate("/maintenance");

    } catch (error) {

      console.log(error.response?.data);
      alert("Update Failed");

    }

  };

  return (

    <div className="edit-maintenance-page">

      <h1>Edit Maintenance</h1>

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
              {item.asset_id} - {item.asset_name}
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
              {item.employee_id} - {item.employee_name}
            </option>
          ))}
        </select>

       
        <input
          type="text"
          name="issue"
          placeholder="Enter Issue"
          value={formData.issue}
          onChange={handleChange}
          required
        />

        <label>Reported Date</label>

        <input
          type="date"
          name="reported_date"
          value={formData.reported_date}
          onChange={handleChange}
          required
        />

        <label>Completed Date</label>

        <input
          type="date"
          name="completed_date"
          value={formData.completed_date}
          onChange={handleChange}
        />

       

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <button type="submit">
          Update Maintenance
        </button>

      </form>

    </div>

  );

}

export default EditMaintenance;
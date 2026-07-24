import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/EditAssignment.css";

function EditAssignment() {

  const { id } = useParams();
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

      const assignmentResponse = await axios.get(
        `http://127.0.0.1:8000/api/assignments/${id}/`
      );

      setAssets(assetResponse.data);
      setEmployees(employeeResponse.data);

      setFormData({
        asset: assignmentResponse.data.asset,
        employee: assignmentResponse.data.employee,
        assigned_date: assignmentResponse.data.assigned_date,
        return_date: assignmentResponse.data.return_date || "",
      });

    } catch (error) {

      console.log(error);
      alert("Failed to Load Assignment");

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
        `http://127.0.0.1:8000/api/assignments/${id}/`,
        formData
      );

      alert("Assignment Updated Successfully");

      navigate("/assignments");

    } catch (error) {

      console.log(error);
      alert("Update Failed");

    }

  };

  return (

    <div className="form-container">

      <h1>Edit Asset Assignment</h1>

      <form onSubmit={handleSubmit}>

       

        <select
          name="asset"
          value={formData.asset}
          onChange={handleChange}
          required
        >

          <option value="">Select Asset</option>

          {assets.map((item) => (

            <option
              key={item.id}
              value={item.id}
            >
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

            <option
              key={item.id}
              value={item.id}
            >
              {item.employee_name}
            </option>

          ))}

        </select>

        <label>Assigned Date</label>

        <input
          type="date"
          name="assigned_date"
          value={formData.assigned_date}
          onChange={handleChange}
          required
        />

        <label>Return Date</label>

        <input
          type="date"
          name="return_date"
          value={formData.return_date}
          onChange={handleChange}
        />

        <button type="submit">
          Update Assignment
        </button>

      </form>

    </div>

  );

}

export default EditAssignment;
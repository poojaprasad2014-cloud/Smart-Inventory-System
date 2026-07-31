import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/DeleteEmployee.css";

function DeleteEmployee() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({});

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {

    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/api/employees/${id}/`
      );

      setEmployee(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete = async () => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/api/employees/${id}/`
      );

      alert("Employee Deleted Successfully");

      navigate("/employees");

    } catch (error) {

      console.log(error);

      alert("Delete Failed");

    }

  };
    return (

    <div className="delete-employee-page">

      <h1>Delete Employee</h1>

      <p>

        Are you sure you want to delete

        <br />

        <strong>{employee.employee_name}</strong> ?

      </p>

      <div className="delete-btn-group">

        <button
          className="confirm-btn"
          onClick={handleDelete}
        >
          Yes, Delete
        </button>

        <button
          className="cancel-btn"
          onClick={() => navigate("/employees")}
        >
          Cancel
        </button>

      </div>

    </div>

  );

}

export default DeleteEmployee;
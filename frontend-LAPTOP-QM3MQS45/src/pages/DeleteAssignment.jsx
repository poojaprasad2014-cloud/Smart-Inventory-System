import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/DeleteAssignment.css";

function DeleteAssignment() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState({});

  useEffect(() => {
    loadAssignment();
  }, []);

  const loadAssignment = async () => {

    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/api/assignments/${id}/`
      );

      setAssignment(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete = async () => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/api/assignments/${id}/`
      );

      alert("Assignment Deleted Successfully");

      navigate("/assignments");

    } catch (error) {

      console.log(error);

      alert("Delete Failed");

    }

  };

  return (

    <div className="delete-assignment-page">

      <h1>Delete Assignment</h1>

      <p>

        Are you sure you want to delete

        <br />

        <strong>{assignment.asset_name}</strong> ?

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
          onClick={() => navigate("/assignments")}
        >
          Cancel
        </button>

      </div>

    </div>

  );

}

export default DeleteAssignment;
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/DeleteMaintenance.css";

function DeleteMaintenance() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [maintenance, setMaintenance] = useState({});

  useEffect(() => {
    loadMaintenance();
  }, []);

  const loadMaintenance = async () => {

    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/api/maintenance/${id}/`
      );

      setMaintenance(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete = async () => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/api/maintenance/${id}/`
      );

      alert("Maintenance Deleted Successfully");

      navigate("/maintenance");

    } catch (error) {

      console.log(error);

      alert("Delete Failed");

    }

  };
    return (

    <div className="delete-maintenance-page">

      <h1>Delete Maintenance</h1>

      <p>

        Are you sure you want to delete

        <br />

        <strong>{maintenance.asset_name}</strong> ?

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
          onClick={() => navigate("/maintenance")}
        >
          Cancel
        </button>

      </div>

    </div>

  );

}

export default DeleteMaintenance;
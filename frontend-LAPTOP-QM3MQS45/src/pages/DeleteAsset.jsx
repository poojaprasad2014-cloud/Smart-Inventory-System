import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/DeleteAsset.css";

function DeleteAsset() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [asset, setAsset] = useState({});

  useEffect(() => {
    loadAsset();
  }, []);

  const loadAsset = async () => {

    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/api/assets/${id}/`
      );

      setAsset(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete = async () => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/api/assets/${id}/`
      );

      alert("Asset Deleted Successfully");

      navigate("/assets");

    } catch (error) {

      console.log(error);

      alert("Delete Failed");

    }

  };

  return (

    <div className="delete-asset-page">

      <h1>Delete Asset</h1>

      <p>
        Are you sure you want to delete
        <br />
        <strong>{asset.asset_name}</strong> ?
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
          onClick={() => navigate("/assets")}
        >
          Cancel
        </button>

      </div>

    </div>

  );

}

export default DeleteAsset;
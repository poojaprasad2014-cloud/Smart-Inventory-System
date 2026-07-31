import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/DeleteCategory.css";

function DeleteCategory() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState({});

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {

    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/api/categories/${id}/`
      );

      setCategory(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete = async () => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/api/categories/${id}/`
      );

      alert("Category Deleted Successfully");

      navigate("/categories");

    } catch (error) {

      console.log(error);

      alert("Delete Failed");

    }

  };
    return (

    <div className="delete-category-page">

      <h1>Delete Category</h1>

      <p>
        Are you sure you want to delete
        <br />
        <strong>{category.category_name || "this category"}</strong> ?
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
          onClick={() => navigate("/categories")}
        >
          Cancel
        </button>

      </div>

    </div>

  );

}

export default DeleteCategory;
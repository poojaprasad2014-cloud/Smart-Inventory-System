import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AddCategory.css";

function AddCategory() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category_name: "",
    description: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://127.0.0.1:8000/api/categories/",
        formData
      );

      alert("Category Added Successfully");

      navigate("/categories");

    } catch (error) {

      console.log(error);

      alert("Failed to Add Category");

    }

  };
    return (

    <div className="add-category-page">

      <h1>Add Category</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="category_name"
          placeholder="Category Name"
          value={formData.category_name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">
          Save Category
        </button>

      </form>

    </div>

  );

}

export default AddCategory;
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/EditCategory.css";

function EditCategory() {

  const { id } = useParams();

  const [formData, setFormData] = useState({
    category_name: "",
    description: "",
  });

  useEffect(() => {
    loadCategory();
  }, [id]);

  const loadCategory = async () => {
    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/api/categories/${id}/`
      );

      setFormData({
        category_name: response.data.category_name || "",
        description: response.data.description || "",
      });

    } catch (error) {

      console.log(error);

    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.put(
        `http://127.0.0.1:8000/api/categories/${id}/`,
        formData
      );

      alert("Category Updated Successfully");

      // Temporary test
      window.location.href = "/categories";

    } catch (error) {

      console.log(error);
      alert("Update Failed");

    }
  };

  return (
    <div className="edit-category-page">

      <h1>Edit Category</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="category_name"
          placeholder="Category Name"
          value={formData.category_name || ""}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description || ""}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Update Category
        </button>

      </form>

    </div>
  );
}

export default EditCategory;
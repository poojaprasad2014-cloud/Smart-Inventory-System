import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AddAsset.css";

function AddAsset() {
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    asset_id: "",
    category: "",
    asset_name: "",
    brand: "",
    model: "",
    serial_number: "",
    purchase_date: "",
    warranty_expiry: "",
    price: "",
    location: "",
    status: "",
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/categories/"
      );

      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/assets/",
        formData
      );

      alert("Asset Added Successfully");

      window.location.href = "/assets";
    } catch (error) {
      console.log(error);
      alert("Failed to Add Asset");
    }
  };

  return (
    <div className="add-asset-page">
      <h1>Add Asset</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="asset_id"
          placeholder="Asset ID (Example: AST001)"
          value={formData.asset_id || ""}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={formData.category || ""}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>

          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.category_name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="asset_name"
          placeholder="Asset Name"
          value={formData.asset_name || ""}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand || ""}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="model"
          placeholder="Model"
          value={formData.model || ""}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="serial_number"
          placeholder="Serial Number"
          value={formData.serial_number || ""}
          onChange={handleChange}
          required
        />

        <label className="date-label">
          Purchase Date
        </label>

        <input
          type="date"
          name="purchase_date"
          value={formData.purchase_date || ""}
          onChange={handleChange}
          required
        />

        <label className="date-label">
          Warranty Expiry Date
        </label>

        <input
          type="date"
          name="warranty_expiry"
          value={formData.warranty_expiry || ""}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price || ""}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location || ""}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={formData.status || ""}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Status
          </option>

          <option value="Available">Available</option>
          <option value="Assigned">Assigned</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Disposed">Disposed</option>
        </select>

        <button type="submit">
          Save Asset
        </button>
      </form>
    </div>
  );
}

export default AddAsset;
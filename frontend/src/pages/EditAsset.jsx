import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AddAsset.css";

function EditAsset() {

  const navigate = useNavigate();
  const { id } = useParams();

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
    status: "Available",
  });

  // useEffect(() => {
  //   loadCategories();
  //   loadAsset();
  // }, [id]);


  useEffect(() => {
  console.log("EditAsset mounted");
  console.log("Current ID:", id);

  loadCategories();
  loadAsset();
}, [id]);

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

  const loadAsset = async () => {

    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/api/assets/${id}/`
      );

      setFormData(response.data);

    } catch (error) {

      console.log(error);

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
        `http://127.0.0.1:8000/api/assets/${id}/`,
        formData
      );

      alert("Asset Updated Successfully");

      navigate("/assets");

    } catch (error) {

      console.log(error);

      alert("Update Failed");

    }

  };

  return (

    <div className="add-asset-page">

      <h1>Edit Asset</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="asset_id"
          placeholder="Asset ID"
          value={formData.asset_id}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >

          <option value="">Select Category</option>

          {categories.map((item) => (

            <option
              key={item.id}
              value={item.id}
            >
              {item.category_name}
            </option>

          ))}

        </select>

        <input
          type="text"
          name="asset_name"
          placeholder="Asset Name"
          value={formData.asset_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="model"
          placeholder="Model"
          value={formData.model}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="serial_number"
          placeholder="Serial Number"
          value={formData.serial_number}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="purchase_date"
          value={formData.purchase_date}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="warranty_expiry"
          value={formData.warranty_expiry}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Available">Available</option>
          <option value="Assigned">Assigned</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Disposed">Disposed</option>
        </select>

        <button type="submit">
          Update Asset
        </button>

      </form>

    </div>

  );

}

export default EditAsset;
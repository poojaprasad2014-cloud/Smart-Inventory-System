import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/Categories.css";

function Categories() {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    const admin = localStorage.getItem("admin");

    if (!admin) {
      navigate("/login");
      return;
    }

    fetchCategories();

  }, [navigate]);

  const fetchCategories = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/categories/"
      );

      setCategories(response.data);

    } catch (error) {

      console.log(error);
      alert("Failed to Load Categories");

    }

  };

  // ================= Search =================

  const filteredCategories = categories.filter((item) => {

  const keyword = search.trim().toLowerCase();

  if (keyword === "") return true;

  const id = String(item.id || "").trim();
  const category = String(item.category_name || "").trim().toLowerCase();
  const description = String(item.description || "").trim().toLowerCase();

  return (
    id.startsWith(keyword) ||
    category.startsWith(keyword) ||
    description.startsWith(keyword)
  );

});
  return (

    <>

      <AdminNavbar />

      <div className="category-page">

        <div className="category-header">

          <div>

            <h1>Category Management</h1>

            <p>Manage All Asset Categories</p>

          </div>

          <Link
            to="/add-category"
            className="add-btn"
          >
            + Add Category
          </Link>

        </div>

        <div className="search-box">

          <input
            type="text"
            placeholder="Search ID, Category or Description..."
            value={search}
            autoComplete="off"
            spellCheck={false}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="category-table">

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Category Name</th>
                <th>Description</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredCategories.length > 0 ? (

                filteredCategories.map((item) => (
                                    <tr key={item.id}>

                    <td>{item.id}</td>

                    <td>{item.category_name}</td>

                    <td>{item.description}</td>

                    <td>

                      <Link
                          to={`/edit-category/${item.id}`}
                          state={{ refresh: Date.now() }}
                          className="edit-btn"
                        >
                          Edit
                        </Link>

                      <Link
                        to={`/delete-category/${item.id}`}
                        className="delete-btn"
                      >
                        Delete
                      </Link>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="4"
                    style={{
                      textAlign: "center",
                      padding: "20px"
                    }}
                  >
                    No Categories Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>
              </div>

    </>

  );

}

export default Categories;
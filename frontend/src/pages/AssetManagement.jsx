import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/AssetManagement.css";

function AssetManagement() {

  const navigate = useNavigate();

  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    const admin = localStorage.getItem("admin");

    if (!admin) {
      navigate("/login");
      return;
    }

    fetchAssets();

  }, [navigate]);

  // ================= Fetch Assets =================

  const fetchAssets = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/assets/"
      );

      setAssets(response.data);

    } catch (error) {

      console.log("Asset Error :", error);
      alert("Failed to Load Assets");

    }

  };

  // ================= Search =================

  const filteredAssets = assets.filter((item) => {

    const keyword = search.trim().toLowerCase();

    if (keyword === "") return true;

    return (
      String(item.asset_id || "").toLowerCase().startsWith(keyword) ||
      String(item.asset_name || "").toLowerCase().startsWith(keyword) ||
      String(item.category_name || "").toLowerCase().startsWith(keyword) ||
      String(item.location || "").toLowerCase().startsWith(keyword) ||
      String(item.status || "").toLowerCase().startsWith(keyword)
    );

  });
    return (

    <>

      <AdminNavbar />

      <div className="asset-page">

        <div className="asset-header">

          <div>

            <h1>Asset Management</h1>

            <p>Manage All Company Assets</p>

          </div>

          <Link
            to="/add-asset"
            className="asset-add-btn"
          >
            + Add Asset
          </Link>

        </div>

        <div className="search-area">

          <input
            type="text"
            placeholder="Search Asset ID, Asset Name, Category..."
            value={search}
            autoComplete="off"
            spellCheck={false}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="asset-table">

          <table>

            <thead>

              <tr>

                <th>Asset ID</th>
                <th>Asset Name</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredAssets.length > 0 ? (

                filteredAssets.map((item) => (

                  <tr key={item.id}>

                    <td>{item.asset_id}</td>

                    <td>{item.asset_name}</td>

                    <td>{item.category_name}</td>

                    <td>{item.location}</td>

                    <td>
                        <span
                          className={
                            item.status === "Available"
                              ? "asset-available"
                              : item.status === "Assigned"
                              ? "asset-assigned"
                              : item.status === "Maintenance"
                              ? "asset-maintenance"
                              : "asset-recycled"
                          }
                        >
                          {item.status}
                        </span>
                    </td>

                    <td>
                            {item.status === "Recycled" ? (

                        <button
                          className="edit-btn"
                          disabled
                          style={{
                            background: "#9ca3af",
                            cursor: "not-allowed",
                          }}
                        >
                          Edit
                        </button>

                      ) : (

                        <Link
                          to={`/edit-asset/${item.id}`}
                          className="edit-btn"
                        >
                          Edit
                        </Link>

                      )}

                      {item.status !== "Recycled" && (

                        <Link
                          to={`/delete-asset/${item.id}`}
                          className="delete-btn"
                        >
                          Delete
                        </Link>

                      )}

                      {item.status === "Recycled" ? (

                        <button
                          className="recycle-btn"
                          disabled
                          style={{
                            background: "#9ca3af",
                            cursor: "not-allowed",
                          }}
                        >
                          Recycled
                        </button>

                      ) : (

                        <Link
                          to={`/recycle-asset/${item.id}`}
                          className="recycle-btn"
                        >
                          Recycle
                        </Link>

                      )}

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    No Assets Found
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

export default AssetManagement;
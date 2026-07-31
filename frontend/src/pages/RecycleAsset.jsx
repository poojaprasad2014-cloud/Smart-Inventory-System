import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/RecycleAsset.css";

function RecycleAsset() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [asset, setAsset] = useState(null);
  const [method, setMethod] = useState("Recycle");
  const [reason, setReason] = useState("");

  useEffect(() => {

    const admin = localStorage.getItem("admin");

    if (!admin) {
      navigate("/login");
      return;
    }

    fetchAsset();

  }, []);

  const fetchAsset = async () => {

    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/api/assets/${id}/`
      );

      setAsset(response.data);

    } catch (error) {

      console.log(error);
      alert("Failed to Load Asset");

    }

  };

  const handleRecycle = async () => {

    if (!reason.trim()) {
      alert("Please Enter Recycle Reason");
      return;
    }

    try {

      await axios.post(
        "http://127.0.0.1:8000/api/recycling/",
        {
          asset: asset.id,
          recycle_date: new Date().toISOString().split("T")[0],
          method: method,
          reason: reason,
          recycled_by: "Admin",
        }
      );

      await axios.patch(
        `http://127.0.0.1:8000/api/assets/${asset.id}/`,
        {
          status: "Recycled",
        }
      );

      alert("Asset Recycled Successfully");
      navigate("/asset-management");

    } catch (error) {

      console.log(error);
      alert("Recycle Failed");

    }

  };

  return (
    <>
      <AdminNavbar />

      <div className="recycle-page">

        <div className="recycle-box">

          <h2>♻ Recycle Asset</h2>
                    {asset && (
            <>
              <p>
                Are you sure you want to recycle
                <strong> {asset.asset_name}</strong>?
              </p>

              <div className="asset-details">

                <div className="detail-row">
                  <span className="label">Asset ID</span>
                  <span className="colon">:</span>
                  <span className="value">{asset.asset_id}</span>
                </div>

                <div className="detail-row">
                  <span className="label">Category</span>
                  <span className="colon">:</span>
                  <span className="value">{asset.category_name}</span>
                </div>

                <div className="detail-row">
                  <span className="label">Location</span>
                  <span className="colon">:</span>
                  <span className="value">{asset.location}</span>
                </div>

                <div className="detail-row">
                  <span className="label">Status</span>
                  <span className="colon">:</span>
                  <span className="value">{asset.status}</span>
                </div>

              </div>

              <div className="form-group">

                <label>Method</label>

                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="Recycle">Recycle</option>
                  {/* <option value="Reuse">Reuse</option>
                  <option value="Scrap">Scrap</option> */}
                </select>

              </div>

              <div className="form-group">

                <label>Reason</label>

                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter recycle reason..."
                  rows={4}
                />

              </div>

              <div className="btn-group">

                <button
                  className="yes-btn"
                  onClick={handleRecycle}
                >
                  Confirm Recycle
                </button>

                <button
                  className="cancel-btn"
                  onClick={() => navigate("/asset-management")}
                >
                  Cancel
                </button>

              </div>

            </>
          )}

        </div>

      </div>

    </>
  );

}

export default RecycleAsset;
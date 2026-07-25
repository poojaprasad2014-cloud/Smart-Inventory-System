import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";

import AdminNavbar from "../components/AdminNavbar";
import "../styles/Reports.css";

function Reports() {

  const navigate = useNavigate();

  const [assets, setAssets] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [recycling, setRecycling] = useState([]);
  const [warranty, setWarranty] = useState([]);

  useEffect(() => {

    const admin = localStorage.getItem("admin");

    if (!admin) {
      navigate("/login");
      return;
    }

    fetchReports();

  }, [navigate]);

  const fetchReports = async () => {

    try {

      const [
        assetResponse,
        maintenanceResponse,
        recyclingResponse
      ] = await Promise.all([

        axios.get("http://127.0.0.1:8000/api/assets/"),
        axios.get("http://127.0.0.1:8000/api/maintenance/"),
        axios.get("http://127.0.0.1:8000/api/recycling/")

      ]);

      setAssets(assetResponse.data);
      setMaintenance(maintenanceResponse.data);
      setRecycling(recyclingResponse.data);

      const today = new Date();

      const warrantyData = assetResponse.data.filter((item) => {

        if (!item.warranty_expiry) return false;

        return new Date(item.warranty_expiry) >= today;

      });

      setWarranty(warrantyData);

    } catch (error) {

      console.log(error);
      alert("Failed to Load Reports");

    }

  };

  const totalAssets = assets.length;

  const availableAssets = assets.filter(
    (item) => item.status === "Available"
  ).length;

  const assignedAssets = assets.filter(
    (item) => item.status === "Assigned"
  ).length;

  const maintenanceAssets = maintenance.length;
  const downloadReport = () => {

  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Smart Inventory Tracking System", 14, 15);

  doc.setFontSize(13);
  doc.text("Inventory Report", 14, 25);

  doc.setFontSize(11);

  doc.text(`Total Assets : ${totalAssets}`, 14, 35);
  doc.text(`Available Assets : ${availableAssets}`, 14, 42);
  doc.text(`Assigned Assets : ${assignedAssets}`, 14, 49);
  doc.text(`Maintenance Assets : ${maintenanceAssets}`, 14, 56);

  // ==========================
  // Asset Summary
  // ==========================

  autoTable(doc, {
    startY: 65,
    head: [[
      "Asset ID",
      "Asset Name",
      "Category",
      "Brand",
      "Location",
      "Status"
    ]],
    body: assets.map((item) => [
      item.asset_id,
      item.asset_name,
      item.category_name,
      item.brand,
      item.location,
      item.status
    ]),
    theme: "grid"
  });

  // ==========================
  // Maintenance Summary
  // ==========================

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 15,
    head: [[
      "Asset ID",
      "Asset Name",
      "Employee ID",
      "Employee Name",
      "Issue",
      "Status"
    ]],
    body: maintenance.map((item) => [
      item.asset_id,
      item.asset_name,
      item.employee_id,
      item.employee_name,
      item.issue,
      item.status
    ]),
    theme: "grid"
  });

  // ==========================
  // Recycling Summary
  // ==========================

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 15,
    head: [[
      "Asset ID",
      "Asset Name",
      "Category",
      "Method",
      "Reason",
      "Recycled By"
    ]],
    body: recycling.map((item) => [
      item.asset_id,
      item.asset_name,
      item.category_name,
      item.method,
      item.reason,
      item.recycled_by
    ]),
    theme: "grid"
  });

  // ==========================
  // Warranty Summary
  // ==========================

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 15,
    head: [[
      "Asset ID",
      "Asset Name",
      "Category",
      "Warranty Expiry"
    ]],
    body: warranty.map((item) => [
      item.asset_id,
      item.asset_name,
      item.category_name,
      item.warranty_expiry
    ]),
    theme: "grid"
  });

  doc.save("Inventory_Report.pdf");

};
return (

  <>

    <AdminNavbar />

    <div className="reports-page">

      <div className="reports-header">

        <div>

          <h1>Reports</h1>

          <p>Inventory & Maintenance Reports</p>

        </div>

        <button
          className="download-btn"
          onClick={downloadReport}
        >
          Download PDF
        </button>

      </div>

      {/* Summary Cards */}

      <div className="report-cards">

        <div className="report-card">

          <h2>{totalAssets}</h2>

          <p>Total Assets</p>

        </div>

        <div className="report-card">

          <h2>{availableAssets}</h2>

          <p>Available Assets</p>

        </div>

        <div className="report-card">

          <h2>{assignedAssets}</h2>

          <p>Assigned Assets</p>

        </div>

        <div className="report-card">

          <h2>{maintenanceAssets}</h2>

          <p>Maintenance Assets</p>

        </div>

      </div>
              {/* Asset Summary */}

        <div className="report-table">

          <h2>Asset Summary</h2>

          <table>

            <thead>

              <tr>
                <th>Asset ID</th>
                <th>Asset Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Location</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {assets.length > 0 ? (

                assets.map((item) => (

                  <tr key={item.id}>

                    <td>{item.asset_id}</td>
                    <td>{item.asset_name}</td>
                    <td>{item.category_name}</td>
                    <td>{item.brand}</td>
                    <td>{item.location}</td>
                    <td>{item.status}</td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: "20px"
                    }}
                  >
                    No Assets Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>
                {/* Maintenance Summary */}

        <div className="report-table">

          <h2>Maintenance Summary</h2>

          <table>

            <thead>

              <tr>
                <th>Asset ID</th>
                <th>Asset Name</th>
                <th>Employee ID</th>
                <th>Employee Name</th>
                <th>Issue</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {maintenance.length > 0 ? (

                maintenance.map((item) => (

                  <tr key={item.id}>

                    <td>{item.asset_id}</td>
                    <td>{item.asset_name}</td>
                    <td>{item.employee_id}</td>
                    <td>{item.employee_name}</td>
                    <td>{item.issue}</td>
                    <td>{item.status}</td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: "20px"
                    }}
                  >
                    No Maintenance Records
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>
                {/* Recycling Summary */}

        <div className="report-table">

          <h2>Recycling Summary</h2>

          <table>

            <thead>

              <tr>
                <th>Asset ID</th>
                <th>Asset Name</th>
                <th>Category</th>
                <th>Method</th>
                <th>Reason</th>
                <th>Recycled By</th>
              </tr>

            </thead>

            <tbody>

              {recycling.length > 0 ? (

                recycling.map((item) => (

                  <tr key={item.id}>

                    <td>{item.asset_id}</td>
                    <td>{item.asset_name}</td>
                    <td>{item.category_name}</td>
                    <td>{item.method}</td>
                    <td>{item.reason}</td>
                    <td>{item.recycled_by}</td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: "20px"
                    }}
                  >
                    No Recycling Records
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>
                {/* Warranty Summary */}

        <div className="report-table">

          <h2>Warranty Summary</h2>

          <table>

            <thead>

              <tr>
                <th>Asset ID</th>
                <th>Asset Name</th>
                <th>Category</th>
                <th>Warranty Expiry</th>
              </tr>

            </thead>

            <tbody>

              {warranty.length > 0 ? (

                warranty.map((item) => (

                  <tr key={item.id}>

                    <td>{item.asset_id}</td>
                    <td>{item.asset_name}</td>
                    <td>{item.category_name}</td>
                    <td>{item.warranty_expiry}</td>

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
                    No Warranty Records
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

export default Reports;
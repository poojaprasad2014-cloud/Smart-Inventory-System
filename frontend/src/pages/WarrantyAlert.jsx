import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/WarrantyAlert.css";

function WarrantyAlert() {

    const [alerts, setAlerts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadAlerts();
    }, []);

    const loadAlerts = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/warranty-alert/"
            );

            setAlerts(response.data);

        } catch (error) {

            console.log(error);
            alert("Failed to Load Warranty Alerts");

        }

    };

    const filteredAlerts = alerts.filter((item) => {

        const keyword = search.toLowerCase();

        return (

            String(item.asset_id || "")
                .toLowerCase()
                .includes(keyword) ||

            String(item.asset_name || "")
                .toLowerCase()
                .includes(keyword) ||

            String(item.brand || "")
                .toLowerCase()
                .includes(keyword)

        );

    });

    return (

        <>
            <AdminNavbar />

            <div className="warranty-page">

                <div className="warranty-container">

                    <div className="warranty-header">

                        <h1>Warranty Alerts</h1>

                        <p>
                            Assets whose warranty expires within the next
                            30 days
                        </p>

                    </div>

                    <div className="search-box">

                        <input
                            type="text"
                            placeholder="Search Asset ID, Asset Name or Brand..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                    <div className="table-box">

                        <table>

                            <thead>

                                <tr>

                                    <th>Asset ID</th>
                                    <th>Asset Name</th>
                                    <th>Brand</th>
                                    <th>Warranty Expiry</th>
                                    <th>Days Left</th>
                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredAlerts.length > 0 ? (
                                                                        filteredAlerts.map((item) => (

                                        <tr key={item.id}>

                                            <td>{item.asset_id}</td>

                                            <td>{item.asset_name}</td>

                                            <td>{item.brand}</td>

                                            <td>{item.warranty_expiry}</td>

                                            <td>

                                                <span
                                                    className={
                                                        item.days_left <= 7
                                                            ? "critical-days"
                                                            : "warning-days"
                                                    }
                                                >
                                                    {item.days_left} Days
                                                </span>

                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        item.days_left <= 7
                                                            ? "critical-badge"
                                                            : "warning-badge"
                                                    }
                                                >
                                                    {item.days_left <= 7
                                                        ? "Critical"
                                                        : "Expiring Soon"}
                                                </span>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            style={{
                                                textAlign: "center",
                                                padding: "25px",
                                            }}
                                        >
                                            No Warranty Alerts Found
                                        </td>

                                    </tr>

                                )}
                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </>

    );

}

export default WarrantyAlert;

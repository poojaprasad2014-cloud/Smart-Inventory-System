import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/Recycling.css";

function Recycling() {

    const [recycling, setRecycling] = useState([]);

    useEffect(() => {
        loadRecycling();
    }, []);

    const loadRecycling = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/recycling/"
            );

            setRecycling(response.data);

        } catch (error) {

            console.log(error);
            alert("Failed to load recycling data");

        }

    };

    return (
        <>
            <AdminNavbar />

            <div className="recycling-page">

                <div className="recycling-container">

                    <div className="recycling-header">

                        <div>

                            <h1>Asset Recycling</h1>

                            <p>View All Recycled Company Assets</p>

                        </div>

                    </div>

                    <div className="recycling-table">

                        <table>

                            <thead>

                                <tr>

                                    <th>Asset ID</th>
                                    <th>Asset Name</th>
                                    <th>Recycle Date</th>
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

                                            <td>{item.recycle_date}</td>

                                            <td>
                                                <span className="method">
                                                    {item.method}
                                                </span>
                                            </td>

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
                                                padding: "20px",
                                            }}
                                        >
                                            No Recycled Assets Found
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

export default Recycling;
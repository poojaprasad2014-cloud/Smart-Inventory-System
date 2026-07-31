import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import "../styles/Recycling.css";

function Recycling() {

    const [recycling, setRecycling] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        loadRecycling();
    }, []);

    const loadRecycling = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/recycling/"
            );
            //  console.log(response.data);

            setRecycling(response.data);

        } catch (error) {

            console.log(error);
            alert("Failed to load recycling data");

        }

    };

    // const filteredRecycling = recycling.filter((item) => {

    //     const keyword = search.toLowerCase();

    //     return (

    //             (item.asset_id || "").toLowerCase().includes(keyword) ||
    //             (item.asset_name || "").toLowerCase().includes(keyword) ||
    //             (item.category_name || "").toLowerCase().includes(keyword) ||
    //             (item.method || "").toLowerCase().includes(keyword) ||
    //             (item.reason || "").toLowerCase().includes(keyword) ||
    //             (item.recycled_by || "").toLowerCase().includes(keyword)

    //     );

    // });
    const filteredRecycling = recycling.filter((item) => {

    const keyword = search.trim().toLowerCase();

    if (keyword === "") return true;

    return (
        String(item.asset_id || "").toLowerCase().startsWith(keyword) ||
        String(item.asset_name || "").toLowerCase().startsWith(keyword) ||
        String(item.category_name || "").toLowerCase().startsWith(keyword) ||
        String(item.recycle_date || "").toLowerCase().startsWith(keyword) ||
        String(item.reason || "").toLowerCase().startsWith(keyword)
    );

});

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

                    <div className="search-box">

                        <input
                            type="text"
                            placeholder="Search Asset ID, Asset Name or Category..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                    <div className="recycling-table">

                        <table>

                            <thead>

                                <tr>

                                    <th>Asset ID</th>
                                    <th>Asset Name</th>
                                    <th>Category</th>
                                    <th>Recycle Date</th>
                                    <th>Method</th>
                                    <th>Reason</th>
                                    <th>Recycled By</th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredRecycling.length > 0 ? (
                                                                 
                                    filteredRecycling.map((item) => (

                                        <tr key={item.id}>

                                            <td>{item.asset_id}</td>

                                            <td>{item.asset_name}</td>

                                            <td>{item.category_name}</td>

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
                                            colSpan="7"
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
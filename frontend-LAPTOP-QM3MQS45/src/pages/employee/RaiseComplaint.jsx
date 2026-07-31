import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmployeeNavbar from "../../components/EmployeeNavbar";
import "../../styles/RaiseComplaint.css";

function RaiseComplaint() {

  const navigate = useNavigate();

  const [assets, setAssets] = useState([]);

  const [formData, setFormData] = useState({
    asset: "",
    issue: "",
    reported_date: "",
    completed_date: "",
    status: "Pending"
  });

  useEffect(() => {

    const employee = localStorage.getItem("employee");

    if (!employee) {
      navigate("/login");
      return;
    }

    loadAssets();

  }, [navigate]);

  const loadAssets = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/assets/"
      );

      setAssets(response.data);

    } catch (error) {

      console.log(error);
      alert("Failed to Load Assets");

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

      await axios.post(
        "http://127.0.0.1:8000/api/maintenance/",
        {
          asset: formData.asset,
          issue: formData.issue,
          reported_date: formData.reported_date,
          completed_date: null,
          status: "Pending",
        }
      );

      alert("Complaint Submitted Successfully");

      navigate("/my-complaints");

    } catch (error) {

      console.log(error);
      alert("Failed to Submit Complaint");

    }

  };

  return (

    <>

      <EmployeeNavbar />

      <div className="raise-complaint-page">

        <div className="complaint-header">

           {/* <div>  */}

            <h1>Raise Complaint</h1>

            <p>Report issues for your assigned assets</p>

         {/* </div>  */}

        </div>

        <form
          className="complaint-form"
          onSubmit={handleSubmit}
        >

         

          <select
            name="asset"
            value={formData.asset}
            onChange={handleChange}
            required
          >

            <option value="">Select Asset</option>

            {assets.map((item) => (

              <option
                key={item.id}
                value={item.id}
              >
                {item.asset_name}
              </option>

            ))}

          </select>
                <input
                type="text"
                name="issue"
                placeholder="Enter Issue"
                value={formData.issue}
                onChange={handleChange}
                required
              />

              <div className="date-group">
                <label>Reported Date</label>

                <input
                  type="date"
                  name="reported_date"
                  value={formData.reported_date}
                  onChange={handleChange}
                  required
                />
              </div>            
           
          <button type="submit">
            Submit Complaint
          </button>

        </form>

      </div>

    </>

  );

}

export default RaiseComplaint;
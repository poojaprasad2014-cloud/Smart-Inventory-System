import { useEffect, useState } from "react";
import EmployeeNavbar from "../../components/EmployeeNavbar";
import "../../styles/MyProfile.css";

function MyProfile() {

  const [employee, setEmployee] = useState(null);

  useEffect(() => {

    const emp = JSON.parse(localStorage.getItem("employee"));

    if (emp) {
      setEmployee(emp);
    }

  }, []);

  if (!employee) {
    return <h2>Loading...</h2>;
  }

  return (
    <>

      <EmployeeNavbar />

      <div className="profile-container">
        
        <div className="profile-card">

          <div className="profile-image">
            👤
          </div>

          <div className="profile-info">

            <h2>{employee.employee_name}</h2>

    

          </div>

        </div>

        <div className="profile-details">

          <div className="detail-box">
            <h4>Employee ID</h4>
            <p>{employee.employee_id}</p>
          </div>

          <div className="detail-box">
            <h4>Email</h4>
            <p>{employee.email}</p>
          </div>

          <div className="detail-box">
            <h4>Department</h4>
            <p>{employee.department}</p>
          </div>

          <div className="detail-box">
            <h4>Designation</h4>
            <p>{employee.designation}</p>
          </div>

          <div className="detail-box">
            <h4>Status</h4>

            <p className="status">
              Active
            </p>

          </div>

        </div>

      </div>

    </>
  );

}

export default MyProfile;
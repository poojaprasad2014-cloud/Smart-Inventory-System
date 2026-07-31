import { Outlet } from "react-router-dom";
import EmployeeNavbar from "../components/EmployeeNavbar";

function EmployeeLayout() {
  return (
    <>
      <EmployeeNavbar />
      <Outlet />
    </>
  );
}

export default EmployeeLayout;
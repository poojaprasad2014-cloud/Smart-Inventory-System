import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import AssetManagement from "./pages/AssetManagement";
import Categories from "./pages/Categories";
import Employees from "./pages/Employees";
import Maintenance from "./pages/Maintenance";
import Reports from "./pages/Reports";

import AddAsset from "./pages/AddAsset";
import EditAsset from "./pages/EditAsset";
import DeleteAsset from "./pages/DeleteAsset";

import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";
import DeleteCategory from "./pages/DeleteCategory";

import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";
import DeleteEmployee from "./pages/DeleteEmployee";

import AddMaintenance from "./pages/AddMaintenance";
import EditMaintenance from "./pages/EditMaintenance";
import DeleteMaintenance from "./pages/DeleteMaintenance";

import AssetAssignment from "./pages/AssetAssignment";
import AddAssignment from "./pages/AddAssignment";
import EditAssignment from "./pages/EditAssignment";
import DeleteAssignment from "./pages/DeleteAssignment";

import Recycling from "./pages/Recycling";
import RecycleAsset from "./pages/RecycleAsset";

import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import MyAssets from "./pages/employee/MyAssets";
import RaiseComplaint from "./pages/employee/RaiseComplaint";
import MyComplaints from "./pages/employee/MyComplaints";
import MyProfile from "./pages/employee/MyProfile";

import WarrantyAlert from "./pages/WarrantyAlert";

function App() {
  return (
    <Routes>

      {/* Landing */}
      <Route path="/" element={<Landing />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Asset Management */}
      <Route path="/assets" element={<AssetManagement />} />
      <Route path="/asset-management" element={<AssetManagement />} />

      <Route path="/add-asset" element={<AddAsset />} />
      <Route path="/edit-asset/:id" element={<EditAsset />} />
      <Route path="/delete-asset/:id" element={<DeleteAsset />} />

      {/* Categories */}
      <Route path="/categories" element={<Categories />} />
      <Route path="/add-category" element={<AddCategory />} />
      <Route path="/edit-category/:id" element={<EditCategory />} />
      <Route path="/delete-category/:id" element={<DeleteCategory />} />

      {/* Employees */}
      <Route path="/employees" element={<Employees />} />
      <Route path="/add-employee" element={<AddEmployee />} />
      <Route path="/edit-employee/:id" element={<EditEmployee />} />
      <Route path="/delete-employee/:id" element={<DeleteEmployee />} />

      {/* Maintenance */}
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="/add-maintenance" element={<AddMaintenance />} />
      <Route path="/edit-maintenance/:id" element={<EditMaintenance />} />
      <Route path="/delete-maintenance/:id" element={<DeleteMaintenance />} />

      {/* Asset Assignment */}
      <Route path="/assignments" element={<AssetAssignment />} />
      <Route path="/add-assignment" element={<AddAssignment />} />
      <Route path="/edit-assignment/:id" element={<EditAssignment />} />
      <Route path="/delete-assignment/:id" element={<DeleteAssignment />} />

      {/* Recycling */}
      <Route path="/recycling" element={<Recycling />} />
      <Route path="/recycle-asset/:id" element={<RecycleAsset />} />

      {/* Reports */}
      <Route path="/reports" element={<Reports />} />

      {/* Employee */}
      <Route
        path="/employee-dashboard"
        element={<EmployeeDashboard />}
      />
      <Route path="/my-assets" element={<MyAssets />} />
      <Route path="/raise-complaint" element={<RaiseComplaint />} />
      <Route path="/my-complaints" element={<MyComplaints />} />
      <Route path="/my-profile" element={<MyProfile />} />

      <Route path="/warranty-alert" element={<WarrantyAlert />} />

     

    </Routes>
  );
}

export default App;
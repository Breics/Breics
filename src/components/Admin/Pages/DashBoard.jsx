import Navbar from "../../Dashboard/DasNavbar";
import AdminSidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
        <Navbar />
      <div style={{ display: "flex" }}>

        <AdminSidebar />
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;

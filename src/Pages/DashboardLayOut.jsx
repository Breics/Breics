import Navbar from "../components/Dashboard/DasNavbar";
import Sidebar from "../components/Dashbooard_For_Landlord/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
        <Navbar />
      <div style={{ display: "flex" }}>

        <Sidebar />
        <main style={{ flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landingpage from "./Pages/LandingPage";
import PropertyListing from "./Pages/PropertyListing";
import LandLordPage from "./Pages/LandLordPage";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/Forgot";
import ResetPassword from "./Pages/Reset";
import Dashboard from "./Pages/Dashboard";
import VerifyAccount from "./Pages/verifyPage";
import IDVerification from "./Pages/IDVerification";
import DashboardLayout from "./Pages/DashboardLayOut";
import DashboardHome from "./components/DashboardLayout/DashboardHome";
import Application from "./components/DashboardLayout/Application";
import MyProperties from "./components/DashboardLayout/Properties";
import TenantDashboard from "./components/DashboardLayout/Tenants";
import Payments from "./components/DashboardLayout/Payments";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/find-property" element={<PropertyListing />} />
        <Route path="/list-property" element={<LandLordPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify" element={<Dashboard />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/verify-id" element={<IDVerification />} />

        {/* Dashboard layout with nested content */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="dashboard-home" element={<DashboardHome />} />
          <Route path="application" element={<Application />} />
          <Route path="properties" element={<MyProperties />} />
          <Route path="tenants" element={<TenantDashboard />} />
          <Route path="payments" element={<Payments/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

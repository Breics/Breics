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
import DashboardLayout from "./Pages/Dashbooard_For_Landlord";
import DashboardHome from "./components/Dashbooard_For_Landlord/DashboardHome";
import Application from "./components/Dashbooard_For_Landlord/Application";
import MyProperties from "./components/Dashbooard_For_Landlord/Properties";
import TenantDashboard from "./components/Dashbooard_For_Landlord/Tenants";
import Payments from "./components/Dashbooard_For_Landlord/Payments";
import Adminstrator from "./components/Dashbooard_For_Landlord/Adminstrator";
import FacilityDashboard from "./components/Dashbooard_For_Landlord/Facility";
import SupportDashboard from "./components/Dashbooard_For_Landlord/Support";
import AccountProfile from "./components/Dashbooard_For_Landlord/Account";
import InspectionRequests from "./components/Dashbooard_For_Landlord/inspection";
import SubmitNewProperty from "./components/Dashbooard_For_Landlord/NewProperty";
import PropertyDetails from "./components/Dashbooard_For_Landlord/PropertyDetails";
import TenantProfile from "./components/Dashbooard_For_Landlord/TenantProfile";

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
          <Route path="admin" element={<Adminstrator/>} />
          <Route path="facility" element={<FacilityDashboard/>} />
          <Route path="support" element={<SupportDashboard/>} />
          <Route path="account" element={<AccountProfile/>} />
          <Route path="inspection" element={<InspectionRequests/>} />
          <Route path="new-property" element={<SubmitNewProperty/>} />
          <Route path="property-details/:id" element={<PropertyDetails />} />
          <Route path="tenants-profile/:tenantId" element={<TenantProfile />} />


        </Route>
      </Routes>
    </Router>
  );
}

export default App;

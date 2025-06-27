import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Landingpage from "./Pages/LandingPage";
import PropertyListing from "./Pages/PropertyListing";
import LandLordPage from "./Pages/LandLordPage";
import TenantReduxProvider from "./components/Tenant/redux/TenantReduxProvider";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/Forgot";
import ResetPassword from "./Pages/Reset";
import Dashboard from "./Pages/Dashboard";
import VerifyAccount from "./Pages/verifyPage";
import IDVerification from "./Pages/IDVerification";
import DashboardLayout from "./Pages/DashboardLayOut"
import DashboardHome from "./components/Dashbooard_For_Landlord/DashboardHome";
import Application from "./components/Dashbooard_For_Landlord/Application";
import MyProperties from "./components/Dashbooard_For_Landlord/Properties";
import LandlordTenantsDashboard from "./components/Dashbooard_For_Landlord/Tenants";
import Payments from "./components/Dashbooard_For_Landlord/Payments";
// import Adminstrator from "./components/Dashbooard_For_Landlord/Adminstrator";
import FacilityDashboard from "./components/Dashbooard_For_Landlord/Facility";
import SupportDashboard from "./components/Dashbooard_For_Landlord/Support";
import AccountProfile from "./components/Dashbooard_For_Landlord/Account";
import InspectionRequests from "./components/Dashbooard_For_Landlord/inspection";
import SubmitNewProperty from "./components/Dashbooard_For_Landlord/NewProperty";
import PropertyDetails from "./components/Dashbooard_For_Landlord/PropertyDetails";
import TenantProfile from "./components/Dashbooard_For_Landlord/TenantProfile";
import SignupPage from "./components/Tenant/Auth/signup";
import LoginPage from "./components/Tenant/Auth/login";
import VerifyEmailPage from "./components/Tenant/Auth/verifyEmail";
import TenantDashboard from "./components/Tenant/Dashboard/TenantDashboard";
import CompleteProfile from "./components/Tenant/Profile/CompleteProfile";
import TenantProfilePage from "./components/Tenant/Pages/TenantProfile";
import TenantSettings from "./components/Tenant/Pages/TenantSettings";
import TenantLayout from "./components/Tenant/Layout/TenantLayout";
import TenantFacility from "./components/Tenant/Pages/TenantFacility";
import TenantEscalate from "./components/Tenant/Pages/TenantEscalate";
import AdminLayout from "./components/Admin/Pages/DashBoard";
import AdminBoard from "./components/Admin/Components/AdminIndex";
import Mailbox from "./components/Admin/Components/MailBox";
import PropApplications from "./components/Admin/Components/PropertyApplications";
import PropInspections from "./components/Admin/Components/PropertyInspections";
import AllProperties from "./components/Admin/Components/AllProperty";
import AllLandlords from "./components/Admin/Components/AllLandlords";
import LandlordProfile from "./components/Admin/Components/LanlordProfile";
import AllTenants from "./components/Admin/Components/AllTenants";
import TenantProfiles from "./components/Admin/Components/TenantsProfile";
import Transactions from "./components/Admin/Components/Transaction";
// import VerifyEmail from "./Pages/VerifyEmail";

function App() {
  return (
    <TenantReduxProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
        <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/find-property" element={<PropertyListing />} />
        <Route path="/list-property" element={<LandLordPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tenant/signup" element={<SignupPage />} />
        <Route path="/tenant/login" element={<LoginPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        {/* <Route path="/verify-mail" element={<VerifyEmail />} /> */}

        <Route path="/tenant/complete-profile" element={<CompleteProfile />} />
        <Route path="/tenant" element={<TenantLayout />}>
          <Route path="dashboard" element={<TenantDashboard />} />
          <Route path="profile" element={<TenantProfilePage />} />
          <Route path="settings" element={<TenantSettings />} />
          <Route path="facility" element={<TenantFacility />} />
          <Route path="escalate" element={<TenantEscalate />} />
        </Route>
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
          <Route path="tenants" element={<LandlordTenantsDashboard />} />
          <Route path="payments" element={<Payments/>} />
          {/* <Route path="admin" element={<Adminstrator/>} /> */}
          <Route path="facility" element={<FacilityDashboard/>} />
          <Route path="support" element={<SupportDashboard/>} />
          <Route path="account" element={<AccountProfile/>} />
          <Route path="inspection" element={<InspectionRequests/>} />
          <Route path="new-property" element={<SubmitNewProperty/>} />
          <Route path="property-details/:id" element={<PropertyDetails />} />
          <Route path="tenants-profile/:tenantId" element={<TenantProfile />} />
          <Route path="settings" element={<TenantSettings />} />


        </Route>
         <Route path="/admin-dashboard" element={<AdminLayout />}>
          <Route index element={<AdminBoard />} />
          <Route path="admin-index" element={<AdminBoard />} />
          <Route path="mail-box" element={<Mailbox />} />
          <Route path="application" element={<PropApplications />} />
          <Route path="inspections" element={<PropInspections />} />
          <Route path="allproperties" element={<AllProperties />} />
          <Route path="alllanlords" element={<AllLandlords />} />
          <Route path="landlords/:id" element={<LandlordProfile />} />
          <Route path="alltenants" element={<AllTenants />} />
          <Route path="tenants/:id" element={<TenantProfiles />} />
          <Route path="transactions" element={<Transactions />} />


        </Route>
        </Routes>
      </Router>
    </TenantReduxProvider>
  );
}

export default App;

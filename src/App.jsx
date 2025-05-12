import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Landingpage from "./Pages/LandingPage"
import PropertyListing from "./Pages/PropertyListing"
import LandLordPage from "./Pages/LandLordPage"
import Login from "./Pages/Login"
import ForgotPassword from "./Pages/Forgot"
import ResetPassword from "./Pages/Reset"
import Dashboard from "./Pages/Dashboard"
function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element = {<Landingpage />} />
          <Route path="/find-property" element = {<PropertyListing/>} />
          <Route path="/list-property" element = {< LandLordPage/>} />
          <Route path="/login" element = {< Login/>} />
          <Route path="/forgot-password" element = {< ForgotPassword/>} />
          <Route path="/reset-password" element = {< ResetPassword/>} />
          <Route path="/dashboard" element = {< Dashboard/>} />


        </Routes>
      </Router>
    </>
  )
}

export default App

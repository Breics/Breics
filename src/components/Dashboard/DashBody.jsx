import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/DashBody.css';
import { FaIdCard } from 'react-icons/fa';
import { HiArrowNarrowRight } from 'react-icons/hi';

const DashBody = () => {
  const [userData, setUserData] = useState({
    full_name: '',
    isVerified: true, // default to true to hide card by default
  });

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    console.log("DashBody: userId from storage:", userId);
    if (!userId) return;
  
    axios.post("http://localhost/breicsk/backk/get_user_info.php", { user_id: userId })
      .then(res => {
        console.log("DashBody: fetch_user response:", res.data);
        if (res.data.success) {
          setUserData({
            full_name: res.data.data.full_name,
            isVerified: res.data.data.is_verified === "1",
            account_type: res.data.data.account_type,
          });
        } else {
          console.error("DashBody:", res.data.message);
        }
      })
      .catch(err => {
        console.error("DashBody fetch error:", err);
      });
  }, []);
  

  return (
    <div className="dashboard-container">
      <h2>Hello {userData.full_name},</h2>
      <p className="dashboard-subtext">
        Welcome to Breics. Kindly complete your account setup to start benefitting from the safest, fastest and flexible platform to list and manage your properties and tenant-related issues.
      </p>

      {/* {!userData.isVerified && userData.account_type === "landlord" && ( */}
        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            <FaIdCard size={24} color="#f59e0b" />
          </div>
          <div className="dashboard-card-content">
            <h4>Complete account verification</h4>
            <p>
              As an intending landlord, you need to verify your account before you can list a property
            </p>
          </div>
          <div className="dashboard-card-action">
            <a href="/verify-account" className="verify-link">
              Verify account <HiArrowNarrowRight className="arrow" />
            </a>
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default DashBody;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/DashBody.css';
import { FaIdCard } from 'react-icons/fa';
import { HiArrowNarrowRight } from 'react-icons/hi';

const DashBody = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    isVerified: false,
    accountType: '',
  });

useEffect(() => {
  const userId = localStorage.getItem('user_id');
  const token = localStorage.getItem('token');

  if (!userId || !token) {
    console.warn('User ID or token not found in localStorage.');
    return;
  }

  axios
    .get(`https://breics-backend.onrender.com/api/landlords/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const landlord = res.data.data.landlord;
      setUserData({
        firstName: landlord.firstName || '',
        isVerified: landlord.verificationStatus?.isVerified || false,
        accountType: landlord.accountType || '',
      });
    })
    .catch((err) => {
      console.error(
        'Failed to fetch user data in DashBody:',
        err.response?.data || err.message
      );
    });
}, []);

  

  return (
    <div className="dashboard-container">
      <h2>Hello {userData.firstName},</h2>
      <p className="dashboard-subtext">
        Welcome to Breics. Kindly complete your account setup...
      </p>

      {!userData.isVerified && (
        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            <FaIdCard size={24} color="#f59e0b" />
          </div>
          <div className="dashboard-card-content">
            <h4>Complete account verification</h4>
            <p>
              As an intending landlord, you need to verify your account...
            </p>
          </div>
          <div className="dashboard-card-action">
            <a href="/verify-account" className="verify-link">
              Verify account <HiArrowNarrowRight className="arrow" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBody;

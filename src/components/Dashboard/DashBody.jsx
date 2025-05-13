import React, { useEffect, useState } from 'react';
import '../../styles/DashBody.css';
import { FaIdCard } from 'react-icons/fa';
import { HiArrowNarrowRight } from 'react-icons/hi';

const DashBody = () => {
  const [user, setUser] = useState({ name: '' });

  // Simulate fetching user data (replace with backend call later)
  useEffect(() => {
    // Simulate async fetch
    const fetchUser = async () => {
      // Replace with actual API call when backend is ready
      const fakeUser = {
        name: 'Akorede', // This should come from backend (e.g., decoded from auth token or API call)
        isVerified: false,
      };
      setUser(fakeUser);
    };

    fetchUser();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Hello {user.name},</h2>
      <p className="dashboard-subtext">
        Welcome to Breics. Kindly complete your account setup to start benefitting from the safest, fastest and flexible platform to list and manage your properties and tenant-related issues.
      </p>

      {!user.isVerified && (
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
      )}
    </div>
  );
};

export default DashBody;

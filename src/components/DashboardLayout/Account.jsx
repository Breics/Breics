import React, { useEffect, useState } from 'react';
import '../../styles/Account.css';

export default function AccountProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/profile')
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error(err));
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="account-container">
      <h2 className="section-title">My Account</h2>
      <div className="tabs">
        <button className="tab">Bank Information</button>
        <button className="tab active">My Profile</button>
      </div>
      dsa

      <div className="profile-header">
        <div className="avatar" />
        <div>
          <h3>{profile.firstName} {profile.lastName}</h3>
          <p className="role">{profile.occupation}</p>
        </div>
        <button className="edit-btn">Edit Profile</button>
      </div>

      <div className="info-card">
        <h4>Personal Information</h4>
        <div className="info-grid">
          <div><strong>First name</strong><p>{profile.firstName}</p></div>
          <div><strong>Last name</strong><p>{profile.lastName}</p></div>
          <div><strong>Email Address</strong><p>{profile.email}</p></div>
          <div><strong>Phone number</strong><p>{profile.phone}</p></div>
          <div><strong>Date of birth</strong><p>{profile.dob}</p></div>
          <div><strong>Occupation</strong><p>{profile.occupation}</p></div>
          <div><strong>Gender</strong><p>{profile.gender}</p></div>
          <div><strong>Address</strong><p>{profile.address}</p></div>
          <div><strong>Landmark</strong><p>{profile.landmark}</p></div>
          <div><strong>State</strong><p>{profile.state}</p></div>
          <div><strong>Country</strong><p>{profile.country}</p></div>
        </div>
      </div>

      <div className="info-card">
        <h4>Password Settings</h4>
        <div className="info-grid">
          <div><strong>Current Password</strong><p>********</p></div>
          <div><strong>New Password</strong><p>--------</p></div>
        </div>
      </div>
    </div>
  );
}

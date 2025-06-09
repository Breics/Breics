import React, { useEffect, useState } from 'react';
import '../../styles/Account.css';

export default function AccountProfile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    if (!userId || !token) return;

    fetch(`https://breics-backend.onrender.com/api/landlords/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setProfile(data.data.landlord);
        setAvatarPreview(data.data.landlord.profilePhoto?.url || null);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    try {
      // Update profile
      await fetch(`https://breics-backend.onrender.com/api/landlords/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });

      // Upload photo if selected
      if (avatarFile) {
        const formData = new FormData();
        formData.append('photo', avatarFile);

        await fetch('https://breics-backend.onrender.com/api/landlords/profile/photo', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData
        });
      }

      alert('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to update profile.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>Failed to load profile.</div>;

  return (
    <div className="account-container">
      <h2 className="section-title">My Account</h2>
      <div className="tabs">
        <button className="tab">Bank Information</button>
        <button className="tab active">My Profile</button>
      </div>

      <div className="profile-header">
        <div className="avatar">
          {avatarPreview && <img src={avatarPreview} alt="Avatar" />}
        </div>
        <div>
          <h3>{profile.firstName} {profile.lastName}</h3>
          <p className="role">{profile.occupation || 'N/A'}</p>
        </div>
        <button className="edit-btn" onClick={() => setEditMode(!editMode)}>
          {editMode ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {editMode && (
        <div className="info-card">
          <h4>Upload Profile Photo</h4>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </div>
      )}

      <div className="info-card">
        <h4>Personal Information</h4>
        <div className="info-grid">
          {[
            'firstName',
            'lastName',
            'email',
            'phoneNumber',
            'dateOfBirth',
            'occupation',
            'gender',
            'address',
            'landmark',
            'state',
            'country',
          ].map((field) => (
            <div key={field}>
              <strong>{field.charAt(0).toUpperCase() + field.slice(1)}</strong>
              {editMode ? (
                <input
                  type="text"
                  name={field}
                  value={profile[field] || ''}
                  onChange={handleChange}
                />
              ) : (
                <p>{profile[field] || 'N/A'}</p>
              )}
            </div>
          ))}
        </div>
        {editMode && (
          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        )}
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

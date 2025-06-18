import React, { useEffect, useState } from 'react';

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
      await fetch(`https://breics-backend.onrender.com/api/landlords/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profile)
      });

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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!profile) return <div className="text-center py-10">Failed to load profile.</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-gray-800">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">My Account</h2>

      <div className="flex flex-wrap gap-4 border-b border-gray-300 mb-6">
        <button className="py-2 text-base font-medium">Bank Information</button>
        <button className="py-2 text-base font-medium text-orange-500 border-b-2 border-orange-500">My Profile</button>
      </div>

      <div className="flex flex-wrap items-center gap-4 bg-white shadow-sm p-4 rounded-lg mb-6">
        <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden">
          {avatarPreview && <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{profile.firstName} {profile.lastName}</h3>
          <p className="text-sm text-gray-500">{profile.occupation || 'N/A'}</p>
        </div>
        <button className="ml-auto bg-white text-orange-500 border border-orange-500 rounded px-4 py-2 text-sm" onClick={() => setEditMode(!editMode)}>
          {editMode ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {editMode && (
        <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
          <h4 className="text-lg font-medium mb-2">Upload Profile Photo</h4>
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
        <h4 className="text-lg font-medium mb-4">Personal Information</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {["firstName", "lastName", "email", "phoneNumber", "dateOfBirth", "occupation", "gender", "address", "landmark", "state", "country"].map(field => (
            <div key={field}>
              <label className="block text-sm text-gray-500 mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
              {editMode ? (
                <input
                  type="text"
                  name={field}
                  value={profile[field] || ''}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              ) : (
                <p className="text-sm">{profile[field] || 'N/A'}</p>
              )}
            </div>
          ))}
        </div>
        {editMode && (
          <button className="mt-4 bg-orange-500 text-white px-6 py-2 rounded" onClick={handleSave}>
            Save Changes
          </button>
        )}
      </div>

      <div className="bg-white shadow-sm rounded-lg p-4">
        <h4 className="text-lg font-medium mb-4">Password Settings</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Current Password</label>
            <p className="text-sm">********</p>
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">New Password</label>
            <p className="text-sm">--------</p>
          </div>
        </div>
      </div>
    </div>
  );
}

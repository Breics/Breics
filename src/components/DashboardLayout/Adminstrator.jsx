import React, { useState } from 'react';
import '../../styles/Adminstrator.css';
import landlordImage from '../../image/land.jpg';

const usersData = [
  {
    name: 'Reserville Estate',
    email: 'ade4u@gmail.com',
    role: 'Owner',
    status: 'Active',
    dateAdded: '01/09/2021',
    subtitle: 'Landlord'
  },
  {
    name: 'Reserville Estate',
    email: 'ade4u@gmail.com',
    role: 'Caretaker',
    status: 'Pending',
    dateAdded: '01/09/2021',
    subtitle: 'Caretaker'
  },
  {
    name: 'Reserville Estate',
    email: 'ade4u@gmail.com',
    role: 'Artisan',
    status: '',
    dateAdded: '01/09/2021',
    subtitle: 'Artisan'
  },
  {
    name: 'Shehu Lawal',
    email: 'ade4u@gmail.com',
    role: 'Supervisor',
    status: '',
    dateAdded: '01/09/2021',
   
    subtitle: 'Supervisor'
  },
  {
    name: 'Laolu Onifade',
    email: 'ade4u@gmail.com',
    role: 'Admin',
    status: 'Active',
    dateAdded: '01/09/2021',

    subtitle: 'Admin'
  }
];

export default function Adminstrator() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openRoleMenu, setOpenRoleMenu] = useState(null);

  return (
    <div className="users-dashboard">
      <div className="header-bar">
        <h2>Users</h2>
        <button className="add-btn">+ Add Users</button>
      </div>

      <div className="search-filter">
        <input type="text" className="search-input" placeholder="Search user" />
        <select className="user-filter">
          <option>All users</option>
        </select>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Date added</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user, index) => (
            <tr key={index}>
              <td>
                <div className="user-info">
                  <img src={landlordImage} alt="avatar" className="user-avatar" />
                  <div className="user-name-role">
                    <span>{user.name}</span>
                    <span>{user.subtitle}</span>
                  </div>
                </div>
              </td>
              <td>{user.email}</td>
              <td>
                <button
                  className="role-selector"
                  onClick={() => setOpenRoleMenu(openRoleMenu === index ? null : index)}
                >
                  {user.role}
                  <span className="dropdown-arrow">▼</span>
                </button>
                {openRoleMenu === index && (
                  <ul className="role-menu">
                    <li>Caretaker</li>
                    <li>Supervisor</li>
                    <li>Admin</li>
                    <li>Artisan</li>
                  </ul>
                )}
              </td>
              <td>{user.dateAdded}</td>
              <td>
                {user.status && (
                  <span className={`status-badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                )}
              </td>
              <td className="action-cell">
                <button
                  className="dots"
                  onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                >
                  &#8942;
                </button>
                {openDropdown === index && (
                  <div className="action-dropdown">
                    <ul>
                      <li>View user</li>
                      <li>Edit role</li>
                      <li>Delete user</li>
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="table-controls">
        <div>
          Show:
          <select>
            <option>5 rows</option>
          </select>
        </div>
        <div className="pagination">
          <span>Prev</span>
          <span>Next</span>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/TenantProfile.css";

const TenantProfile = () => {
  const { tenantId } = useParams();
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/tenants/${tenantId}`);
        const data = await res.json();
        setTenant(data);
      } catch (err) {
        console.error("Error fetching tenant:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTenant();
  }, [tenantId]);

  if (loading) return <div>Loading...</div>;
  if (!tenant) return <div>Tenant not found</div>;

  return (
    <div className="tenant-profile-outlet">
      <h2 className="title">Tenant Profile</h2>

      <div className="tenant-info-grid">
        <div className="profile-card">
          <img src={tenant.profileImage || "/default-avatar.png"} alt="Profile" />
          <h4>{tenant.name}</h4>
          <p>ID: {tenant.tenantId}</p>
          <p>{tenant.phone}</p>
          <a href={tenant.agreementUrl} className="view-agreement">View Agreement</a>
          <p className="rent-expiry-tag">Rent Expires {tenant.rentExpiry}</p>
        </div>

        <div className="tenant-basic">
          <div className="basic-details">
            <h4>Tenant’s Basic Details</h4>
            <div className="row">
              <p><strong>First name:</strong> {tenant.firstName}</p>
              <p><strong>Last name:</strong> {tenant.lastName}</p>
              <p><strong>Phone number:</strong> {tenant.phone}</p>
              <p><strong>Date of birth:</strong> {tenant.dob}</p>
              <p><strong>Email Address:</strong> {tenant.email}</p>
              <p><strong>Occupation:</strong> {tenant.occupation}</p>
            </div>
          </div>

          <div className="occupancy-section">
            <h4>Occupancy</h4>
            <div className="rent-info">
              <p><strong>Rent expires:</strong></p>
              <p className="expiry-date">{tenant.rentExpiry}</p>
              <p>₦{tenant.rentAmount}/year</p>
              <button className="reminder-btn">Send reminder</button>
              <button className="terminate-btn">Terminate</button>
            </div>
            <div className="property-summary">
              <img src={tenant.propertyImage} alt="property" />
              <div>
                <p>{tenant.propertyTitle}</p>
                <p>{tenant.propertyLocation}</p>
                <span className="occupied-status">Occupied</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tenant-data-section">
        <div>
          <div className="section-header">
            <h4>Tickets</h4>
            <a href="#">+ Escalate Issue</a>
          </div>
          <ul>
            {tenant.tickets.map((t, i) => (
              <li key={i}>
                <span>{t.title}</span>
                <span className="ticket-type">{t.type}</span>
                <span className="ticket-date">{t.date}</span>
                <span className="ticket-status">Open</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="section-header">
            <h4>Documents</h4>
            <a href="#">+ Upload Document</a>
          </div>
          <ul>
            {tenant.documents.map((d, i) => (
              <li key={i}>
                <span><span className="doc-icon">📄</span>{d.name}</span>
                <span>{d.code}</span>
                <span>{d.type}</span>
                <span>{d.size} kb</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="section-header">
            <h4>Payments</h4>
            <a href="#">+ Add new payment</a>
          </div>
          <ul>
            {tenant.payments.map((p, i) => (
              <li key={i}>
                <span>{p.ref}</span>
                <span>{p.purpose}</span>
                <span>{p.date}</span>
                <span>₦{p.amount}</span>
                <span className="status pending">{p.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="other-details-section">
        <h4>Other Details</h4>

        <h5>Personal Information</h5>
        <p><strong>Gender:</strong> {tenant.gender}</p>
        <p><strong>Address:</strong> {tenant.address}</p>
        <p><strong>Landmark:</strong> {tenant.landmark}</p>
        <p><strong>State:</strong> {tenant.state}</p>
        <p><strong>Country:</strong> {tenant.country}</p>

        <h5>Next of Kin Details</h5>
        <p><strong>Name:</strong> {tenant.kin.firstName} {tenant.kin.lastName}</p>
        <p><strong>Email:</strong> {tenant.kin.email}</p>
        <p><strong>Phone:</strong> {tenant.kin.phone}</p>
        <p><strong>Relationship:</strong> {tenant.kin.relationship}</p>

        <h5>Referee</h5>
        <p><strong>Name:</strong> {tenant.referee.firstName} {tenant.referee.lastName}</p>
        <p><strong>Email:</strong> {tenant.referee.email}</p>
        <p><strong>Phone:</strong> {tenant.referee.phone}</p>
        <p><strong>Address:</strong> {tenant.referee.address}</p>
      </div>
    </div>
  );
};

export default TenantProfile;

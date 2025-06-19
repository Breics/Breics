import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!tenant) return <div className="text-center py-10">Tenant not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-gray-800">
      <h2 className="text-2xl font-bold mb-6">Tenant Profile</h2>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="bg-white shadow p-6 rounded-lg w-full md:w-64 text-center">
          <img
            src={tenant.profileImage || "/default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
          />
          <h4 className="text-lg font-semibold">{tenant.name}</h4>
          <p className="text-sm text-gray-500">ID: {tenant.tenantId}</p>
          <p className="text-sm mb-2">{tenant.phone}</p>
          <a href={tenant.agreementUrl} className="text-orange-500 block mb-2 text-sm">
            View Agreement
          </a>
          <p className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded inline-block">
            Rent Expires {tenant.rentExpiry}
          </p>
        </div>

        <div className="flex-1 space-y-8">
          <div>
            <h4 className="font-semibold mb-2">Tenant’s Basic Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <p><strong>First name:</strong> {tenant.firstName}</p>
              <p><strong>Last name:</strong> {tenant.lastName}</p>
              <p><strong>Phone number:</strong> {tenant.phone}</p>
              <p><strong>Date of birth:</strong> {tenant.dob}</p>
              <p><strong>Email Address:</strong> {tenant.email}</p>
              <p><strong>Occupation:</strong> {tenant.occupation}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Occupancy</h4>
            <div className="bg-gray-50 rounded p-4 mb-4 text-sm">
              <p><strong>Rent expires:</strong></p>
              <p className="font-semibold">{tenant.rentExpiry}</p>
              <p>₦{tenant.rentAmount}/year</p>
              <div className="mt-3 flex flex-col sm:flex-row gap-2">
                <button className="bg-orange-500 text-white py-1 px-3 rounded">Send reminder</button>
                <button className="bg-gray-300 text-gray-800 py-1 px-3 rounded">Terminate</button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <img src={tenant.propertyImage} alt="property" className="w-16 h-16 object-cover rounded" />
              <div>
                <p>{tenant.propertyTitle}</p>
                <p className="text-sm text-gray-500">{tenant.propertyLocation}</p>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Occupied</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between mb-2">
            <h4 className="font-semibold">Tickets</h4>
            <a href="#" className="text-orange-500 text-sm">+ Escalate Issue</a>
          </div>
          <ul className="text-sm divide-y">
            {tenant.tickets.map((t, i) => (
              <li key={i} className="py-2 flex flex-col sm:flex-row justify-between">
                <span>{t.title}</span>
                <span className="text-gray-500">{t.type}</span>
                <span>{t.date}</span>
                <span className="text-orange-600">Open</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between mb-2">
            <h4 className="font-semibold">Documents</h4>
            <a href="#" className="text-orange-500 text-sm">+ Upload Document</a>
          </div>
          <ul className="text-sm divide-y">
            {tenant.documents.map((d, i) => (
              <li key={i} className="py-2 flex justify-between">
                <span><span className="mr-1">📄</span>{d.name}</span>
                <span>{d.code}</span>
                <span>{d.type}</span>
                <span>{d.size} kb</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between mb-2">
            <h4 className="font-semibold">Payments</h4>
            <a href="#" className="text-orange-500 text-sm">+ Add new payment</a>
          </div>
          <ul className="text-sm divide-y">
            {tenant.payments.map((p, i) => (
              <li key={i} className="py-2 flex flex-wrap justify-between items-center">
                <span>{p.ref}</span>
                <span>{p.purpose}</span>
                <span>{p.date}</span>
                <span>₦{p.amount}</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">{p.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h4 className="font-semibold mb-4">Other Details</h4>

        <h5 className="font-semibold">Personal Information</h5>
        <p className="text-sm"><strong>Gender:</strong> {tenant.gender}</p>
        <p className="text-sm"><strong>Address:</strong> {tenant.address}</p>
        <p className="text-sm"><strong>Landmark:</strong> {tenant.landmark}</p>
        <p className="text-sm"><strong>State:</strong> {tenant.state}</p>
        <p className="text-sm"><strong>Country:</strong> {tenant.country}</p>

        <h5 className="font-semibold mt-4">Next of Kin Details</h5>
        <p className="text-sm"><strong>Name:</strong> {tenant.kin.firstName} {tenant.kin.lastName}</p>
        <p className="text-sm"><strong>Email:</strong> {tenant.kin.email}</p>
        <p className="text-sm"><strong>Phone:</strong> {tenant.kin.phone}</p>
        <p className="text-sm"><strong>Relationship:</strong> {tenant.kin.relationship}</p>

        <h5 className="font-semibold mt-4">Referee</h5>
        <p className="text-sm"><strong>Name:</strong> {tenant.referee.firstName} {tenant.referee.lastName}</p>
        <p className="text-sm"><strong>Email:</strong> {tenant.referee.email}</p>
        <p className="text-sm"><strong>Phone:</strong> {tenant.referee.phone}</p>
        <p className="text-sm"><strong>Address:</strong> {tenant.referee.address}</p>
      </div>
    </div>
  );
};

export default TenantProfile;

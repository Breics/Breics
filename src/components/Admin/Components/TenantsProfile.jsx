// TenantProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function TenantProfiles() {
  const { id } = useParams();
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTenant = async () => {
    try {
      const res = await axios.get(`https://breics-backend.onrender.com/api/tenants/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTenant(res.data);
    } catch (err) {
      console.error("Failed to fetch tenant profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenant();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!tenant) return <div className="p-6">Tenant not found.</div>;

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Tenant Profile</h1>
        <div className="space-x-3">
          <button className="bg-orange-500 text-white px-4 py-2 rounded">Import tenant</button>
          <button className="border px-4 py-2 rounded text-orange-500 border-orange-500">Actions</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded p-4 shadow">
          <div className="text-center">
            <img
              src={tenant.photo || "/default-avatar.png"}
              alt="tenant"
              className="w-28 h-28 rounded-full mx-auto mb-2"
            />
            <h2 className="font-semibold text-lg">{tenant.name}</h2>
            <p className="text-sm text-gray-500">ID: {tenant.tenantId}</p>
            <p className="text-sm text-gray-500">{tenant.phone}</p>
            <div className="mt-4 space-y-2">
              <button className="text-orange-500 underline text-sm">View Agreement</button>
              <p className="text-xs text-red-500">Rent Expire: {tenant.rentExpiry || "N/A"}</p>
              <button className="bg-red-500 text-white px-4 py-1 rounded text-sm">Terminate access</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded p-4 shadow col-span-2 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Tenant's Basic Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
              <p><strong>First name:</strong> {tenant.firstName}</p>
              <p><strong>Last name:</strong> {tenant.lastName}</p>
              <p><strong>Email:</strong> {tenant.email}</p>
              <p><strong>Phone:</strong> {tenant.phone}</p>
              <p><strong>Date of Birth:</strong> {tenant.dob}</p>
              <p><strong>Occupation:</strong> {tenant.occupation}</p>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Occupancy</h3>
            <p className="text-sm">Rent expires: <strong>{tenant.rentExpiry || "N/A"}</strong></p>
            <p className="text-sm">Amount: ₦{tenant.rentAmount?.toLocaleString()}</p>
            <div className="flex space-x-2 mt-2">
              <button className="bg-orange-500 text-white px-4 py-1 rounded text-sm">Send reminder</button>
              <button className="bg-gray-200 text-gray-700 px-4 py-1 rounded text-sm">Terminate</button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Other Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <h4 className="font-medium text-orange-500">Personal Information</h4>
                <p><strong>Gender:</strong> {tenant.gender}</p>
                <p><strong>Address:</strong> {tenant.address}</p>
                <p><strong>Landmark:</strong> {tenant.landmark}</p>
                <p><strong>State:</strong> {tenant.state}</p>
                <p><strong>Country:</strong> {tenant.country}</p>
              </div>
              <div>
                <h4 className="font-medium text-orange-500">Next of Kin</h4>
                <p><strong>Name:</strong> {tenant.nextOfKinName}</p>
                <p><strong>Email:</strong> {tenant.nextOfKinEmail}</p>
                <p><strong>Phone:</strong> {tenant.nextOfKinPhone}</p>
                <p><strong>Relationship:</strong> {tenant.nextOfKinRelation}</p>
              </div>
              <div>
                <h4 className="font-medium text-orange-500">Referee</h4>
                <p><strong>Name:</strong> {tenant.refereeName}</p>
                <p><strong>Email:</strong> {tenant.refereeEmail}</p>
                <p><strong>Phone:</strong> {tenant.refereePhone}</p>
                <p><strong>Address:</strong> {tenant.refereeAddress}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

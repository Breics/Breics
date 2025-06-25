import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "https://breics-backend.onrender.com/api/landlords";

const LandlordProfile = () => {
  const { id } = useParams(); // Get landlord ID from URL
  const [landlord, setLandlord] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`, {
          withCredentials: true,
        });
        setLandlord(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch landlord details.");
      }
    };

    fetchLandlord();
  }, [id]);

  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!landlord) return <p className="text-center p-4 text-gray-500">Loading...</p>;

  const {
    landlordId,
    firstName,
    lastName,
    email,
    phone,
    dateOfBirth,
    occupation,
    profileImage,
    properties = [],
    tenants = [],
    personalInfo = {},
    nextOfKin = {},
    referee = {},
  } = landlord;

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Profile Header */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <img
            src={profileImage || "https://via.placeholder.com/100"}
            alt="Profile"
            className="mx-auto w-24 h-24 rounded-full object-cover"
          />
          <h2 className="font-semibold mt-2">{firstName} {lastName}</h2>
          <p className="text-blue-600 text-sm">ID: {landlordId}</p>
          <p className="text-sm text-gray-500">{phone}</p>
          <button className="mt-2 text-orange-600 text-sm underline">View ID Card</button>
          <p className="mt-2 text-xs bg-red-100 text-red-500 px-2 py-1 rounded">
            Rent Expires 30/09/2024
          </p>
          <button className="mt-3 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
            Terminate access
          </button>
        </div>

        <div className="md:col-span-2 bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-4">Landlord’s Basic Details</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div><strong>{firstName}</strong><p className="text-gray-400">First Name</p></div>
            <div><strong>{lastName}</strong><p className="text-gray-400">Last Name</p></div>
            <div><strong>{email}</strong><p className="text-gray-400">Email</p></div>
            <div><strong>{phone}</strong><p className="text-gray-400">Phone</p></div>
            <div><strong>{dateOfBirth}</strong><p className="text-gray-400">Date of Birth</p></div>
            <div><strong>{occupation}</strong><p className="text-gray-400">Occupation</p></div>
          </div>
        </div>
      </div>

      {/* Properties */}
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between mb-3">
          <h4 className="font-semibold">Properties ({properties.length})</h4>
          <button className="text-sm text-orange-600">See all →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Property Name</th>
                <th className="p-2">Property ID</th>
                <th className="p-2">Rent</th>
                <th className="p-2">Verification</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((prop, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{prop.name}</td>
                  <td className="p-2 text-blue-500">{prop.propertyId}</td>
                  <td className="p-2">{prop.rent}</td>
                  <td className="p-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      prop.verified ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                    }`}>
                      {prop.verified ? "Verified" : "Unverified"}
                    </span>
                  </td>
                  <td className="p-2">•••</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tenants */}
      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between mb-3">
          <h4 className="font-semibold">Tenants ({tenants.length})</h4>
          <button className="text-sm text-orange-600">See all →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">Tenant Name</th>
                <th className="p-2">Tenant ID</th>
                <th className="p-2">Property</th>
                <th className="p-2">Rent</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant, i) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{tenant.name}</td>
                  <td className="p-2 text-blue-500">{tenant.tenantId}</td>
                  <td className="p-2">{tenant.property}</td>
                  <td className="p-2">{tenant.rent}</td>
                  <td className="p-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      tenant.status === "Paid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                    }`}>
                      {tenant.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Personal Info */}
      <div className="grid md:grid-cols-2 gap-6 text-sm">
        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold mb-2">Personal Information</h4>
          <p><strong>Gender:</strong> {personalInfo.gender}</p>
          <p><strong>Address:</strong> {personalInfo.address}</p>
          <p><strong>Landmark:</strong> {personalInfo.landmark}</p>
          <p><strong>State:</strong> {personalInfo.state}</p>
          <p><strong>Country:</strong> {personalInfo.country}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold mb-2">Next of Kin</h4>
          <p><strong>Name:</strong> {nextOfKin.firstName} {nextOfKin.lastName}</p>
          <p><strong>Email:</strong> {nextOfKin.email}</p>
          <p><strong>Phone:</strong> {nextOfKin.phone}</p>
          <p><strong>Relationship:</strong> {nextOfKin.relationship}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h4 className="font-semibold mb-2">Referee</h4>
          <p><strong>Name:</strong> {referee.firstName} {referee.lastName}</p>
          <p><strong>Email:</strong> {referee.email}</p>
          <p><strong>Phone:</strong> {referee.phone}</p>
          <p><strong>Address:</strong> {referee.address}</p>
        </div>
      </div>
    </div>
  );
};

export default LandlordProfile;

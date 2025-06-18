import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/properties/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (!property) return <div className="text-center p-6 text-red-600">Property not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold">{property.title}</h2>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mt-2">
            <span>Posted: {property.postedDate}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${property.verified ? "bg-green-100 text-green-800" : "bg-red-100 text-red-600"}`}>{property.verified ? "Verified" : "Unverified"}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${property.occupied ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}>{property.occupied ? "Occupied" : "Vacant"}</span>
          </div>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">Actions</button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 border-b pb-4">
        {["Overview", "Facility", "Payments", "Documents", "Tenant"].map((tab, i) => (
          <button key={i} className={`px-3 py-2 text-sm ${i === 0 ? "border-b-2 border-orange-500 font-semibold" : "text-gray-600"}`}>{tab}</button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <h4 className="text-lg font-semibold mb-1">Rent expires</h4>
          <p className="text-gray-700">On {property.rentExpiry}</p>
          <p className="text-gray-700">{property.rent}/year</p>
          <div className="mt-2 flex gap-2">
            <button className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm">Send reminder</button>
            <button className="bg-red-100 text-red-600 px-3 py-1 rounded text-sm">Terminate</button>
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded shadow-sm">
          <p className="font-semibold">{property.tenant.name}</p>
          <p>{property.tenant.email}</p>
          <p>{property.tenant.phone}</p>
          <p>{property.tenant.occupation}</p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">General Information</h3>
        <p className="text-gray-700 mb-4">{property.description}</p>
        <div className="flex flex-wrap gap-3 text-sm mb-4">
          <span className="bg-gray-100 px-3 py-1 rounded">{property.bedrooms} Bedroom</span>
          <span className="bg-gray-100 px-3 py-1 rounded">{property.bathrooms} Bathroom</span>
          <span className="bg-gray-100 px-3 py-1 rounded">{property.gender}</span>
          <span className="bg-gray-100 px-3 py-1 rounded">{property.serviced ? "Serviced" : "Not Serviced"}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div><strong>Property ID:</strong> {property.id}</div>
          <div><strong>Type:</strong> {property.type}</div>
          <div><strong>Year Built:</strong> {property.yearBuilt}</div>
          <div><strong>Lease Type:</strong> {property.leaseType}</div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Property Images</h3>
        <div className="flex gap-3 overflow-x-auto">
          {property.images.map((img, i) => (
            <img key={i} src={img} alt={`property-${i}`} className="w-40 h-32 object-cover rounded" />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Property Location</h3>
        <iframe
          title="map"
          src={property.mapEmbed}
          className="w-full h-64 rounded border"
        />
        <div className="mt-3 text-sm text-gray-700">
          <p>{property.address}</p>
          <p>{property.city}, {property.state}, {property.country}</p>
          <p>ZIP: {property.zip}</p>
          <p>Landmark: {property.landmark}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Special Preferences</h3>
          <p><strong>Religion:</strong> {property.preferences.religion}</p>
          <p><strong>Tribe:</strong> {property.preferences.tribe}</p>
          <p><strong>Marital Status:</strong> {property.preferences.marital}</p>
          <p><strong>Employment Status:</strong> {property.preferences.employment}</p>
          <p><strong>Studio Use:</strong> {property.preferences.studioUse ? "Yes" : "No"}</p>
          <p><strong>Max Co-resident:</strong> {property.preferences.coResidents}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Property Amenities</h3>
          <ul className="list-disc list-inside">
            {property.amenities.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Neighbourhood & Side Attractions</h3>
        <ul className="list-disc list-inside text-gray-700">
          {property.attractions.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PropertyDetails;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import landlordImage from '../../image/land.jpg';

const TenantDashboard = () => {
  const [tenants, setTenants] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [propertyFilter, setPropertyFilter] = useState("all");
  const [sort, setSort] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch("http://localhost:5000/api/tenants")
      .then(res => res.json())
      .then(data => {
        setTenants(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    let data = [...tenants];

    // Filter
    if (statusFilter !== "all") {
      data = data.filter(t => t.status === statusFilter);
    }
    if (propertyFilter !== "all") {
      data = data.filter(t => t.property === propertyFilter);
    }

    // Search
    if (search) {
      data = data.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
    }

    // Sort
    data.sort((a, b) => {
      if (sort === "expiry") {
        return new Date(a.rentExpiry) - new Date(b.rentExpiry);
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    setFiltered(data);
    setCurrentPage(1); // Reset to page 1 on new filter
  }, [search, statusFilter, propertyFilter, sort, tenants]);

  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-bold">My Tenants</h2>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button className="bg-orange-500 text-white px-4 py-2 rounded">Import Tenants</button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded">Move-in Tenant</button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <input
          className="border px-3 py-2 rounded col-span-2"
          placeholder="Search by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select className="border px-3 py-2 rounded" onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="overdue">Overdue</option>
        </select>
        <select className="border px-3 py-2 rounded" onChange={e => setPropertyFilter(e.target.value)}>
          <option value="all">All Properties</option>
          {[...new Set(tenants.map(t => t.property))].map((prop, i) => (
            <option key={i} value={prop}>{prop}</option>
          ))}
        </select>
        <select className="border px-3 py-2 rounded" onChange={e => setSort(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="expiry">Sort by Expiry</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded text-center">
          <h4 className="text-lg font-bold">{tenants.length}</h4>
          <p>Total Tenants</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h4 className="text-lg font-bold">{tenants.filter(t => t.status === "active").length}</h4>
          <p>Active Tenants</p>
        </div>
        <div className="bg-white p-4 shadow rounded text-center">
          <h4 className="text-lg font-bold">{tenants.filter(t => t.status === "overdue").length}</h4>
          <p>Overdue Tenants</p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginated.map((t, i) => (
          <div key={i} className="bg-white rounded shadow p-4 relative group">
            <div className="flex justify-between items-center mb-2">
              <img src={t.image || landlordImage} alt="avatar" className="w-14 h-14 rounded-full" />
              <div className="relative">
                <button className="text-xl font-bold">⋮</button>
                <div className="hidden group-hover:block absolute right-0 top-8 bg-white shadow rounded z-10 w-48">
                  <ul className="text-sm divide-y">
                    {["View Tenant", "Send Payment", "Send Reminder", "Escalate Issue", "Send Document", "Terminate", "View Rental Status"].map((action, a) => (
                      <li key={a} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h4 className="font-bold">{t.name}</h4>
              <p className="text-sm">ID: {t.id}</p>
              <p className="text-sm">{t.phone}</p>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded inline-block mt-1">
                Rent Expires {t.rentExpiry}
              </span>
              <div className="mt-2">
                <Link to={`/tenants/${t.id}`} className="text-orange-500 text-sm font-semibold">
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-2">
        <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} className="px-2">&lt;</button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-orange-500 text-white" : "bg-white border"}`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} className="px-2">&gt;</button>
      </div>
    </div>
  );
};

export default TenantDashboard;

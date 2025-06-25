import React, { useEffect, useState } from "react";
import axios from "axios";
import ChartCard from "../../Dashbooard_For_Landlord/DashCard";
import RevenueChart from "./RevenueChart";

const defaultDashboardData = {
  totalProperties: {
    occupied: 0,
    vacant: 0,
    pending: 0,
    total: 0,
  },
  rentalIncome: {
    paid: 0,
    overdue: 0,
  },
  tenants: {
    active: 0,
    inactive: 0,
  },
  tickets: {
    open: 0,
    closed: 0,
  },
};

const AdminBoard = () => {
  const [dashboardData, setDashboardData] = useState(defaultDashboardData);
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("Token not found.");
      return;
    }

    const fetchAdmin = async () => {
      try {
        const res = await axios.get(
          `https://breics-backend.onrender.com/api/admin/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAdminName(res.data?.data?.admin?.firstName || "Admin");
      } catch (err) {
        console.error("Failed to fetch admin profile:", err.message);
      }
    };

    const fetchDashboardData = async () => {
      try {
        // 1. Fetch all properties
        const propRes = await axios.get(`https://breics-backend.onrender.com/api/properties`);
        const allProperties = propRes.data?.data || [];

        const occupied = allProperties.filter((p) => p.occupied).length;
        const vacant = allProperties.filter((p) => !p.occupied && p.verified).length;
        const pending = allProperties.filter((p) => !p.verified).length;

        // 2. Fetch tenants
        const tenantRes = await axios.get(`https://breics-backend.onrender.com/api/tenants`);
        const allTenants = tenantRes.data?.data || [];
        const activeTenants = allTenants.filter((t) => t.isActive).length;
        const inactiveTenants = allTenants.length - activeTenants;

        // 3. Fetch tickets
        const ticketRes = await axios.get(`https://breics-backend.onrender.com/api/tickets`);
        const allTickets = ticketRes.data?.data || [];
        const openTickets = allTickets.filter((t) => t.status === "open").length;
        const closedTickets = allTickets.filter((t) => t.status === "closed").length;

        // 4. Fetch rental income
        const incomeRes = await axios.get(`https://breics-backend.onrender.com/api/rentals`);
        const allRentals = incomeRes.data?.data || [];
        const paid = allRentals.filter((r) => r.status === "paid").reduce((acc, curr) => acc + (curr.amount || 0), 0);
        const overdue = allRentals.filter((r) => r.status === "overdue").reduce((acc, curr) => acc + (curr.amount || 0), 0);

        // Set updated dashboard data
        setDashboardData({
          totalProperties: {
            occupied,
            vacant,
            pending,
            total: allProperties.length,
          },
          rentalIncome: {
            paid,
            overdue,
          },
          tenants: {
            active: activeTenants,
            inactive: inactiveTenants,
          },
          tickets: {
            open: openTickets,
            closed: closedTickets,
          },
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err.message);
      }
    };

    fetchAdmin();
    fetchDashboardData();

    const interval = setInterval(fetchDashboardData, 5000);
    return () => clearInterval(interval);
  }, []);

  const {
    totalProperties = {},
    rentalIncome = {},
    tenants = {},
    tickets = {},
  } = dashboardData;

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold">Hi {adminName} 👋</h2>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="flex flex-wrap gap-4 mb-10">
        <ChartCard
          title="Total Properties"
          labels={["Occupied", "Vacant", "Pending"]}
          dataValues={[
            totalProperties.occupied,
            totalProperties.vacant,
            totalProperties.pending,
          ]}
          colors={["#5cb85c", "#5bc0de", "#f0ad4e"]}
        />
        <ChartCard
          title="Rental Income"
          labels={["Paid", "Overdue"]}
          dataValues={[rentalIncome.paid, rentalIncome.overdue]}
          colors={["#5cb85c", "#d9534f"]}
        />
        <ChartCard
          title="Tenants"
          labels={["Active", "Inactive"]}
          dataValues={[tenants.active, tenants.inactive]}
          colors={["#5cb85c", "#f0ad4e"]}
        />
        <ChartCard
          title="Tickets"
          labels={["Open", "Closed"]}
          dataValues={[tickets.open, tickets.closed]}
          colors={["#5bc0de", "#d9534f"]}
        />
      </div>

      {/* Revenue Line Chart */}
      <RevenueChart />
    </div>
  );
};

export default AdminBoard;

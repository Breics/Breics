import React, { useEffect, useState } from 'react';
import ChartCard from './DashCard';

// Static fallback data
const defaultDashboardData = {
  totalProperties: {
    total: 22,
    occupied: 12,
    vacant: 2,
    pending: 8
  },
  rentalIncome: {
    paid: 4000000,
    overdue: 2100000
  },
  tenants: {
    total: 22,
    active: 16,
    inactive: 6
  },
  tickets: {
    total: 12,
    open: 10,
    closed: 2
  }
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(defaultDashboardData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/dashboard-data');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setDashboardData(data);
      } catch (error) {
        console.warn('Using fallback data, backend not reachable:', error.message);
        // Keeps defaultDashboardData
      }
    };

    fetchData();
  }, []);

  const { totalProperties, rentalIncome, tenants, tickets } = dashboardData;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Hi Shehu 👋</h2>
      <h1>Dashboard</h1>

      <div className="cards" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
        <ChartCard
          title="Total Properties"
          labels={['Occupied', 'Vacant', 'Pending']}
          dataValues={[totalProperties.occupied, totalProperties.vacant, totalProperties.pending]}
          colors={['#5cb85c', '#5bc0de', '#f0ad4e']}
        />
        <ChartCard
          title="Rental Income"
          labels={['Paid', 'Overdue']}
          dataValues={[rentalIncome.paid, rentalIncome.overdue]}
          colors={['#5cb85c', '#d9534f']}
        />
        <ChartCard
          title="Tenants"
          labels={['Active', 'Inactive']}
          dataValues={[tenants.active, tenants.inactive]}
          colors={['#5cb85c', '#f0ad4e']}
        />
        <ChartCard
          title="Tickets"
          labels={['Open', 'Closed']}
          dataValues={[tickets.open, tickets.closed]}
          colors={['#5bc0de', '#d9534f']}
        />
      </div>
    </div>
  );
};

export default Dashboard;

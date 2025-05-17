import React, { useEffect, useState } from 'react';
import ChartCard from './DashCard';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/dashboard-data') // Replace with your actual endpoint
      .then(res => res.json())
      .then(data => setDashboardData(data))
      .catch(err => console.error(err));
  }, []);

  if (!dashboardData) return <p style={{ padding: '2rem' }}>Loading dashboard...</p>;

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

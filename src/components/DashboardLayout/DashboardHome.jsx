import React, { useEffect, useState } from 'react';
import ChartCard from './DashCard';

const defaultDashboardData = {
  totalProperties: {
    total: 0,
    occupied: 0,
    vacant: 0,
    pending: 0,
  },
  rentalIncome: {
    paid: 0,
    overdue: 0,
  },
  tenants: {
    total: 0,
    active: 0,
    inactive: 0,
  },
  tickets: {
    total: 0,
    open: 0,
    closed: 0,
  },
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(defaultDashboardData);
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const userId = localStorage.getItem('user_id'); // landlord_id
    if (!userId) return;

    const fetchUserName = async () => {
      try {
        const res = await fetch('http://localhost/breicsk/backk/get_user_info.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ user_id: parseInt(userId) }),
        });

        const result = await res.json();
        if (result.success) {
          setUserName(result.data.full_name);
        } else {
          console.warn(result.message);
        }
      } catch (err) {
        console.error('Error fetching user name:', err.message);
      }
    };

    const fetchDashboardData = async () => {
      try {
        const res = await fetch(`http://localhost/breicsk/backk/fetch_landlord_statdata.php`);
        if (!res.ok) throw new Error('Failed to fetch dashboard stats');

        const data = await res.json();

        // Reshape backend data into the format expected by the UI
        const reshapedData = {
          totalProperties: {
            occupied: data.properties.occupied,
            vacant: data.properties.vacant,
            pending: data.properties.pending,
            total: data.properties.occupied + data.properties.vacant + data.properties.pending,
          },
          rentalIncome: {
            paid: data.rental_income.paid,
            overdue: data.rental_income.overdue,
          },
          tenants: {
            active: data.tenants.active,
            inactive: data.tenants.inactive,
            total: data.tenants.active + data.tenants.inactive,
          },
          tickets: {
            open: data.tickets.open,
            closed: data.tickets.closed,
            total: data.tickets.open + data.tickets.closed,
          },
        };

        setDashboardData(reshapedData);
      } catch (err) {
        console.warn('Using fallback data:', err.message);
      }
    };

    fetchUserName();
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 5000);
    return () => clearInterval(interval);
  }, []);

  const { totalProperties, rentalIncome, tenants, tickets } = dashboardData;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Hi {userName} 👋</h2>
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

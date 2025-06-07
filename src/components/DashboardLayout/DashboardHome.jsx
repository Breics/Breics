import React, { useEffect, useState } from 'react';
import ChartCard from './DashCard';
import axios from 'axios';

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
  const [userData, setUserData] = useState({
    firstName: '',
    isVerified: false,
    accountType: '',
  });

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');
    if (!userId || !token) {
      console.warn('User ID or token not found in localStorage.');
      return;
    }

    // Fetch user data
    axios
      .get(`https://breics-backend.onrender.com/api/landlords/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const landlord = res.data.data.landlord;
        setUserData({
          firstName: landlord.firstName || '',
          isVerified: landlord.verificationStatus?.isVerified || false,
          accountType: landlord.accountType || '',
        });
      })
      .catch((err) => {
        console.error('Failed to fetch user data in Dashboard:', err.response?.data || err.message);
      });

    // Fetch dashboard stats
    const fetchDashboardData = async () => {
      try {
        const res = await fetch(`http://localhost/breicsk/backk/fetch_landlord_statdata.php`);
        if (!res.ok) throw new Error('Failed to fetch dashboard stats');
        const data = await res.json();

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

    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 5000); // auto-refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  const { totalProperties, rentalIncome, tenants, tickets } = dashboardData;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Hi {userData.firstName} 👋</h2>
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

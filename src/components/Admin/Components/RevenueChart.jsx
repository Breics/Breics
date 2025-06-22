// src/components/RevenueChart.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", earnings: 200000, expenses: 30000 },
  { month: "Feb", earnings: 250000, expenses: 20000 },
  { month: "Mar", earnings: 300000, expenses: 25000 },
  { month: "Apr", earnings: 280000, expenses: 30000 },
  { month: "May", earnings: 320000, expenses: 25000 },
  { month: "Jun", earnings: 270000, expenses: 20000 },
  { month: "Jul", earnings: 350000, expenses: 30000 },
  { month: "Aug", earnings: 400000, expenses: 35000 },
  { month: "Sep", earnings: 300000, expenses: 25000 },
  { month: "Oct", earnings: 370000, expenses: 30000 },
  { month: "Nov", earnings: 380000, expenses: 40000 },
  { month: "Dec", earnings: 330000, expenses: 50000 },
];

const RevenueChart = () => {
  return (
    <div className="mt-10 p-6 bg-white shadow rounded-xl">
      <h3 className="text-lg font-semibold mb-4">Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(val) => `${val / 1000}k`} />
          <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="earnings"
            stroke="#2ECC71"
            strokeWidth={3}
            name="Earnings"
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#E74C3C"
            strokeWidth={3}
            name="Expenses"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;

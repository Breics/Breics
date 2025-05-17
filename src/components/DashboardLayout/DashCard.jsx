import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartCard = ({ title, labels, dataValues, colors }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="card">
      <h3>{title}</h3>
      <Doughnut data={data} />
    </div>
  );
};

export default ChartCard;

import { Chart as ChartJS } from "chart.js/auto";

import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Working Hours",
      data: [12, 19, 3, 5, 2, 3, 10],
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
    },
    {
      label: "Goals Completed",
      data: [5, 7, 9, 3, 8, 2, 5],
      borderColor: "rgba(54, 162, 235, 1)",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
    },
    {
      label: "Overtime Hours",
      data: [3, 8, 12, 4, 7, 9, 2],
      borderColor: "rgba(255, 206, 86, 1)",
      backgroundColor: "rgba(255, 206, 86, 0.2)",
    },
  ],
};

const options = {
  scales: {
    yAxes: [{
      ticks: {
        fontColor: 'white',
        beginAtZero: true,
      },
    }],
    xAxes: [{
      ticks: {
        fontColor: 'white',
      },
    }],
  },
  legend: {
    labels: {
      fontColor: 'white',
    },
  },
  maintainAspectRatio: false,
  responsive: true,
};

const LineGraph = () => (
  <div className="h-full shadow-2xl w-2/3 p-4">
    <Line data={data} options={options} height={null} />
  </div>
);

export default LineGraph;

import { Line } from "react-chartjs-2";
import { useRef, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

export const TemperatureChart = ({chartData}) => {
    console.log(chartData);

    const options = {
        maintainAspectRatio: false,
        responsive: true
    }

    return <Line data={chartData} options={options} />;
}

export default TemperatureChart;
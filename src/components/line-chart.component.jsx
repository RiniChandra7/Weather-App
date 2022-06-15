import { Line } from "react-chartjs-2";
import { useEffect } from "react";
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
    const options = {
        maintainAspectRatio: false,
        responsive: true
    }
    let updateFlag = <Line data={chartData} options={options} />;

    useEffect(() => {
      updateFlag = <Line data={chartData} options={options} />
    }, [chartData]);

    return updateFlag;
}

export default TemperatureChart;
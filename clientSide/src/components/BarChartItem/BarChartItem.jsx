import React from 'react'

import { Bar } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js/auto"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const BarChartItem = ({ chartData, barChartText }) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom"
            },
            title: {
                display: true,
                text: `${barChartText}`,
                color: "white"
            }
        }
    }

    return (
        <Bar options={options} data={chartData}>
            Bar Chart
        </Bar>
    )
}

export default BarChartItem

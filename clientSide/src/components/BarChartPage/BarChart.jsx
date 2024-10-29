
import { useState } from 'react'
import './BarChart.css'
import BarChartItem from './../BarChartItem/BarChartItem.jsx'
import { usersData } from "./Data.jsx"



function BarChart({ barChartText, barChartData, labelsData }) {

    const [userData, setUserData] = useState({
        labels: barChartData.map((data) => data.productName),
        datasets: [{
            label: labelsData[0],
            data: barChartData.map((data) => data.PredictedSales),
            backgroundColor: ["blue"],
        }, {
            label: labelsData[1],
            data: barChartData.map((data) => data.safetyStock),
            backgroundColor: ["red"]
        }, {
            label: labelsData[2],
            data: barChartData.map((data) => data.reorderPointQuantity),
            backgroundColor: ["green"]
        }
        ]
    })

    return (
        <div className='bar-chart-container'>
            <div style={{ width: 550 }}>
                <BarChartItem chartData={userData} barChartText={barChartText} />
            </div>

        </div>
    )
}

export default BarChart

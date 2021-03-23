import React from 'react';
import { Bar } from 'react-chartjs-2'

const BarChart = ({ data, label } : any) => {

    return (
        <div>
            <Bar
                width={10}
                height={250}
                data={{
                    labels: Object.keys(data),
                    datasets: [
                        {
                            label,
                            data: Object.values(data),
                            backgroundColor: 'rgba(52, 152, 219,0.5)'
                        }
                    ]
                }}
                options={{
                    maintainAspectRatio: false,
                }}
            />
        </div>
    )
}

export default BarChart;

import React from 'react';
import { Radar } from 'react-chartjs-2'

const RadarChart = ({ data, label } : any) => {

    console.log(data);

    return (
        <div>
            <Radar
                height={300}
                data={{
                    labels: Object.keys(data),
                    datasets: [
                        {
                            label,
                            data: Object.values(data),
                            backgroundColor: 'rgba(231, 76, 60, 0.5)'
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

export default RadarChart;

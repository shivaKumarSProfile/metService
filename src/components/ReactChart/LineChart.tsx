import React from 'react';
import { Line } from 'react-chartjs-2'

const LineChart = ({ data, label } : any) => {

    console.log(data);

    return (
        <div>
            <Line
                height={250}
                data={{
                    labels: Object.keys(data[0]),
                    datasets: [
                        {
                            label: label[0],
                            data: Object.values(data[0]),
                            backgroundColor: 'rgba(52, 152, 219,0.5)'
                        },
                        {
                            label: label[1],
                            data: Object.values(data[1]),
                            backgroundColor: 'rgba(46, 204, 113,0.5)'
                        },
                        {
                            label: label[2],
                            data: Object.values(data[2]),
                            backgroundColor: 'rgba(231, 76, 60, 0.5)'
                        },
                    ]
                }}
                options={{
                    maintainAspectRatio: false,

                }}
            />
        </div>
    )
}

export default LineChart;

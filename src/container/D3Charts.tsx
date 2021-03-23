import React from 'react';
import PieChart from "../components/D3Chart/PieChart";
import BarGraph from "../components/D3Chart/BarGraph";
import moment from "moment";

interface ID3Charts {
    data: any;
}

const D3Charts = ({ data }: ID3Charts) => {

    let totalSpeedCount: number = 0;
    let totalDensityCount: number = 0;
    let totalHeightCount: number = 0;

    let totalSpeed: number = 0.00;
    let totalDensity: number = 0.00;
    let totalHeight: number = 0.00;

    let stackedData: any = [];

    for(let i in data) {
        if(data[i].sea_surface_wave_from_direction_at_variance_spectral_density_maximum) {
            totalDensityCount += 1
            totalDensity += data[i].sea_surface_wave_from_direction_at_variance_spectral_density_maximum
        }
        if(data[i].surface_sea_water_speed) {
            totalSpeedCount += 1
            totalSpeed += data[i].surface_sea_water_speed
        }
        if(data[i].sea_surface_wave_maximum_height) {
            totalHeightCount += 1
            totalHeight += data[i].sea_surface_wave_maximum_height
        }
        stackedData.push({
            name: moment(i).format('DD-MM-YYYY'),
            Speed: data[i].surface_sea_water_speed || 0,
            Density: data[i].sea_surface_wave_from_direction_at_variance_spectral_density_maximum,
            Height: data[i].sea_surface_wave_maximum_height
        })
    }

    let refactorSpeedData: any = [
        { label: 'Water Speed', value: ((totalSpeed * 100) / totalSpeedCount)},
        { label: 'Spectral Density', value: ((totalDensity * 100) / totalDensityCount)},
        { label: 'Wave Maximum Height', value: ((totalHeight * 100) / totalHeightCount)}
    ];

    return (
        <div>
            <h2>D3 Charts</h2>
            <PieChart data={refactorSpeedData}
                      width={500}
                      height={500}
                      innerRadius={0}
                      outerRadius={100} />
            <BarGraph data={stackedData} />
        </div>
    )
}

export default D3Charts;

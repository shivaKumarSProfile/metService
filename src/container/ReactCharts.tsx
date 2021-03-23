import React from 'react';
import BarChart from "../components/ReactChart/BarChart";
import moment from "moment";
import LineChart from "../components/ReactChart/LineChart";
import RadarChart from "../components/ReactChart/RadarChart";

interface IReactCharts {
    data: any;
}

const ReactCharts = ({ data }: IReactCharts) => {

    const refactorSpeedData: any = {};
    const refactorDensity: any = {};
    const refactorHeight: any = {};

    for(let i in data) {
        if (data[i].surface_sea_water_speed) {
            refactorSpeedData[moment(i).format('DD-MM-YYYY')] = data[i].surface_sea_water_speed
        }
        if (data[i].sea_surface_wave_from_direction_at_variance_spectral_density_maximum) {
            refactorDensity[moment(i).format('DD-MM-YYYY')] = data[i].sea_surface_wave_from_direction_at_variance_spectral_density_maximum
        }
        if (data[i].sea_surface_wave_maximum_height) {
            refactorHeight[moment(i).format('DD-MM-YYYY')] = data[i].sea_surface_wave_maximum_height
        }
    }

    return (
        <div>
            <h2>React Charts</h2>
            <BarChart data={refactorSpeedData} label={'surface sea water speed'} />
            <LineChart
                data={[refactorSpeedData, refactorDensity, refactorHeight]}
                label={['surface sea water speed', 'spectral density maximum', 'wave maximum height']} />
            <RadarChart data={refactorHeight} label={'wave maximum height'} />
        </div>
    )
}

export default ReactCharts;

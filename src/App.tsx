import React from 'react';
import './App.css';
import Data from './constant/data.json'
import ReactCharts from "./container/ReactCharts";
import D3Charts from "./container/D3Charts";
import Container from "./container";
import './common/Style/bootstrap.min.css'
import './common/Style/style.css'

function App() {
  return (
    <div className="App">
      {/*<ReactCharts data={Data} />*/}
      {/*<D3Charts data={Data} />*/}
      <Container data={Data} />
    </div>
  );
}

export default App;

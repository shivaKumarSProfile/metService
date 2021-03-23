import React, { useState } from "react";
import { StackedChart } from "./StackedChart";

const allKeys = ["Speed", "Density", "Height"];

const colors: any = {
    Speed: "rgba(69, 0, 0, 0.8)",
    Density: "rgba(240, 72, 19, 0.8)",
    Height: "rgba(255, 199, 128, 0.8)"
};

const BarGraph = ({ data }: any) => {

    const [keys, setKeys] = useState(allKeys);

    return (
        <div>
            <StackedChart datasets={data} colors={colors} keys={keys} />
            <div className="fields" style={{ display: "flex" }}>
                {allKeys.map((key) => (
                    <div key={key} className="field" style={{ display: "flex" }}>
                        <input
                            id={key}
                            type="checkbox"
                            checked={keys.includes(key)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setKeys(Array.from(new Set([...keys, key])));
                                } else {
                                    setKeys(keys.filter((_key) => _key !== key));
                                }
                            }}
                        />
                        <label htmlFor={key} style={{ color: colors[key] }}>
                            {key}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BarGraph;

import React, { useState, useEffect, useRef } from "react";
import {
    select,
    scaleBand,
    axisBottom,
    axisLeft,
    scaleLinear,
    stack,
    max
} from "d3";

export const StackedChart = ({ datasets, keys, colors }: any) => {
    const [data, setData] = useState(datasets);
    const svgRef: any = useRef();
    const wrapperRef: any = useRef();

    useEffect(() => {
        const svg = select(svgRef.current);
        const { width, height } = wrapperRef.current.getBoundingClientRect();
        const stackGenerator = stack().keys(keys);
        const layers = stackGenerator(data);
        const extent: any = [
            0,
            max(layers, (layer) => max(layer, (sequence) => sequence[1]))
        ];
        const yScale = scaleLinear().domain(extent).range([height, 0]);

        const x0Scale: any = scaleBand()
            .domain(data.map((d: any) => d.name))
            .range([0, width])
            .padding(0.46);
        const x1Scale = scaleBand()
            .domain(data.map((d: any) => d.type))
            .rangeRound([0, x0Scale.bandwidth()])
            .padding(0.12);

        const xAix: any = axisBottom(x0Scale);
        const yAix: any = axisLeft(yScale);

        svg
            .select(".x-axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAix);
        svg
            .select(".y-axis")
            .attr("transform", `translate(${0 + 25}, 0 )`)
            .call(yAix);

        svg
            .selectAll(".layer")
            .data(layers)
            .join("g")
            .attr("class", "layer")
            .attr("fill", (layer) => colors[layer.key])
            .selectAll("rect")
            .data((layer) => layer)
            .join("rect")
            .attr(
                "x",
                (sequence: any) => x0Scale(sequence.data.name) + x1Scale(sequence.data.type)
            )
            .attr("width", x1Scale.bandwidth())
            .attr("y", (sequence) => yScale(sequence[1]))
            .attr("height", (sequence) => yScale(sequence[0]) - yScale(sequence[1]));

        svg
            .select(".x-axis")
            .selectAll(".tick")
            .on("click", (e) => {
                const filteredD = data.map((d: any) => {
                    return {
                        name: d.name,
                        Speed: d.name === e ? 0 : d.Speed,
                        Density: d.name === e ? 0 : d.Density,
                        Height: d.name === e ? 0 : d.Height
                    };
                });
                setData(filteredD);
            });
    }, [data, keys, colors]);

    return (
        <>
            <div
                ref={wrapperRef}
                style={{ width: "100%", height: "250px", marginBottom: "2rem" }}
            >
                <svg ref={svgRef} style={{ width: "100%", height: "110%" }}>
                    <g className="x-axis" />
                    <g className="y-axis" />
                </svg>
            </div>
        </>
    );
};

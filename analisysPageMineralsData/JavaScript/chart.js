function createArrGraph(data, key) {
    const groupObj = d3.group(data, d => d[key]);

    let arrGraph = [];
    for (let [group, values] of groupObj) {
        let densities = values.map(d => parseFloat(d['Плотность']));
        let minDensity = d3.min(densities);
        let maxDensity = d3.max(densities);
        let avgDensity = d3.mean(densities);
        arrGraph.push({
            labelX: group,
            values: [minDensity, avgDensity, maxDensity]
        });
    }

    return arrGraph;
}

function drawGraph(data) {
    const keyX = d3.select('input[name="xAxis"]:checked').property("value");
    const chartType = d3.select('#chartType').property("value");
    const showAvg = d3.select('#showAvg').property("checked");
    const showMax = d3.select('#showMax').property("checked");
    const showMin = d3.select('#showMin').property("checked");

    let arrGraph = createArrGraph(data, keyX);

    let svg = d3.select("svg");
    svg.selectAll('*').remove();

    const attr_area = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 50,
        marginY: 50
    };

    const [scX, scY] = createAxis(svg, arrGraph, attr_area);

    if (chartType === "dotted") {
        createChart(svg, arrGraph, scX, scY, attr_area, showAvg, showMax, showMin);
    } else if (chartType === "histogram") {
        createHistogram(svg, arrGraph, scX, scY, attr_area, showAvg, showMax, showMin);
    } else if (chartType === "line") {
        createLineChart(svg, arrGraph, scX, scY, attr_area, showAvg, showMax, showMin);
    }
}

function createAxis(svg, data, attr_area) {
    const allValues = data.flatMap(d => d.values);
    const [min, max] = d3.extent(allValues);

    let scaleX = d3.scaleBand()
        .domain(data.map(d => d.labelX))
        .range([0, attr_area.width - 2 * attr_area.marginX])
        .padding(0.1);

    let scaleY = d3.scaleLinear()
        .domain([min * 0.85, max * 1.1])
        .range([attr_area.height - 2 * attr_area.marginY, 0]);

    let axisX = d3.axisBottom(scaleX);
    let axisY = d3.axisLeft(scaleY);

    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.height - attr_area.marginY})`)
        .call(axisX)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .call(axisY);

    return [scaleX, scaleY];
}

function createChart(svg, data, scaleX, scaleY, attr_area, showAvg, showMax, showMin) {
    const r = 4;

    if (showMin) {
        svg.selectAll(".dot-min")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", r)
            .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .attr("cy", d => scaleY(d.values[0]))
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
            .style("fill", "blue");
    }
    if (showAvg) {
        svg.selectAll(".dot-avg")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", r)
            .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .attr("cy", d => scaleY(d.values[1]))
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
            .style("fill", "green");
    }
    if (showMax) {
        svg.selectAll(".dot-max")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", r)
            .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .attr("cy", d => scaleY(d.values[2]))
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
            .style("fill", "red");
    }
}

function createHistogram(svg, data, scaleX, scaleY, attr_area, showAvg, showMax, showMin) {
    const numBars = (showAvg ? 1 : 0) + (showMax ? 1 : 0) + (showMin ? 1 : 0);
    const barWidth = scaleX.bandwidth() / numBars;

    let i = 0;
    if (showMin) {
        svg.selectAll(".bar-min")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => scaleX(d.labelX) + i * barWidth)
            .attr("y", d => scaleY(d.values[0]))
            .attr("width", barWidth)
            .attr("height", d => attr_area.height - 2 * attr_area.marginY - scaleY(d.values[0]))
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
            .style("fill", "blue");
        i++;
    }
    if (showAvg) {
        svg.selectAll(".bar-avg")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => scaleX(d.labelX) + i * barWidth)
            .attr("y", d => scaleY(d.values[1]))
            .attr("width", barWidth)
            .attr("height", d => attr_area.height - 2 * attr_area.marginY - scaleY(d.values[1]))
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
            .style("fill", "green");
        i++;
    }
    if (showMax) {
        svg.selectAll(".bar-max")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => scaleX(d.labelX) + i * barWidth)
            .attr("y", d => scaleY(d.values[2]))
            .attr("width", barWidth)
            .attr("height", d => attr_area.height - 2 * attr_area.marginY - scaleY(d.values[2]))
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
            .style("fill", "red");
    }
}

function createLineChart(svg, data, scaleX, scaleY, attr_area, showAvg, showMax, showMin) {
    const lineGenerator = d3.line()
        .x(d => scaleX(d.labelX) + scaleX.bandwidth() / 2) // центр полосы по X
        .y(d => scaleY(d.value)) // значение по Y
        .defined(d => !isNaN(d.value));

    if (showMin) {
        const minData = data.map(d => ({ labelX: d.labelX, value: d.values[0] }));
        svg.append("path")
            .datum(minData)
            .attr("fill", "none")
            .style("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("d", lineGenerator)
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`);
    }

    if (showAvg) {
        const avgData = data.map(d => ({ labelX: d.labelX, value: d.values[1] }));
        svg.append("path")
            .datum(avgData)
            .attr("fill", "none")
            .style("stroke", "green")
            .attr("stroke-width", 2)
            .attr("d", lineGenerator)
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`);
    }

    if (showMax) {
        const maxData = data.map(d => ({ labelX: d.labelX, value: d.values[2] }));
        svg.append("path")
            .datum(maxData)
            .attr("fill", "none")
            .style("stroke", "red")
            .attr("stroke-width", 2)
            .attr("d", lineGenerator)
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`);
    }
}
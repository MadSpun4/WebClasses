// Входные данные:
//   data - исходный массив (например, buildings)
//   key - поле, по которому осуществляется группировка

let groupObj = {};

function createArrGraph(data, key) {

    groupObj = d3.group(data, d => d[key]);

    let arrGraph =[];
    for(let entry of groupObj) {
        let minMax = d3.extent(entry[1].map(d => d['Высота']));
        arrGraph.push({labelX : entry[0], values : minMax});
    }

    return arrGraph;
}

function drawGraph(data) {
    // значения по оси ОХ
    const keyX = d3.select('input[name="xAxis"]:checked').property("value");
    const graphType = d3.select('#graphType').property("value");

    // создаем массив для построения графика
    const arrGraph = createArrGraph(data, keyX);

    if (keyX === "Год") {
        arrGraph.sort((a, b) => parseInt(a.labelX) - parseInt(b.labelX));
    }

    let svg = d3.select("svg")
    svg.selectAll('*').remove();

    // создаем словарь с атрибутами области вывода графика
    let attr_area = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 50,
        marginY: 50
    }

    // создаем шкалы преобразования и выводим оси
    const [scX, scY] = createAxis(svg, arrGraph, attr_area);

    if (graphType === "dotted") {
        createChart(svg, arrGraph, scX, scY, attr_area, "red");
    } else if (graphType === "histogram") {
        createHistogram(svg, arrGraph, scX, scY, attr_area, "red");
    }
}

function createAxis(svg, data, attr_area){
    const [min, max] = d3.extent(data.map(d => d.values[1]));
    const keyX = d3.select('input[name="xAxis"]:checked').property("value");

    // функция интерполяции значений на оси
    // по оси ОХ текстовые значения
    let scaleX;
    if (keyX === "Год") {
        scaleX = d3.scaleBand()
            .domain(data.map(d => d.labelX).sort((a, b) => parseInt(a) - parseInt(b)))
            .range([0, attr_area.width - 2 * attr_area.marginX]);
    } else {
        scaleX = d3.scaleBand()
            .domain(data.map(d => d.labelX))
            .range([0, attr_area.width - 2 * attr_area.marginX]);
    }

    let scaleY = d3.scaleLinear()
        .domain([min * 0.85, max * 1.1 ])
        .range([attr_area.height - 2 * attr_area.marginY, 0]);

    // создание осей
    let axisX = d3.axisBottom(scaleX); // горизонтальная
    let axisY = d3.axisLeft(scaleY); // вертикальная

    // отрисовка осей в SVG-элементе
    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, 
                                      ${attr_area.height - attr_area.marginY})`)
        .call(axisX)
        .selectAll("text") // подписи на оси - наклонные
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", d => "rotate(-45)");

    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .call(axisY);

    return [scaleX, scaleY]
}

function createChart(svg, data, scaleX, scaleY, attr_area, color) {
    const r = 4;
    const showMax = d3.select('#showMax').property("checked");
    const showMin = d3.select('#showMin').property("checked");

    if (showMax && !showMin) {
        svg.selectAll(".dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", r)
            .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .attr("cy", d => scaleY(d.values[1]))
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
            .style("fill", color);
    } else if (showMin && !showMax) {
        svg.selectAll(".dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", r)
            .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .attr("cy", d => scaleY(d.values[0]))
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
            .style("fill", "blue");
    } else if (showMax && showMin) {
        svg.selectAll(".dot-min")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", r)
            .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .attr("cy", d => scaleY(d.values[0]) - 2)
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
            .style("fill", "blue");

        svg.selectAll(".dot-max")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", r)
            .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .attr("cy", d => scaleY(d.values[1]))
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
            .style("fill", color);
    }
}

function createHistogram(svg, data, scaleX, scaleY, attr_area, color) {
    const showMax = d3.select('#showMax').property("checked");
    const showMin = d3.select('#showMin').property("checked");

    const barWidth = scaleX.bandwidth() * 0.3;

    if (showMax && !showMin) {
        svg.selectAll(".bar-max")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() * 0.35) // центрирование столбца
            .attr("y", d => scaleY(d.values[1]))
            .attr("width", barWidth)
            .attr("height", d => attr_area.height - 2 * attr_area.marginY - scaleY(d.values[1]))
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
            .style("fill", color);
    } else if (showMin && !showMax) {
        svg.selectAll(".bar-min")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() * 0.35)
            .attr("y", d => scaleY(d.values[0]))
            .attr("width", barWidth)
            .attr("height", d => attr_area.height - 2 * attr_area.marginY - scaleY(d.values[0]))
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
            .style("fill", "blue");
    } else if (showMax && showMin) {
        svg.selectAll(".bar-max")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => scaleX(d.labelX) + scaleX  / 2 - barWidth)
            .attr("y", d => scaleY(d.values[1]))
            .attr("width", barWidth)
            .attr("height", d => attr_area.height - 2 * attr_area.marginY - scaleY(d.values[1]))
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
            .style("fill", color);

        svg.selectAll(".bar-min")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
            .attr("y", d => scaleY(d.values[0]))
            .attr("width", barWidth)
            .attr("height", d => attr_area.height - 2 * attr_area.marginY - scaleY(d.values[0]))
            .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
            .style("fill", "blue");
    }
}
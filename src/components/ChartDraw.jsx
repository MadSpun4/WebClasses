import * as d3 from "d3";
import { useEffect, useRef, useState, useMemo } from "react";

const ChartDraw = ({ data, oy, graphType }) => {
	const chartRef = useRef(null);
	
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

    const [showMax, showMin] = oy;

	// заносим в состояния ширину и высоту svg-элемента
	useEffect(() => {
        const svg = d3.select(chartRef.current);      
        setWidth(parseFloat(svg.style('width')));
		setHeight(parseFloat(svg.style('height')));
    });

	// задаем отступы в svg-элементе
	const margin = {
		top: 10, 
		bottom: 60, 
		left: 40, 
		right: 10
	};
		
	// вычисляем ширину и высоту области для вывода графиков
    const boundsWidth = width - margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;

    // диаграмма для максимальных значений
	const [minY, maxY] = useMemo(() => {
        let vals = [];
        if (showMax) vals = vals.concat(data.map(d => d.values[1]));
        if (showMin) vals = vals.concat(data.map(d => d.values[0]));
        return d3.extent(vals);
    }, [data, showMax, showMin]);
		
	// формируем шкалы для осей
    const scaleX = useMemo(() => {
        return d3
            .scaleBand()
            .domain(data.map(d => d.labelX))
            .range([0, boundsWidth])
    }, [data, boundsWidth]);
  
    const scaleY = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([minY * 0.85, maxY * 1.1 ])
            .range([boundsHeight, 0])
    }, [boundsHeight, minY, maxY]);

	useEffect(() => {
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();
        
        // рисуем оси
        const xAxis = d3.axisBottom(scaleX);     
        svg.append("g")
           .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
           .call(xAxis)
           .selectAll("text") 
           .style("text-anchor", "end")
           .attr("dx", "-.8em")
           .attr("dy", ".15em")
           .attr("transform", "rotate(-30)");

        const yAxis = d3.axisLeft(scaleY);
        svg.append("g")
           .attr("transform", `translate(${margin.left}, ${margin.top})`)
           .call(yAxis);
        
        //рисуем график
        if (graphType === 'dotted') {
            if (showMax && showMin) {
              // минимальные
              svg.selectAll('.dot-min')
                .data(data)
                .enter()
                .append('circle')
                .attr('class', 'dot-min')
                .attr('r', 5)
                .attr('cx', d => scaleX(d.labelX) + scaleX.bandwidth()/2 + margin.left)
                .attr('cy', d => scaleY(d.values[0]) + margin.top - 2)
                .style('fill', 'blue');
              // максимальные
              svg.selectAll('.dot-max')
                .data(data)
                .enter()
                .append('circle')
                .attr('class', 'dot-max')
                .attr('r', 5)
                .attr('cx', d => scaleX(d.labelX) + scaleX.bandwidth()/2 + margin.left)
                .attr('cy', d => scaleY(d.values[1]) + margin.top)
                .style('fill', 'red');
            } else if (showMax) {
              svg.selectAll('.dot-max')
                .data(data)
                .enter()
                .append('circle')
                .attr('class', 'dot-max')
                .attr('r', 5)
                .attr('cx', d => scaleX(d.labelX) + scaleX.bandwidth()/2 + margin.left)
                .attr('cy', d => scaleY(d.values[1]) + margin.top)
                .style('fill', 'red');
            } else {
              svg.selectAll('.dot-min')
                .data(data)
                .enter()
                .append('circle')
                .attr('class', 'dot-min')
                .attr('r', 5)
                .attr('cx', d => scaleX(d.labelX) + scaleX.bandwidth()/2 + margin.left)
                .attr('cy', d => scaleY(d.values[0]) + margin.top)
                .style('fill', 'blue');
            }
          } else if (graphType === 'histogram') {
            const barWidth = scaleX.bandwidth() * 0.3;
            
            if (showMax && showMin) {
              svg.selectAll('.bar-max')
                .data(data)
                .enter()
                .append('rect')
                .attr('class','bar-max')
                .attr('x', d => margin.left + scaleX(d.labelX) + scaleX.bandwidth() / 2 - barWidth)
                .attr('y', d => margin.top + scaleY(d.values[1]))
                .attr('width', barWidth)
                .attr('height', d => boundsHeight - scaleY(d.values[1]))
                .style('fill','red');

              svg.selectAll('.bar-min')
                .data(data)
                .enter()
                .append('rect')
                .attr('class','bar-min')
                .attr('x', d => margin.left + scaleX(d.labelX) + scaleX.bandwidth() / 2)
                .attr('y', d => margin.top + scaleY(d.values[0]))
                .attr('width', barWidth)
                .attr('height', d => boundsHeight - scaleY(d.values[0]))
                .style('fill','blue');
            } else if (showMax) {
              const offset = (scaleX.bandwidth() - barWidth) / 2;
              svg.selectAll('.bar-max')
                .data(data)
                .enter()
                .append('rect')
                .attr('class','bar-max')
                .attr('x', d => margin.left + scaleX(d.labelX) + offset)
                .attr('y', d => margin.top + scaleY(d.values[1]))
                .attr('width', barWidth)
                .attr('height', d => boundsHeight - scaleY(d.values[1]))
                .style('fill','red');
            } else {
              const offset = (scaleX.bandwidth() - barWidth) / 2;
              svg.selectAll('.bar-min')
                .data(data)
                .enter()
                .append('rect')
                .attr('class','bar-min')
                .attr('x', d => margin.left + scaleX(d.labelX) + offset)
                .attr('y', d => margin.top + scaleY(d.values[0]))
                .attr('width', barWidth)
                .attr('height', d => boundsHeight - scaleY(d.values[0]))
                .style('fill','blue');
            }
          }
        }, [data, scaleX, scaleY, width, height, showMax, showMin, graphType]);

    return (
        <svg ref={ chartRef }></svg>
	)
}

export default ChartDraw;
import * as d3 from "d3";
import { useEffect, useRef, useState, useMemo } from "react";

const ChartDraw = ({ data, oy, graphType }) => {
	const chartRef = useRef(null);
	
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

    const [showMin, showAvg, showMax] = oy;

	// заносим в состояния ширину и высоту svg-элемента
	useEffect(() => {
      const svg = d3.select(chartRef.current);      
      setWidth(parseFloat(svg.style('width')));
    setHeight(parseFloat(svg.style('height')));
  }, [setWidth]);

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
        if (showMin) vals = vals.concat(data.map(d => d.values[0]));
        if (showAvg) vals = vals.concat(data.map(d => d.values[1]));
        if (showMax) vals = vals.concat(data.map(d => d.values[2]));
        return d3.extent(vals);
      }, [data, showMin, showAvg, showMax]);
		
	// формируем шкалы для осей
    const scaleX = useMemo(() => {
        return d3
            .scaleBand()
            .domain(data.map(d => d.labelX))
            .range([0, boundsWidth])
            .padding(0.1);
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
    
        if (graphType === 'dotted') {
          if (showMin) {
            svg.selectAll('.dot-min')
              .data(data)
              .enter()
              .append('circle')
              .attr('class', 'dot-min')
              .attr('r', 5)
              .attr('cx', d => scaleX(d.labelX) + scaleX.bandwidth() / 2 + margin.left)
              .attr('cy', d => scaleY(d.values[0]) + margin.top - 2)
              .style('fill', 'blue');
          }
          if (showAvg) {
            svg.selectAll('.dot-avg')
              .data(data)
              .enter()
              .append('circle')
              .attr('class', 'dot-avg')
              .attr('r', 5)
              .attr('cx', d => scaleX(d.labelX) + scaleX.bandwidth() / 2 + margin.left)
              .attr('cy', d => scaleY(d.values[1]) + margin.top + 2)
              .style('fill', 'green');
          }
          if (showMax) {
            svg.selectAll('.dot-max')
              .data(data)
              .enter()
              .append('circle')
              .attr('class', 'dot-max')
              .attr('r', 5)
              .attr('cx', d => scaleX(d.labelX) + scaleX.bandwidth() / 2 + margin.left)
              .attr('cy', d => scaleY(d.values[2]) + margin.top)
              .style('fill', 'red');
          }
        } else if (graphType === 'histogram') {
          const numBars = [showMin, showAvg, showMax].filter(Boolean).length;
          const barWidth = scaleX.bandwidth() / numBars;
    
          let offsetIndex = 0;
          if (showMin) {
            svg.selectAll('.bar-min')
              .data(data)
              .enter()
              .append('rect')
              .attr('class', 'bar-min')
              .attr('x', d => margin.left + scaleX(d.labelX) + offsetIndex * barWidth)
              .attr('y', d => margin.top + scaleY(d.values[0]))
              .attr('width', barWidth)
              .attr('height', d => boundsHeight - scaleY(d.values[0]))
              .style('fill', 'blue');
            offsetIndex++;
          }
          if (showAvg) {
            svg.selectAll('.bar-avg')
              .data(data)
              .enter()
              .append('rect')
              .attr('class', 'bar-avg')
              .attr('x', d => margin.left + scaleX(d.labelX) + offsetIndex * barWidth)
              .attr('y', d => margin.top + scaleY(d.values[1]))
              .attr('width', barWidth)
              .attr('height', d => boundsHeight - scaleY(d.values[1]))
              .style('fill', 'green');
            offsetIndex++;
          }
          if (showMax) {
            svg.selectAll('.bar-max')
              .data(data)
              .enter()
              .append('rect')
              .attr('class', 'bar-max')
              .attr('x', d => margin.left + scaleX(d.labelX) + offsetIndex * barWidth)
              .attr('y', d => margin.top + scaleY(d.values[2]))
              .attr('width', barWidth)
              .attr('height', d => boundsHeight - scaleY(d.values[2]))
              .style('fill', 'red');
          }
        }
      }, [data, scaleX, scaleY, width, height, showMin, showAvg, showMax, graphType, boundsHeight, margin.bottom, margin.top, margin.left]);

    return (
        <svg ref={ chartRef }></svg>
	)
}

export default ChartDraw;
function drawStar(svg) {
    let star = svg.append("g")
        .style("stroke", "black")
        .style("stroke-width", 2)
        .style("fill", "none");

    const outerRadius = 50;
    const numPoints = 5;

    let points = [];
    for (let i = 0; i < numPoints; i++) {
        let angle = (2 * Math.PI / numPoints) * i - Math.PI / 2;
        let x = outerRadius * Math.cos(angle);
        let y = outerRadius * Math.sin(angle);
        points.push({ x: x, y: y });
    }

    for (let i = 0; i < numPoints; i++) {
        let start = points[i];
        let end = points[(i + 2) % numPoints];
        star.append("line")
            .attr("x1", start.x)
            .attr("y1", start.y)
            .attr("x2", end.x)
            .attr("y2", end.y)
            .style("stroke", "red")
            .style("stroke-width", 2);
    }

    star.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", outerRadius)
        .style("stroke", "black")
        .style("stroke-width", 2)
        .style("fill", "none");

    return star;
}

let showTable = (idTable, data) => {
    let table = d3.select("#" + idTable);

    let rows = table
        .selectAll("tr")
        .data(data)
        .enter()
        .append('tr')
        .style("display", "");

    let cells = rows
        .selectAll("td")
        .data(d => Object.values(d))
        .enter()
        .append("td")
        .text(d => d);

    let head = table
        .insert("tr", "tr")
        .selectAll("th")
        .data(d => Object.keys(data[0]))
        .enter()
        .append("th")
        .text(d => d);
}

let deleteTable = (idTable) => {
    d3.select("#" + idTable).selectAll("tr").remove();
}




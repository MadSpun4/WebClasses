function createPathG() {
    const svg = d3.select("svg")
    const width = svg.attr("width")
    const height = svg.attr("height")

    let data = [];
    const padding = 100;
    let posX = padding;
    let posY = height - padding;
    const h = 5;
    while (posY > padding) {
        data.push( {x: posX, y: posY});
        posY -= h;
    }
    while (posX < width - padding) {
        data.push( {x: posX, y: posY});
        posX += h;
    }
    return data
}

function createPathCircle() {
    const svg = d3.select("svg")
    const width = svg.attr("width")
    const height = svg.attr("height")
    let data = [];
    for (let t = Math.PI ; t <= Math.PI * 3; t += 0.1) {
        data.push(
            {
                x: width / 2 + width / 3 * Math.sin(t),
                y: height / 2 + height / 3 * Math.cos(t)
            }
        );
    }
    return data
}

let drawPath = (typePath) => {
    let dataPoints;
    if (typePath == 0) {
        dataPoints = createPathG();
    } else if (typePath == 1) {
        dataPoints = createPathCircle();
    } else if (typePath == 2) {
        dataPoints = createPathTrefoiloid();
    }

    const line = d3.line()
        .x((d) => d.x)
        .y((d) => d.y);
    const svg = d3.select("svg");
    const path = svg.append('path')
        .attr('d', line(dataPoints))
        .attr('stroke', 'black')
        .attr('fill', 'none');

    return path;
}

function createPathTrefoiloid() {
    const svg = d3.select("svg");
    const width = svg.attr("width");
    const height = svg.attr("height");
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 3;
    const r = radius / 4;

    let data = [];
    const step = 0.01;

    for (let t = 0; t <= 2 * Math.PI; t += step) {
        const theta = t;
        const x = centerX + (4 * r * Math.cos(theta) - r * Math.cos(4 * theta));
        const y = centerY + (4 * r * Math.sin(theta) - r * Math.sin(4 * theta));
        data.push({ x, y });
    }

    //data.reverse();

    return data;
}

function translateAlong(path) {
    const length = path.getTotalLength();
    return function() {
        return function(t) {
            const {x, y} = path.getPointAtLength(t * length);
            return `translate(${x},${y})`;
        }
    }
}
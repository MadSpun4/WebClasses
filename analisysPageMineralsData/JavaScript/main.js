const tableButton = document.getElementById("viewTableButton");
const graphButton = document.getElementById("drawGraphButton");
const hideGraphButton = document.getElementById("hideGraphButton");
const graphContainer = document.getElementById("graph-container");
const filterForm = document.getElementById('filter');
const filterInputs = filterForm.getElementsByTagName('input');
const sortForm = document.getElementById('sort');
const sortInputs = sortForm.getElementsByTagName('input');
const checkboxesList = d3.selectAll('input[type="checkbox"]')

let findButton, clearButton, sortButton, resetButton;

for (let i = 0; i < filterInputs.length; i++) {
    if (filterInputs[i].value === "Найти") {
        findButton = filterInputs[i];
    }
    if (filterInputs[i].value === "Очистить фильтры") {
        clearButton = filterInputs[i];
    }
}

for (let i = 0; i < sortInputs.length; i++) {
    if (sortInputs[i].value === "Сортировать") {
        sortButton = sortInputs[i];
    }
    if (sortInputs[i].value === "Сбросить сортировку") {
        resetButton = sortInputs[i];
    }
}

let getCurrentTableData = () => {
    let table = d3.select("#list");

    let rows = table.selectAll("tr")
        .filter((tr, i) => i > 0);

    let keys = Object.keys(mineralsData[0]);

    let tableData = rows.nodes().map(tr => {
        let row = d3.select(tr);
        let cells = row.selectAll("td");

        let rowData = {};

        cells.nodes().map((td, i) => {
            rowData[keys[i]] = d3.select(td).text();
        });

        return rowData;
    });

    return tableData;
};

function checkOYCheckboxes() {
    const checkboxes = d3.selectAll('input[type="checkbox"]').nodes();
    const anyChecked = checkboxes.some(node => node.checked)
    const label = d3.select('#oyLabel');

    if (!anyChecked) {
        label.classed('error', true);
    } else {
        label.classed('error', false);
    }
}

setSortSelects(mineralsData[0], document.getElementById('sort'));

document.addEventListener("DOMContentLoaded", function() {
    showTable('list', mineralsData);
    drawGraph(mineralsData);
})

tableButton.addEventListener("click", function() {
    if (tableButton.value === "Скрыть таблицу") {
        deleteTable('list');
        tableButton.value = "Отрисовать таблицу";
    } else if (tableButton.value === "Отрисовать таблицу") {
        showTable('list', getCurrentTableData());
        tableButton.value = "Скрыть таблицу";
    }
})

graphButton.addEventListener("click", function() {
    drawGraph(getCurrentTableData());
    checkOYCheckboxes();
    graphContainer.classList.remove("hidden");
})

hideGraphButton.addEventListener("click", function() {
    graphContainer.classList.add("hidden");
})

findButton.addEventListener('click', function() {
    filterTable(mineralsData, 'list', filterForm);
    let currentData = getCurrentTableData();
    resetSort('list', currentData, sortForm);
});

clearButton.addEventListener('click', function() {
    clearFilter('list', mineralsData, filterForm);
    resetSort('list', mineralsData, sortForm);
});

document.getElementById('fieldsFirst').addEventListener('change', function() {
    changeNextSelect('fieldsSecond', this);
});

document.getElementById('fieldsSecond').addEventListener('change', function() {
    changeNextSelect('fieldsThird', this);
});

sortButton.addEventListener('click', function() {
    sortTable('list', sortForm);
});

resetButton.addEventListener('click', function() {
    let currentData = getCurrentTableData();
    resetSort('list', currentData, sortForm);
    filterTable(mineralsData, 'list', filterForm);
});

checkboxesList.on('click', function() {
    const checkboxes = d3.selectAll('input[type="checkbox"]').nodes();
    const anyChecked = checkboxes.some(node => node.checked)
    const label = d3.select('#oyLabel');

    if (anyChecked) {
        label.classed('error', false);
    }
});



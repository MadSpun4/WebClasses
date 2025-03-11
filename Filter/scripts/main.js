// main.js

let createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
};

let setSortSelect = (arr, sortSelect) => {
    sortSelect.innerHTML = '';
    sortSelect.append(createOption('Нет', 0));
    for (let i in arr) {
        sortSelect.append(createOption(arr[i], Number(i) + 1));
    }
};

let setSortSelects = (data, dataForm) => {
    let head = Object.keys(data);
    let allSelect = dataForm.getElementsByTagName('select');
    for (let j = 0; j < allSelect.length; j++) {
        setSortSelect(head, allSelect[j]);
        if (j > 0) {
            allSelect[j].disabled = true;
        }
    }
};

let changeNextSelect = (nextSelectId, curSelect) => {
    let nextSelect = document.getElementById(nextSelectId);
    nextSelect.disabled = false;
    nextSelect.innerHTML = curSelect.innerHTML;
    if (curSelect.value != 0) {
        nextSelect.remove(curSelect.value);
    } else {
        nextSelect.disabled = true;
    }
};

let getCurrentTableData = () => {
    let table = document.getElementById('list');
    let allRows = table.rows;
    let rowsArray = Array.from(allRows).slice(1);

    let tableData = [];

    for (let row of rowsArray) {
        let cells = row.cells;
        let cellsArray = Array.from(cells);
        let rowData = {};

        for (let j = 0; j < cellsArray.length; j++) {
            let cellText = cellsArray[j].innerHTML;
            let columnName = Object.keys(buildings[0])[j];
            rowData[columnName] = cellText;
        }
        tableData.push(rowData);
    }

    return tableData;
};

createTable(buildings, 'list');
setSortSelects(buildings[0], document.getElementById('sort'));

const filterForm = document.getElementById('filter');
const filterInputs = filterForm.getElementsByTagName('input');
const sortForm = document.getElementById('sort');
const sortInputs = sortForm.getElementsByTagName('input');

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

findButton.addEventListener('click', function() {
    filterTable(buildings, 'list', filterForm);
    let currentData = getCurrentTableData();
    resetSort('list', currentData, sortForm);
});

clearButton.addEventListener('click', function() {
    clearFilter('list', buildings, filterForm);
    resetSort('list', buildings, sortForm);
});

document.getElementById('fieldsFirst').addEventListener('change', function() {
    changeNextSelect('fieldsSecond', this);
});

sortButton.addEventListener('click', function() {
    sortTable('list', sortForm);
});

resetButton.addEventListener('click', function() {
    let currentData = getCurrentTableData();
    resetSort('list', currentData, sortForm);
    filterTable(buildings, 'list', filterForm);
});
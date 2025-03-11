let createSortArr = (data) => {
    let sortArr = [];
    let sortSelects = data.getElementsByTagName('select');
    for (let i = 0; i < sortSelects.length; i++) {
        let keySort = sortSelects[i].value;
        if (keySort == 0) {
            break;
        }
        let desc = document.getElementById(sortSelects[i].id + 'Desc').checked;
        sortArr.push({
            column: keySort - 1,
            order: desc
        });
    }
    return sortArr;
};

let sortTable = (idTable, data) => {
    let sortArr = createSortArr(data);
    if (sortArr.length === 0) {
        return false;
    }
    let table = document.getElementById(idTable);
    let rowData = Array.from(table.rows);
    rowData.shift(); // удаляем заголовок

    rowData.sort((first, second) => {
        for (let i in sortArr) {
            let key = sortArr[i].column;
            let value1 = first.cells[key].innerHTML;
            let value2 = second.cells[key].innerHTML;

            if (key === 4 || key === 5) { // для года или выосты
                value1 = Number(value1);
                value2 = Number(value2);

                if (sortArr[i].order) {
                    // по убыванию
                    if (value1 > value2) return -1;
                    if (value1 < value2) return 1;
                } else {
                    // по возрастанию
                    if (value1 > value2) return 1;
                    if (value1 < value2) return -1;
                }
            } else {
                if (sortArr[i].order) {
                    // по убыванию
                    if (value1 > value2) return -1;
                    if (value1 < value2) return 1;
                } else {
                    // по возрастанию
                    if (value1 > value2) return 1;
                    if (value1 < value2) return -1;
                }
            }
            if (value1 === value2) continue;
        }
        return 0;
    });

    table.innerHTML = table.rows[0].innerHTML; // Сохраняем заголовок
    rowData.forEach(item => {
        table.append(item);
    });
};

let resetSort = (idTable, data, sortForm) => {
    setSortSelects(buildings[0], sortForm);
    clearTable(idTable);
    createTable(data, idTable);
};

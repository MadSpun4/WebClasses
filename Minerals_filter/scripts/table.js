let createTable = (data, idTable) => {
    let table = document.getElementById(idTable);

    let tr = document.createElement('tr');

    const headers = [
        "Название",
        "Агрегатное состояние",
        "Плотность",
        "Теплопроводность",
        "Электропроводность",
        "Горючесть",
        "Страна"
    ];

    headers.forEach(headerText => {
        let th = document.createElement('th');
        th.innerHTML = headerText;
        tr.append(th);
    });
    table.append(tr);

    data.forEach((item) => {
        let row = document.createElement('tr');
        for (let key in item) {
            let td = document.createElement('td');
            td.innerHTML = item[key];
            row.append(td);
        }
        table.append(row);
    });
};

let clearTable = (idTable) => {
    let table = document.getElementById(idTable);
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
};
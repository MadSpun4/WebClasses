let createTable = (data, idTable) => {
    let table = document.getElementById(idTable);
    
    let tr = document.createElement('tr');
    for (key in data[0]) {
        let th = document.createElement('th');
        th.innerHTML = key;
        tr.append(th);
    }
    table.append(tr);    
    
    data.forEach((item) => {
        let row = document.createElement('tr');
        for (key in item) {
            let td = document.createElement('td');
            td.innerHTML = item[key];
            row.append(td);
        }
        table.append(row);
    });    
}

let clearTable = (idTable) => {
    let table = document.getElementById(idTable);
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
}
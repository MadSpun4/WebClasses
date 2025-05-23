let correspond = {
    "Название": "name",
    "Агрегатное состояние": "aggregation",
    "Плотность": ["densityFrom", "densityTo"],
    "Теплопроводность": ["thermal_conductivityFrom", "thermal_conductivityTo"],
    "Электропроводность": ["electrical_conductivityFrom", "electrical_conductivityTo"],
    "Горючесть": "flammability",
    "Страна": "country"
};

let dataFilter = (dataForm) => {
    let dictFilter = {};

    for (let j = 0; j < dataForm.elements.length; j++) {
        let item = dataForm.elements[j];
        let valInput = item.value;

        if (item.type === "text") {
            valInput = valInput.toLowerCase();
        } else if (item.type === "number") {
            if (valInput === "") {
                if (item.id.includes("From")) {
                    valInput = -Infinity;
                } else if (item.id.includes("To")) {
                    valInput = Infinity;
                }
            } else {
                valInput = Number(valInput);
            }
        }

        if (item.id) {
            dictFilter[item.id] = valInput;
        }
    }
    return dictFilter;
};

let filterTable = (data, idTable, dataForm) => {
    let datafilter = dataFilter(dataForm);

    let tableFilter = data.filter(item => {
        let result = true;

        for (let key in item) {
            let val = item[key];
            let filterKey = correspond[key];

            if (typeof filterKey === "string") {
                let filterValue = datafilter[filterKey];
                if (filterValue && filterValue !== "0") {
                    val = val.toLowerCase();
                    result = result && val.indexOf(filterValue) !== -1;
                }
            } else if (Array.isArray(filterKey)) {
                let from = datafilter[filterKey[0]];
                let to = datafilter[filterKey[1]];

                let numericVal = Number(val);

                if (from !== undefined && to !== undefined) {
                    result = result && numericVal >= from && numericVal <= to;
                }
            }
        }
        return result;
    });

    deleteTable(idTable);
    showTable(idTable, tableFilter);
};

let clearFilter = (idTable, data, dataForm) => {
    dataForm.reset();
    deleteTable(idTable);
    showTable(idTable, data);
};
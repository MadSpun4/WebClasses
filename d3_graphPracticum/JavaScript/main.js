const tableButton = document.getElementById("viewTableButton");
const graphButton = document.getElementById("drawGraphButton");

document.addEventListener("DOMContentLoaded", function() {
    showTable('build', buildings);
    drawGraph(buildings);
})

tableButton.addEventListener("click", function() {
    if (tableButton.value === "Скрыть таблицу") {
        deleteTable('build');
        tableButton.value = "Отрисовать таблицу";
    } else if (tableButton.value === "Отрисовать таблицу") {
        showTable('build', buildings);
        tableButton.value = "Скрыть таблицу";
    }
})

graphButton.addEventListener("click", function() {
    drawGraph(buildings);
})


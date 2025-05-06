import TableHead from './TableHead.jsx';
import TableBody from './TableBody.jsx';
import Filter from './Filter.jsx';
import { useState } from "react";

/*
    компонент, выводящий на страницу таблицу 
    пропсы:
      data - данные для таблицы в виде массива объектов
*/

const Table = ({ data, amountRows, showPagination = true, setFilteredData, fullData }) => {
    const [activePage, setActivePage] = useState("1");

    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    const updateDataTable = (value) => {
        setFilteredData(value);
        setActivePage("1");
    };

    const isPaginationEnabled = showPagination && data.length > amountRows;

    const n = isPaginationEnabled ? Math.ceil(data.length / amountRows) : 1;
    
    const arr = isPaginationEnabled ? Array.from({ length: n }, (v, i) => i + 1) : [];
    
    const pages = arr.map(index => (
        <span
            key={index}
            className={index.toString() === activePage.toString() ? 'active-page' : ''}
            onClick={changeActive}
        >
            {index}
        </span>
    ));

    const finalAmountRows = isPaginationEnabled ? amountRows : data.length;

    return( 
        <>
            <h4>Фильтры</h4>
            <Filter filtering={updateDataTable} data={data} fullData={fullData} />
            
            <table>
                <TableHead head={Object.keys(fullData[0])} />
                <TableBody body={data} amountRows={finalAmountRows} numPage={activePage} />
            </table>

            {isPaginationEnabled && (
                <div className="pages">
                    {pages}
                </div>
            )}
        </>   
    );   
}

export default Table;
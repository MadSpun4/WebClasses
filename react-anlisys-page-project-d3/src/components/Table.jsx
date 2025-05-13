import TableHead from './TableHead.jsx';
import TableBody from './TableBody.jsx';
import Filter from './Filter.jsx';
import Sort from './Sort.jsx';
import Chart from './Chart.jsx';
import { useState } from "react";

const Table = ({ data, amountRows, showPagination = true, setFilteredData, filteredData }) => {
    const [activePage, setActivePage] = useState("1");

    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    const isPaginationEnabled = showPagination && filteredData.length > amountRows;

	// количество страниц разбиения таблицы
    const n = isPaginationEnabled ? Math.ceil(filteredData.length / amountRows) : 1;
    
    // массив с номерами страниц
    const arr = isPaginationEnabled ? Array.from({ length: n }, (v, i) => i + 1) : [];
    
    // формируем совокупность span с номерами страниц
    const pages = arr.map(index => (
        <span
            key={index}
            className={index.toString() === activePage.toString() ? 'active-page' : ''}
            onClick={ changeActive }
        >
            {index}
        </span>
        )
    );

    const finalAmountRows = isPaginationEnabled ? amountRows : data.length;

    return( 
        <>
            <div className='wrapper'>
                <Filter filtering={ setFilteredData } fullData={ data } />
                <Sort data={ filteredData } setFilteredData={ setFilteredData } fullData={ data } />
            </div>
            
            <Chart data={ filteredData } />
            <table>
                <TableHead head={Object.keys(data[0])} />
                <TableBody body={ filteredData } amountRows={ finalAmountRows } numPage={ activePage } />
            </table>

            {isPaginationEnabled && (
                <div className="pages">
                    {pages}
                </div>
            )}
        </>
    )   
}

export default Table;
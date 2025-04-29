import TableHead from './TableHead.jsx';
import TableBody from './TableBody.jsx';
import Filter from './Filter.jsx';
import Sort from './Sort.jsx';
import { useState } from "react";

const Table = ({ data, amountRows, showPagination = true }) => {
    const [activePage, setActivePage] = useState("1");
    const [filteredData, setFilteredData] = useState(data);
    //const [filteredData, setfilteredData] = useState(data);

    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    const updateFilteredData = (value) => {
        setFilteredData(value);
        //setfilteredData(value);
        setActivePage("1");
    };

    // const updatefilteredData = (value) => {
    //     setFilteredData(value);
    //     setActivePage("1");
    // };

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
                <Filter filtering={ updateFilteredData } fullData={data} />
                <Sort data={filteredData} setFilteredData={ updateFilteredData } fullData={data} />
            </div>

            <table>
                <TableHead head={Object.keys(data[0])} />
                <TableBody body={filteredData} amountRows={finalAmountRows} numPage={activePage} />
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
import './CSS/App.css';
import mineralsData from './data.js';
import Table from './components/Table.jsx';
import Chart from './components/Chart.jsx';

import { useState } from 'react';


function App() {
  const [filteredData, setFilteredData] = useState(mineralsData);
  
  return (
    <div className="App">
        <h1>Полезные ископаемые</h1>
        <Table 
          data={ mineralsData }
          amountRows="15"
          showPagination={ true }
          setFilteredData={ setFilteredData }
          filteredData={ filteredData }
        />
    </div>
  );
}

export default App;

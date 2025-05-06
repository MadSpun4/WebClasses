import './CSS/App.css';
import buildings from './data.js';
import Table from './components/Table.jsx';
import Chart from './components/Chart.jsx';
import { useState } from 'react';

function App() {
  const [filteredData, setFilteredData] = useState(buildings);

  return (
    <div className="App">
      <h3>Самые высокие здания и сооружения</h3>
      <Chart data={ filteredData } />
      <Table
        data={ filteredData }
        amountRows="15"
        showPagination={true} 
        setFilteredData={setFilteredData}
        fullData={buildings} />
      
    </div>
  );
}

export default App;

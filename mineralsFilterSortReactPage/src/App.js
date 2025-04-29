import './CSS/App.css';
import mineralsData from './data.js';
import Table from './components/Table.jsx';

function App() {
  return (
    <div className="App">
        <h1>Полезные ископаемые</h1>
        <Table data={ mineralsData } amountRows="15" showPagination={true} />
      
    </div>
  );
}

export default App;

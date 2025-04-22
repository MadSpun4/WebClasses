import './CSS/App.css';
import buildings from './data.js';
import Table from './components/Table.jsx';
import Testwork from './components/Testwork.jsx';


function App() {
  return (
    <div className="App">
      <Testwork list={ ["Владлена", "Влад", "Артём", "Антон", "Рома"] } />
      <h3>Самые высокие здания и сооружения</h3>
      <Table data={ buildings } amountRows="15" showPagination={true} />
      
    </div>
  );
}

export default App;

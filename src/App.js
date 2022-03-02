import './style/main.css';

//import './App.css';
import Busqueda from './components/Busqueda';
import TableAuthors from './components/table/TableAuthors';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <TableAuthors></TableAuthors>
      </header>
    </div>
  );
}

export default App;

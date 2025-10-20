import logo from './logo.svg';
import './App.css';
import CarrerasUniversitarias from './pages/Carreras'; 
import Headerx from './components/header'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Headerx/>
        <CarrerasUniversitarias />
      </header>
    </div>
  );
}

export default App;

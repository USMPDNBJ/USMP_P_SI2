import logo from './logo.svg';
import './App.css';
import Headerx from './components/header';
import Inicio, { ProtocoloEntrada, ProtocoloEntradaNo, ProtocoloEntradaSi, TiempoEspera } from './pages/Inicio';
import Proto from './pages/Inicio';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarrerasUniversitarias from './pages/Carreras';

function App() {
  return (
    <div className="App">
        <header className="App-header">
          <Headerx />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/protEntr" element={<ProtocoloEntrada />} />
            <Route path="/derivacion" element={<CarrerasUniversitarias />} />
            <Route path="/derivarAsesor" element={<TiempoEspera />} />
            <Route path="/protEntrNo" element={<ProtocoloEntradaNo />} />
            <Route path="/protEntrSi" element={<ProtocoloEntradaSi />} />
          </Routes>
        </header>
    </div>

  );
}

export default App;

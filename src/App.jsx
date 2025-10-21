import logo from './logo.svg';
import './App.css';
import Headerx from './components/header';
import Inicio, { ProtocoloEntrada, ProtocoloEntradaNo, ProtocoloEntradaSi, TiempoEspera } from './pages/Inicio';
import Proto from './pages/Inicio';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarrerasUniversitarias from './pages/Carreras';
import Carrera from './pages/Derivacion';
import React, { useState, useEffect } from 'react';

function App() {
  const [initialCareers, setCareers] = useState([]);
  useEffect(() => {
    const storageKey = 'careersList';
    const stored = localStorage.getItem(storageKey);

    if (stored) {
      // Si ya existe, parseamos y usamos eso
      setCareers(JSON.parse(stored));
    } else {
      // Si no existe, guardamos los datos iniciales y los usamos
      const initialCareers = [
        [
          { name: 'DERECHO', id: 1 },
          { name: 'MARKETING', id: 2 },
          { name: 'MEDICINA HUMANA', id: 3 },
          { name: 'ADMINISTRACIÓN', id: 4 },
          { name: 'NEGOCIOS INTERNACIONALES', id: 5 },
          { name: 'CIENCIAS AERONÁUTICAS', id: 6 },
          { name: 'ING. COMPUTACIÓN Y SISTEMAS', id: 7 },
          { name: 'ING. INDUSTRIAL', id: 8 },
          { name: 'ENFERMERÍA', id: 9 },
          { name: 'ING. CIVIL', id: 10 },
          { name: 'OBSTETRICIA', id: 11 },
          { name: 'ARQUITECTURA', id: 12 },
          { name: 'PSICOLOGÍA', id: 13 },
          { name: 'INTELIGENCIA ARTIFICIAL', id: 14 },
          { name: 'ING. CIENCIA DE DATOS', id: 15 },
          { name: 'ODONTOLOGÍA', id: 16 },
        ],
        [
          { name: 'ECONOMÍA', id: 17 },
          { name: 'CIBERSEGURIDAD Y ANÁLISIS FORENSE DIGITAL', id: 18 },
          { name: 'TURISMO Y HOTELERÍA', id: 19 },
          { name: 'CIENCIAS DE LA COMUNICACIÓN', id: 20 },
          { name: 'GESTIÓN DE RECURSOS HUMANOS', id: 21 },
        ],
      ];
      localStorage.setItem(storageKey, JSON.stringify(initialCareers));
      setCareers(initialCareers);
    }
  }, []);
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
          <Route path="/carrera/:nombre" element={<Carrera />} />
        </Routes>
      </header>
    </div>

  );
}

export default App;

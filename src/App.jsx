import logo from './logo.svg';
import './App.css';
import Headerx from './components/header';
import Inicio from './pages/Inicio';
import { ChatInicio, ChatProtocolIn, ChatProtocolInNo, ChatProtocolInSi, TiempoEspera } from './pages/Chat';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarrerasUniversitarias from './pages/Carreras';
import Carrera, { Llamada } from './pages/Derivacion';
import React, { useState, useEffect } from 'react';
import Preguntar, { ChatSolicitud, LlamadaSolicitud, Solicitud } from './pages/Solicitud';
import LlamadaInicio, { LlamadaDesicion, LlamadaProtocolInNo, LlamadaProtocolInSi } from './pages/Llamada';
import { carrerasJS } from './assets/ListaCarreras';

function App() {
  const [initialCareers, setCareers] = useState([]);
  useEffect(() => {
    const storageKey = 'careersList';
    const stored = localStorage.getItem(storageKey);

    const initialCareers = carrerasJS;
    var x = JSON.parse(stored);
    if (stored && x === initialCareers) {
      setCareers(JSON.parse(stored));
    } else {
      // Si no existe, guardamos los datos iniciales y los usamos

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
          <Route path="/chatInicio" element={<ChatInicio />} />
          <Route path="/LlamadaDesicion" element={<LlamadaDesicion />} />
          <Route path="/LlamadaInicio" element={<LlamadaInicio />} />
          <Route path="/LlamadaProtocolInNo" element={<LlamadaProtocolInNo />} />
          <Route path="/llamada/:nombre" element={<Llamada />} />
          <Route path="/protEntr" element={<ChatProtocolIn />} />
          <Route path="/derivacion" element={<CarrerasUniversitarias />} />
          <Route path="/derivarAsesor" element={<TiempoEspera />} />
          <Route path="/protEntrNo" element={<ChatProtocolInNo />} />
          <Route path="/protEntrSi" element={<ChatProtocolInSi />} />
          <Route path="/carrera/:nombre" element={<Carrera />} />
          <Route path="/preguntar/:nombre" element={<Preguntar />} />
          <Route path="/solicitud/:nombre" element={<ChatSolicitud />} />
          <Route path="/solicitudLlam/:nombre" element={<LlamadaSolicitud />} />
        </Routes>
      </header>
    </div>

  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import Headerx from './components/header';
import Inicio from './pages/Inicio';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Carrera from './pages/Carrera';
import React, { useState, useEffect } from 'react';
import LlamadaInicio, { Llamada, Modalidades, Modalidades2 } from './pages/Llamada/Llamada';
import { carrerasJS } from './assets/ListaCarreras';
import { ChatProtocolIn } from './pages/Mensajeria/ProtocoloEntrada';
import ChatInicio, { Chat } from './pages/Mensajeria/Chat';

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
          //*CHAT
          <Route path="/chatInicio" element={<ChatInicio />} />
          <Route path="/protEntr" element={<ChatProtocolIn />} />          
          <Route path="/carrera/:nombre" element={<Carrera />} />
          //*LLAMADA
          <Route path="/LlamadaInicio" element={<LlamadaInicio />} />
          <Route path="/llamada/:nombre" element={<Llamada />} />
          <Route path="/modalidades" element={<Modalidades />} />
          <Route path="/modalidades2/:id" element={<Modalidades2 />} />
        </Routes>
      </header>
    </div>

  );
}

export default App;

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

function App() {
  const [initialCareers, setCareers] = useState([]);
  useEffect(() => {
    const storageKey = 'careersList';
    const stored = localStorage.getItem(storageKey);

    const initialCareers = [
      [
        {
          descripcion1: "⚖️ ¡Defiende la justicia y transforma la sociedad con Derecho en la USMP! Conviértete en un profesional con visión crítica, ética y compromiso social, capaz de interpretar y aplicar las leyes para resolver los grandes retos del mundo jurídico.",
          asesor: "JOICE",
          name: 'DERECHO',
          id: 1
          , beneficios: '✅ Plan de estudios sólido y actualizado, con cursos de especialidad desde los primeros ciclos \n ✅ Sala de simulación de litigio, donde desarrollarás oratoria y práctica real de procesos judiciales.✅ Sociedad de Debates, que te forma en pensamiento crítico y liderazgo político académico.✅ Más de 30 centros de estudios e investigación, que potencian tu formación académica.✅ Infraestructura moderna, con auditorios, aulas especializadas y espacios para debates y foros internacionales.✅ Convenios internacionales que te permiten realizar intercambios y pasantías en América, Europa y Asia.'
          , perfil: '• Abogados litigantes en diversas ramas del Derecho.• Asesores jurídicos en empresas, organismos públicos y privados.• Magistrados, fiscales o procuradores.• Asesores en organismos internacionales como la OEA.• Consultores en proyectos legales, ambientales y de derechos humanos.'
          , sedes: 'Santa Anita, La Molina, Lima Norte (Comas), Chiclayo y Arequipa'
          , facultad: 'DERECHO'
          , celular: '991 531 262'
          , profesion: 'abogad@'
          , sedesEsp: '• La Molina: Av. Alameda del Corregidor N° 1865 • Santa Anita: Jr. Las Calandrias N° 151 • Comas: Av. Micaela Bastidas, esquina con Av. República de Israel (antes Av. El Porvenir) • Filial Chiclayo: Av. Los Eucaliptos N° 300 – 304, Urb. La Pradera – Pimentel Filial • Arequipa: Urb. Daniel Alcides Carrión, Mz. G Lote 14, José Luis Bustamante y Rivero'
        },
        {
          descripcion1: "",
          asesor: "b ",
          name: 'MARKETING',
          id: 2
          , beneficios: ''
          , perfil: ''
          , sedes: ''
          , facultad: ''
          , celular: ''
          , profesion: ''
          , sedesEsp: ''
        },
        {
          descripcion1: "",
          asesor: "c ",
          name: 'MEDICINA HUMANA',
          id: 3
          , beneficios: ''
          , perfil: ''
          , sedes: ''
          , facultad: ''
          , celular: ''
          , profesion: ''
          , sedesEsp: ''
        },
        {
          descripcion1: "",
          asesor: "d ",
          name: 'ADMINISTRACIÓN',
          id: 4
          , beneficios: ''
          , perfil: ''
          , sedes: ''
          , facultad: ''
          , celular: ''
          , profesion: ''
          , sedesEsp: ''
        },
        {
          descripcion1: "",
          asesor: "e ",
          name: 'NEGOCIOS INTERNACIONALES',
          id: 5
          , beneficios: ''
          , perfil: ''
          , sedes: ''
          , facultad: ''
          , celular: ''
          , profesion: ''
          , sedesEsp: ''
        },
        {
          descripcion1: "",
          asesor: "f ",
          name: 'CIENCIAS AERONÁUTICAS',
          id: 6
          , beneficios: ''
          , perfil: ''
          , sedes: ''
          , facultad: ''
          , celular: ''
          , profesion: ''
          , sedesEsp: ''
        },
        {
          descripcion1: "",
          asesor: "g ",
          name: 'ING. COMPUTACIÓN Y SISTEMAS',
          id: 7
          , beneficios: ''
          , perfil: ''
          , sedes: ''
          , facultad: ''
          , celular: ''
          , profesion: ''
          , sedesEsp: ''
        },
        {
          descripcion1: "",
          asesor: "h ",
          name: 'ING. INDUSTRIAL',
          id: 8
          , beneficios: ''
          , perfil: ''
          , sedes: ''
          , facultad: ''
          , celular: ''
          , profesion: ''
          , sedesEsp: ''
        },
        {
          descripcion1: "",
          asesor: "i ",
          name: 'ENFERMERÍA',
          id: 9
          , beneficios: ''
          , perfil: ''
          , sedes: ''
          , facultad: ''
          , celular: ''
          , profesion: ''
          , sedesEsp: ''
        },
        {
          descripcion1: "",
          asesor: "j ",
          name: 'ING. CIVIL',
          id: 10
          , beneficios: ''
          , perfil: ''
          , sedes: ''
          , facultad: ''
          , celular: ''
          , profesion: ''
          , sedesEsp: ''
        },
        {
          descripcion1: "",
          asesor: "k ",
          name: 'OBSTETRICIA',
          id: 11
          , beneficios: ''
          , perfil: ''
          , sedes: ''
          , facultad: ''
          , celular: ''
          , profesion: ''
          , sedesEsp: ''
        },
        {
          descripcion1: "",
          asesor: "z ",
          name: 'ARQUITECTURA',
          id: 12
          , beneficios: ''
          , perfil: ''
          , sedes: ''
          , facultad: ''
          , celular: ''
          , profesion: ''
          , sedesEsp: ''
        },
        {
          descripcion1: "",
          asesor: "z ",
          name: 'PSICOLOGÍA',
          id: 13
          , beneficios: ''
          , perfil: ''
          , sedes: ''
          , facultad: ''
          , celular: ''
          , profesion: ''
          , sedesEsp: ''
        },
        {
          descripcion1: "",
          asesor: "z ",
          name: 'INTELIGENCIA ARTIFICIAL',
          id: 14
          , beneficios: ''
          , perfil: ''
          , sedes: ''
          , facultad: ''
          , celular: ''
          , profesion: ''
          , sedesEsp: ''
        },
        {
          descripcion1: "",
          asesor: "z ",
          name: 'ING. CIENCIA DE DATOS',
          id: 15
          , beneficios: ''
          , perfil: ''
          , sedes: ''
          , facultad: ''
          , celular: ''
          , profesion: ''
          , sedesEsp: ''
        },
        {
          descripcion1: "",
          asesor: "z ",
          name: 'ODONTOLOGÍA',
          id: 16
          , beneficios: ''
          , perfil: ''
          , sedes: ''
          , facultad: ''
          , celular: ''
          , profesion: ''
          , sedesEsp: ''
        },
      ],
      [
        {
          asesor: "z ",
          name: 'ECONOMÍA',
          id: 17
          , beneficios: ''
          , perfil: ''
          , sedes: ''
          , facultad: ''
          , celular: ''
          , profesion: ''
          , sedesEsp: ''
        },
        {
          asesor: "z ",
          name: 'CIBERSEGURIDAD Y ANÁLISIS FORENSE DIGITAL',
          id: 18
          , beneficios: ''
          , perfil: ''
          , sedes: ''
          , facultad: ''
          , celular: ''
          , profesion: ''
          , sedesEsp: ''
        },
        {
          asesor: "z ",
          name: 'TURISMO Y HOTELERÍA',
          id: 19
          , beneficios: ''
          , perfil: ''
          , sedes: ''
          , facultad: ''
          , celular: ''
          , profesion: ''
          , sedesEsp: ''
        },
        {
          asesor: "z ",
          name: 'CIENCIAS DE LA COMUNICACIÓN',
          id: 20
          , beneficios: ''
          , perfil: ''
          , sedes: ''
          , facultad: ''
          , celular: ''
          , profesion: ''
          , sedesEsp: ''
        },
        {
          asesor: "z ",
          name: 'GESTIÓN DE RECURSOS HUMANOS',
          id: 21
          , beneficios: ''
          , perfil: ''
          , sedes: ''
          , facultad: ''
          , celular: ''
          , profesion: ''
          , sedesEsp: ''
        },
      ],
    ];
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


import React, { useState, useEffect } from 'react';
import SidebarNumeros from '../components/SidebarNumeros'; // ajusta la ruta si es necesario
import Button1 from '../components/button1';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Carrera() {
  const { id } = useParams();
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    const storedCareers = JSON.parse(localStorage.getItem('careersList')) || [];
    setCareers(storedCareers);
  }, []);

  const career = careers.find(career => career.id === parseInt(id));

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 my-20">
      <div className="max-w-3xl w-full px-4">
        <h1 className="text-4xl text-center font-bold text-gray-800 mb-6">
          3. SALUDO DEL ASESOR Y FORTALEZAS DE LA CARRERA
        </h1>
        <p className="text-2xl text-gray-600 mb-6">
          👋 ¡Hola! Te saluda Joice, asesora de admisión de la USMP
          Quiero contarte un poco sobre una de nuestras carreras más representativas: ({career?.name || 'Carrera no encontrada'}) ⚖
        </p>
        <p className="text-2xl text-gray-600 mb-6">
          ✨ ¡Defiende la justicia y transforma la sociedad estudiando {career?.name || 'Carrera no encontrada'} en la USMP! 💪
        </p>
        <p className="text-2xl text-gray-600 mb-6">
          Aquí podrás convertirte en un profesional con visión crítica, ética y compromiso social,
          capaz de interpretar y aplicar las leyes para resolver los grandes retos del mundo jurídico.
        </p>
      </div>

      <SidebarNumeros />
    </div>
  );
}
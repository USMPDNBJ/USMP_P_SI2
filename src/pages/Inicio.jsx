
import React, { useState, useEffect } from 'react';
import SidebarNumeros from '../components/SidebarNumeros'; // ajusta la ruta si es necesario
import Button1 from '../components/button1';
import { useNavigate } from 'react-router-dom';

export default function Inicio() {
  const navigate = useNavigate();
  const ChatInicio = () => {
    navigate('/chatInicio');
  };
  const LlamadaInicio = () => {
    navigate('/LlamadaInicio');
  };

  return (
    <div className="h-auto min-h-[70vh] bg-white my-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12 tracking-tight">
          SELECCIONE MEDIO DE COMUNICACIÓN
        </h1>
        <div className='flex flex-col items-center gap-4'>
          <Button1 nombre='Chat Mensajería' onClick={ChatInicio} />
          <Button1 nombre='Llamada Telefónica' />
        </div>
      </div>
    </div>
  );
}


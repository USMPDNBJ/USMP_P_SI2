import React, { useState, useEffect } from 'react';
import SidebarNumeros, { ButtonHome, ButtonReiniciar } from '../components/SidebarNumeros'; // ajusta la ruta si es necesario
import Button1 from '../components/button1';
import { useNavigate } from 'react-router-dom';

export default function ChatInicio() {
  const navigate = useNavigate();
  const ProtocoloEntrada = () => {
    navigate('/protEntr');
  };
  const routex = 'carrera';
  const careerId = sessionStorage.getItem('careerId');
  const routes = {
    1: '/carrerasUnivChat',
    2: '/carrera/' + careerId,
    3: '/preguntar/' + careerId,
    4: '/solicitud/' + careerId,
  };
  return (
    <div className="h-auto min-h-[70vh] bg-white">
      <div className='fixed top-[25vh] right-0 w-16'>
        <ButtonReiniciar />
      </div>
      <div className="relative top-32 max-w-7xl mx-auto">
        {/* Header */}
        <h1 className=" text-5xl md:text-5xl font-bold text-center text-red-700 mb-12 tracking-tight">
          CHAT MENSAJERÍA
        </h1>
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12 tracking-tight">
          SELECCIONE UNA OPCIÓN
        </h1>
        <div className='flex flex-col items-center gap-4'>
          <Button1 nombre='Protocolo de Entrada' onClick={ProtocoloEntrada} />
          <Button1 nombre='Derivación'
            onClick={() => navigate('/carrerasUnivChat')}
          />
        </div>

      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import SidebarNumeros, { ButtonHome, ButtonReiniciar } from '../../components/SidebarNumeros'; // ajusta la ruta si es necesario
import Button1 from '../../components/button1';
import { useNavigate } from 'react-router-dom';
import { ChatProtocolIn } from './ProtocoloEntrada';
import CarrerasUnivChat from './Derivacion';

export default function ChatInicio() {
  const navigate = useNavigate();
  const [pregunta1, setPregunta1] = useState(null);
  const [pregunta2, setPregunta2] = useState(null);
  const Asesor = () => {
    sessionStorage.setItem('emisor', 'asesor');
    setPregunta1('asesor');
  };
  const Postulante = () => {
    sessionStorage.setItem('emisor', 'postulante');
    setPregunta1('postulante');
  };
  return (
    <div className="h-auto min-h-[70vh] bg-white">
      <div className=" max-w-7xl mx-auto">
        {/* Header */}
        <h1 className=" text-5xl md:text-5xl font-bold text-center text-red-800 mb-12 tracking-tight mt-14">
          CHAT MENSAJERÍA
        </h1>
        <h1 className="text-3xl md:text-3xl font-bold text-center text-red-700 mb-12 tracking-tight">
          1. ¿QUIÉN SE COMUNICÓ?
        </h1>
        <div className='flex justify-center gap-4'>
          <Button1 nombre='ASESOR' onClick={Asesor} colorC={`text-[20px] ${pregunta1 === 'asesor' ? 'bg-red-700 text-white' : 'bg-white text-zinc-900'}`} />
          <Button1 nombre='POSTULANTE' onClick={Postulante} colorC={`text-[20px] ${pregunta1 === 'postulante' ? 'bg-red-700 text-white' : 'bg-white text-zinc-900'}`} />
        </div>
        {pregunta1 && (

          <div className=" mt-10 max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-3xl font-bold text-center text-red-700 mb-12 tracking-tight">
              2. SELECCIONE EL PROCESO
            </h1>
            <div className='flex justify-center gap-4'>
              <Button1 nombre='Protocolo de Entrada' onClick={() => setPregunta2('protEntr')} colorC={`${pregunta2 === 'protEntr' ? 'bg-red-700 text-white' : 'bg-white text-zinc-900'}`} />
              <Button1 nombre='Derivación' onClick={() => setPregunta2('derivacion')} colorC={`${pregunta2 === 'derivacion' ? 'bg-red-700 text-white' : 'bg-white text-zinc-900'}`} />
            </div>
          </div>

        )}
        {pregunta2 === 'protEntr' && (
          <ChatProtocolIn />
        )}
        {pregunta2 === 'derivacion' && (
          <div className='mt-10'>
            <CarrerasUnivChat />
          </div>
        )}
        <SidebarNumeros
          home={'/'}
          routes={{ 1: '/chatInicio' }}
          currentPage={1}
        />
      </div>
    </div>
  );
}
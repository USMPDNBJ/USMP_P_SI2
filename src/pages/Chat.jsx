
import React, { useState, useEffect } from 'react';
import SidebarNumeros, { ButtonHome, ButtonReiniciar } from '../components/SidebarNumeros'; // ajusta la ruta si es necesario
import Button1 from '../components/button1';
import { useNavigate } from 'react-router-dom';

export function ChatInicio() {
  const navigate = useNavigate();
  const ProtocoloEntrada = () => {
    navigate('/protEntr');
  };
  const routex = 'carrera';
  const careerId = sessionStorage.getItem('careerId');
  const routes = {
    1: '/derivacion',
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
            onClick={() => navigate('/derivacion', { state: { routex, routes } })}
          />
        </div>

      </div>
    </div>
  );
}

export function ChatProtocolIn() {
  const navigate = useNavigate();
  const ProtocoloEntradaNo = () => {
    navigate('/protEntrNo');
  };
  const ProtocoloEntradaSi = () => {
    navigate('/protEntrSi');
  };
  return (
    <div className="bg-white flex flex-col items-center text-center">
      <div className="relative top-20 max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">1. PROTOCOLO DE ENTRADA</h1>
        <p className="text-2xl text-gray-600 mb-6">
          • ¡Hola! 👋🏻😉, agradecemos que te hayas comunicado con nosotros. <br /> Si quieres saber más, bríndanos el consentimiento para usar tus datos. Puedes ver las
          condiciones aquí: <a href="https://usmp.edu.pe/politicas-de-privacidad/" className="text-blue-600 hover:underline">Políticas de Privacidad</a>
        </p>
        <p className="text-2xl text-gray-600 mb-8">
          • ¿Estás de acuerdo para que sigamos?
        </p>
        <div className="flex justify-center gap-4">
          <Button1 nombre="SI" onClick={ProtocoloEntradaSi} />
          <Button1 nombre="NO" onClick={ProtocoloEntradaNo} />
        </div>
      </div>
      <SidebarNumeros currentPage={1}
        home={'/chatInicio'}
        routes={
          {
            1: '/protEntr',

          }}
      />
    </div>
  );
}

export function ChatProtocolInNo() {
  const Inicio = () => {
    navigate('/chatInicio');
  };
  const navigate = useNavigate();
  return (
    <div className="bg-white flex flex-col items-center text-center">
      <div className="max-w-3xl w-full text-center px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">2. COMUNICACIÓN DENEGADA</h1>
        <p className="text-2xl text-gray-600 mb-6">
          • Gracias por tu respuesta. Lamentamos no poder ayudarte.
        </p>
        <p className="text-2xl text-gray-600 mb-6">
          • De igual manera podrás acceder contar con información general de la universidad a
          través de la siguiente URL: https://www.admision.usmp.edu.pe o podrás comunicarte
          con nosotros vía telefónica a nuestra central 01-7484747
        </p>

      </div>
      <Button1 nombre="Volver" onClick={Inicio} />
      <SidebarNumeros currentPage={2}
        home={'/chatInicio'}
        routes={
          {
            1: '/protEntr',
          }} />
    </div>
  );
}

export function ChatProtocolInSi() {
  const navigate = useNavigate();
  const DerivarAsesor = () => {
    navigate('/derivarAsesor');
  };
  return (
    <div className="bg-white flex flex-col items-center text-center">
      <div className="my-20 max-w-3xl w-full px-4">
        <h1 className="text-4xl text-center  font-bold text-gray-800 mb-6">2. COMUNICACIÓN PERMITIDA</h1>
        <p className="text-2xl text-gray-600 mb-6">
          • ¡Excelente! Hoy inicias tu camino a poder estudiar en una de las mejores universidades del
          Perú, según el ranking de excelencia académica 2025 de SUNEDU.
        </p>
        <p className="text-2xl text-gray-600 mb-6">
          1. ¿Me indicas tus nombres y apellidos completos?
        </p>
        <p className="text-2xl text-gray-600 mb-6">
          2. ¿Cuál es tu número de DNI?
        </p>
        <p className="text-2xl text-gray-600 mb-6">
          3. ¿Cuál es tu carrera de interés?
        </p>
        <p className="text-2xl text-gray-600">
          4. ¿Tu número de celular es?
        </p>
      </div>
      <Button1 className="" nombre='Derivar Asesor' onClick={DerivarAsesor} />
      <SidebarNumeros currentPage={2}
        home={'/chatInicio'}
        routes={
          {
            1: '/protEntr',
            2: '/protEntrSi',
            3: '/derivarAsesor'
          }} />
    </div>
  );
}
export function TiempoEspera() {
  const Inicio = () => {
    navigate('/chatInicio');
  };
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(20 * 60); // 20 minutos

  useEffect(() => {
    if (secondsLeft <= 0) {
      // El cronómetro terminó: haz lo que necesites, por ejemplo navegar o mostrar algo:
      // navigate('/ruta-al-finalizar');
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, navigate]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;


  return (
    <div className="bg-white flex flex-col items-center text-center">

      <div className="mt-10 max-w-3xl w-full px-10 py-10 ">

        <h1 className="text-4xl text-center font-bold text-gray-800">
          3. TIEMPO DE ESPERA
        </h1>

        <p className="text-2xl text-gray-600 mb-6 my-10">
          • ¡Excelente! Hoy inicias tu camino a poder estudiar en una de las mejores universidades del
          Perú, según el ranking de excelencia académica 2025 de SUNEDU.
        </p>
        <p className="text-2xl text-black mb-6 font-bold underline underline-offset-8">
          SI NO RESPONDE EL USUARIO Indicas lo siguiente:
        </p>
        <p className="text-2xl text-gray-600 ">
          • Hola, estamos a la espera de tu respuesta para continuar con la atención si no, por lo contrario,
          vamos a dar por finalizado el chat. (Envías la despedida de la USMP)
        </p>
      </div>
      <h1 className=" text-4xl font-bold text-red mb-6">
        {formattedTime}
      </h1>
      <Button1 nombre='Respondió el Usuario' onClick={Inicio} />
      <SidebarNumeros currentPage={3}
        home={'/chatInicio'}
        routes={
          {
            1: '/protEntr',
            2: '/protEntrSi',
            3: '/derivarAsesor'
          }} />

    </div>
  );
}
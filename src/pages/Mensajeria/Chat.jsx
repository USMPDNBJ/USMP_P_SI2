import React, { useState, useEffect, useMemo } from 'react';
import SidebarNumeros, { ButtonHome, ButtonReiniciar } from '../../components/SidebarNumeros'; // ajusta la ruta si es necesario
import Button1 from '../../components/button1';
import { useNavigate } from 'react-router-dom';
import { ChatProtocolIn } from './ProtocoloEntrada';
import CarrerasUnivChat from './Derivacion';
import PreguntasBasicas from '../../components/Preguntas';
import Opciones4x4 from '../../components/Opciones';

export default function ChatInicio() {
  const navigate = useNavigate();
  // Memoizar storedList para que no cambie en cada render


  const emisor = sessionStorage.getItem('emisor');
  const [protocolIn, setProtocol] = useState(null);
  const [derivarAsesor, setderivarAsesor] = useState(null);
  const [respuesta, setRespuesta] = useState('si');
  const [secondsLeft, setSecondsLeft] = useState(10 * 60);

  useEffect(() => {

    const interval = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, navigate]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const [pregunta1, setPregunta1] = useState(null);
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
      <h1 className=" text-5xl md:text-5xl font-bold text-center text-red-800 mb-12 tracking-tight mt-14">
        CHAT MENSAJERÍA
      </h1>
      {respuesta === 'si' &&
        (
          <div className="h-auto min-h-[70vh] bg-white">
            <div className=" max-w-7xl mx-auto">

              <h1 className="text-3xl md:text-3xl font-bold text-center text-red-700 mb-12 tracking-tight">
                1. ¿QUIÉN SE COMUNICÓ?
              </h1>
              <div className='flex justify-center gap-4'>
                <Button1 nombre='ASESOR' onClick={Asesor} colorC={`text-[20px] ${pregunta1 === 'asesor' ? 'bg-red-700 text-white' : 'bg-white text-zinc-900'}`} />
                <Button1 nombre='POSTULANTE' onClick={Postulante} colorC={`text-[20px] ${pregunta1 === 'postulante' ? 'bg-red-700 text-white' : 'bg-white text-zinc-900'}`} />
              </div>
              {pregunta1 && (

                <div className='bg-white flex flex-col items-center text-center text-xl'>
                  <div className=" text-3xl font-bold fixed top-[25vh] right-[10vh]">
                    <h1>
                      {formattedTime}
                    </h1>
                    <Button1 nombre={'No responde'} colorC={'py-2 px-4'} onClick={() => setRespuesta('no')}></Button1>
                  </div>
                  <div className="relative top-20 max-w-3xl w-full">
                    <h1 className="text-3xl font-bold text-red-700 mb-6">2. PROTOCOLO DE ENTRADA</h1>
                    <h2 className="font-bold text-gray-800 mb-6">MENSAJE</h2>
                    {emisor === 'asesor' && (
                      <div>
                        <p className="text-gray-600 mb-6">
                          ¡Hola! 👋🏻😉 somos de la USMP, me comunicó contigo porque te has inscrito anteriormente cuando hemos visitado tu colegio. <br /> Si quieres saber más, bríndanos el consentimiento para usar tus datos. Puedes ver las
                          condiciones aquí: <a href="https://usmp.edu.pe/politicas-de-privacidad/" className="text-blue-600 hover:underline">Políticas de Privacidad</a>
                        </p>
                      </div>
                    )}
                    {emisor === 'postulante' && (
                      <div>
                        <p className="text-gray-600 mb-6">
                          ¡Hola! 👋🏻😉, agradecemos que te hayas comunicado con nosotros. <br /> Si quieres saber más, bríndanos el consentimiento para usar tus datos. Puedes ver las
                          condiciones aquí: <a href="https://usmp.edu.pe/politicas-de-privacidad/" className="text-blue-600 hover:underline">Políticas de Privacidad</a>
                        </p>
                      </div>
                    )}
                    <h2 className="font-bold text-gray-800 mb-6">PREGUNTA</h2>
                    <p className="text-gray-600 mb-8">
                      ¿Estás de acuerdo para que sigamos?
                      <br /><span className='text-gray-400'>(Esperar respuesta del usuario)</span>
                    </p>
                    <div className="flex justify-center gap-4">
                      <Button1 nombre="SI" onClick={() => setProtocol('SI')} colorC={`${protocolIn === 'SI' ? "bg-red-700 text-white" : "bg-white text-zinc-800"}`} />
                      <Button1 nombre="NO" onClick={() => setProtocol('NO')} colorC={`${protocolIn === 'NO' ? "bg-red-700 text-white" : "bg-white text-zinc-800"}`} />
                    </div>
                    {protocolIn === 'SI' && (

                      <div className="my-20 max-w-3xl w-full px-4">
                        <h1 className="text-3xl text-center font-bold text-red-700 mb-6">3. COMUNICACIÓN PERMITIDA</h1>
                        <PreguntasBasicas classArg={'text-xl'} />

                        <div className='flex justify-center gap-4'>
                          <Button1 nombre='Derivar Asesor' onClick={() => setderivarAsesor('SI')} colorC={`${derivarAsesor === 'SI' ? 'bg-red-700 text-white mb-10' : 'bg-white text-zinc-800 mb-10'}`} />
                          <Button1 nombre='Continuar' onClick={() => setderivarAsesor('NO')} colorC={`${derivarAsesor === 'NO' ? 'bg-red-700 text-white mb-10' : 'bg-white text-zinc-800 mb-10'}`} />
                        </div>

                        {derivarAsesor === 'SI' && (
                          <div className='mt-10'>
                            <h1 className="text-3xl text-center font-bold text-red-700">
                              4. ASESOR DERIVADO
                            </h1>
                            <h2 className="font-bold text-gray-800 mt-5">MENSAJE</h2>
                            <p className="text-gray-600 mb-6 my-5">
                              ¡Excelente! Hoy inicias tu camino a poder estudiar en una de las mejores universidades del
                              Perú, según el ranking de excelencia académica 2025 de SUNEDU.
                              <br /><span className='text-gray-400'>(Esperar respuesta del usuario al asesor)</span>
                            </p>
                            <Button1 nombre='Respondió al Asesor' onClick={() => navigate('/')} colorC={'mb-10'} />
                          </div>
                        )}



                        {/* <div ref={finalRef} /> */}
                      </div>
                    )}

                    {protocolIn === 'NO' && (
                      <div className="my-20 max-w-3xl w-full px-4 ">
                        <h1 className="text-3xl font-bold text-red-700 mb-6">3. COMUNICACIÓN DENEGADA</h1>
                        <p className="text-gray-600 mb-6">
                          • Gracias por tu respuesta. Lamentamos no poder ayudarte.
                        </p>
                        <p className="text-gray-600 mb-6">
                          • De igual manera podrás acceder contar con información general de la universidad a
                          través de la siguiente URL: https://www.admision.usmp.edu.pe o podrás comunicarte
                          con nosotros vía telefónica a nuestra central 01-7484747
                        </p>
                        <Button1 nombre="Finalizar" onClick={() => navigate('/')} colorC={'mb-10'} />
                        {/* <div ref={finalRef} /> */}
                      </div>

                    )}

                  </div>

                </div>

              )}
              {protocolIn === 'SI' && derivarAsesor === 'NO' && (
                <div>
                  <CarrerasUnivChat
                    titleArg={'4. SELECCIONAR CARRERA UNIVERSITARIA'}
                    titleArg2={'5. SALUDO DEL ASESOR Y FORTALEZAS DE LA CARRERA'}
                    titleArg3={'6. PREGUNTAR SI ESTÁ EN 5TO O ES EGRESADO'}
                    titleArg4={'7. SOLICITUD DE LLAMADA'}
                  />
                </div>
              )}
            </div>
          </div>
        )
      }
      {respuesta === 'no' && (
        <div className='bg-white flex flex-col items-center text-center text-xl'>
          <div className=" text-3xl font-bold fixed top-[24vh] right-[20vh]">
            <Button1 nombre={'Respondió'} colorC={'py-2 px-4'} onClick={() => setRespuesta('si')}></Button1>
          </div>
          <div className="relative top-20 max-w-3xl w-full">
            <h1 className="text-3xl font-bold text-red-700 mb-6">MENSAJE SI NO RESPONDE</h1>
            <p className="text-gray-600 mb-6">
              [Mensaje de despedida]
            </p>
            <Button1 nombre="Finalizar" onClick={() => navigate('/')} />
          </div>
        </div>
      )}
      <SidebarNumeros
        home={'/'}
        routes={{ 1: '/chatInicio' }}
        currentPage={1}
      />
    </div>
  );
}
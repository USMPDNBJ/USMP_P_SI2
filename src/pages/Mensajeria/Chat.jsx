import React, { useState, useEffect, useMemo } from 'react';
import SidebarNumeros, { ButtonHome, ButtonReiniciar } from '../../components/SidebarNumeros'; // ajusta la ruta si es necesario
import Button1, { Button2 } from '../../components/button1';
import { useNavigate } from 'react-router-dom';
import { ChatProtocolIn } from './ProtocoloEntrada';
import CarrerasUnivChat from './Derivacion';
import PreguntasBasicas from '../../components/Preguntas';
import Opciones4x4 from '../../components/Opciones';

export default function ChatInicio() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [showPRI, setShowPRI] = useState(false);
  // const [pensionForm, setPensionForm] = useState({
  //   codigo: '',
  //   colegio: '',
  //   departamento: '',
  //   provincia: '',
  //   distrito: '',
  //   sameSchool: 'si',
  //   basePension: '',
  //   years: '1',
  //   annualIncrease: '6'
  // });
  // const [simulationResult, setSimulationResult] = useState(null);
  const [modalidadReceipt, setModalidadReceipt] = useState(null);

  // const handlePensionChange = (field, value) => {
  //   setPensionForm(prev => ({ ...prev, [field]: value }));
  // };

  // Preserve scroll: when user clicks CONTINUAR we save the current scroll
  // and after the pension panel renders we restore it to avoid jumping to top.

  // const calculatePension = () => {
  //   const base = parseFloat(pensionForm.basePension);
  //   const years = parseInt(pensionForm.years, 10) || 1;
  //   const inc = parseFloat(pensionForm.annualIncrease) / 100 || 0.06;
  //   if (Number.isNaN(base) || base <= 0) {
  //     setSimulationResult({ error: 'Ingrese una pensión base válida (número mayor a 0).' });
  //     return;
  //   }
  //   let value = base;
  //   for (let i = 0; i < years; i++) {
  //     value = value * (1 + inc);
  //   }
  //   setSimulationResult({ projected: value.toFixed(2), years });
  // };

  // Helper small UI pieces
  const Section = ({ title, children }) => (
    <div className="max-w-3xl mx-auto my-8 text-left">
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <div className="text-lg text-gray-700 space-y-3">{children}</div>
    </div>
  );
  // Memoizar storedList para que no cambie en cada render
  const storageKey = 'careersList';

  const emisor = sessionStorage.getItem('emisor');
  const [protocolIn, setProtocol] = useState(null);
  const [derivarAsesor, setderivarAsesor] = useState(null);
  const [respondio, setRespondio] = useState('si');
  const [reiniciar, setReiniciar] = useState('no');
  const [secondsLeft, setSecondsLeft] = useState(10 * 60);
  const storedList = useMemo(() => {
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : [];
  }, [storageKey]);

  const inicio = () => {
    navigate('/');
  };

  const [selectedCareerId, setSelectedCareerId] = useState(null);
  const [selectedCareerData, setSelectedCareerData] = useState(null);
  const [pregunta5, setPregunta5] = useState(null);
  const [situacion, setSituacion] = useState(null);

  useEffect(() => {
    if (selectedCareerId && storedList.length > 0) {
      const career = storedList.find(item => item.id === selectedCareerId);
      setSelectedCareerData(career || null);
    } else {
      setSelectedCareerData(null);
    }
  }, [selectedCareerId, storedList]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  useEffect(() => {
    if (reiniciar === 'si') {
      setSecondsLeft(600);
    }
  }, [reiniciar]);

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
      {respondio === 'si' &&
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
              <div className=" text-3xl font-bold fixed top-[25vh] right-[10vh]">
                <Button1 nombre={'No responde'} colorC={'py-2 px-4'} onClick={() => { setRespondio('no'); setReiniciar('si') }}></Button1>
              </div>
              {pregunta1 && (

                <div className='bg-white flex flex-col items-center text-center text-xl'>
                  <div className="relative top-20 max-w-3xl w-full">
                    <h1 className="text-3xl font-bold text-red-700 mb-6">2. PROTOCOLO DE ENTRADA</h1>
                    <h2 className="font-bold text-gray-800 mb-6">MENSAJE</h2>
                    {emisor === 'asesor' && (
                      <div>
                        <p className="text-gray-600 mb-6 ">
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
                        <p className='my-5 text-gray-400'>¿Eres asesor de esta carrera?</p>
                        <div className='flex justify-center gap-4'>
                          <Button1 nombre='SI' onClick={() => setderivarAsesor('NO')} colorC={`${derivarAsesor === 'NO' ? 'bg-red-700 text-white mb-10' : 'bg-white text-zinc-800 mb-10'}`} />
                          <Button1 nombre='NO' onClick={() => setderivarAsesor('SI')} colorC={`${derivarAsesor === 'SI' ? 'bg-red-700 text-white mb-10' : 'bg-white text-zinc-800 mb-10'}`} />
                        </div>

                        {derivarAsesor === 'SI' && (
                          <div className='mt-3'>
                            <h1 className="text-3xl text-center font-bold text-red-700">
                              4. DERIVAR ASESOR
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

                <div className='mt-5'>
                  <Opciones4x4
                    title={"4. SELECCIONAR CARRERA UNIVERSITARIA"}
                    storedList={JSON.stringify(storedList)} // pasa como string si el componente lo espera así
                    selectedCareerId={selectedCareerId}
                    onSelectCareer={setSelectedCareerId}
                    routex={'/carrera'}
                  />

                  {selectedCareerId && selectedCareerData && (
                    <div className=" bg-white flex flex-col items-center py-10">
                      <h1 className="text-3xl text-center font-bold text-red-700 mb-6">
                        5. SALUDO DEL ASESOR Y FORTALEZAS DE LA CARRERA
                      </h1>

                      <p className='font-bold text-2xl my-5'>SALUDO INICIAL</p>
                      <div className="max-w-3xl w-full px-4 my-5">
                        <p className="text-xl text-gray-600 mb-6">
                          {selectedCareerData.descripcion1 || ''}
                        </p>
                      </div>

                      <p className='font-bold text-2xl'>BENEFICIOS</p>
                      <p className="text-xl text-gray-600 mb-6 my-5">
                        Estudiar {selectedCareerData.name} en la USMP te ofrece:
                      </p>
                      {selectedCareerData.beneficios && (
                        <div className="text-xl text-gray-700 mb-6">
                          {String(selectedCareerData.beneficios)
                            .split('✅')
                            .map(s => s.trim())
                            .filter(Boolean)
                            .map((text, idx) => (
                              <p key={idx} className="leading-relaxed">✅ {text}</p>
                            ))}
                        </div>
                      )}

                      <p className='font-bold text-2xl'>PERFIL DEL EGRESADO</p>
                      <p className="text-xl text-gray-600 mb-6 my-5">
                        Como profesional podrás desempeñarte como:
                      </p>
                      {selectedCareerData.perfil && (
                        <div className="text-xl text-gray-700 mb-6 w-[1000px]">
                          {String(selectedCareerData.perfil)
                            .split('•')
                            .map(s => s.trim())
                            .filter(Boolean)
                            .map((text, idx) => (
                              <p key={idx} className="leading-relaxed">• {text}</p>
                            ))}
                        </div>
                      )}

                      <p className='font-bold text-2xl'>SEDES</p>
                      <p className="text-xl text-gray-600 mb-6 my-5">
                        La carrera se dicta en:
                      </p>
                      <p className="text-xl text-gray-600 mb-3">
                        {selectedCareerData.sedes || ''}
                      </p>
                      <br />
                    </div>
                  )}

                  {selectedCareerId && (
                    <div>
                      <div className="bg-white flex flex-col items-center mb-10">
                        <h1 className="text-3xl text-center font-bold text-red-700 mb-6">
                          6. PREGUNTAR SI ESTÁ EN 5TO O ES EGRESADO
                        </h1>
                        <p className='font-bold text-xl my-5'>PREGUNTA</p>
                        <div className="max-w-3xl w-full px-4 my-5">
                          <p className="text-xl text-gray-600 text-center">
                            ¿Te encuentras cursando 5to de secundaria o ya terminaste el colegio?
                            <br /><span className='text-gray-400'>(Esperar respuesta del usuario)</span>
                          </p>
                          <div className='flex justify-center gap-4 mt-5'>
                            <Button1 nombre="5to de Secundaria" onClick={() => setSituacion('5to')} colorC={`${situacion === '5to' ? 'bg-red-700 text-white mb-10' : 'bg-white text-zinc-800 mb-10'}`} />
                            <Button1 nombre="Terminó el Colegio" onClick={() => setSituacion('termino')} colorC={`${situacion === 'termino' ? 'bg-red-700 text-white mb-10' : 'bg-white text-zinc-800 mb-10'}`} />
                          </div>
                          <div className="flex justify-center mt-5">

                          </div>
                        </div>
                      </div>
                      <div className="bg-white flex flex-col items-center mb-10">
                        <div className="max-w-3xl w-full px-4">
                          <h1 className="text-3xl text-center font-bold text-red-700 mb-10">
                            7. SOLICITUD DE LLAMADA
                          </h1>
                          <p className='font-bold text-xl my-5 text-center'>
                            PREGUNTA
                          </p>
                          <p className="text-xl text-gray-600 mb-10 text-center">
                            ¿Qué te parece si te llamo en unos minutos? Así te cuento todos los beneficios de
                            estudiar en nuestra universidad
                            <br /><span className='text-gray-400'>(Esperar respuesta del usuario)</span>
                          </p>

                          <p className='text-xl text-center text-gray-400'>
                            ¿Respondió que sí?
                          </p>

                          <div className="flex justify-center gap-4">
                            <Button1 nombre="SI" onClick={() => setPregunta5('si')} colorC={`${pregunta5 === 'si' ? 'bg-red-700 text-white mb-10' : 'bg-white text-zinc-800 mb-10'}`} />
                            <Button1 nombre="NO" onClick={() => setPregunta5('no')} colorC={`${pregunta5 === 'no' ? 'bg-red-700 text-white mb-10' : 'bg-white text-zinc-800 mb-10'}`} />
                          </div>

                          {pregunta5 === 'si' && (
                            <div>
                              <h1 className="text-3xl font-bold text-center text-red-700 mb-6">8. DERIVACIÓN TELEFÓNICA</h1>
                              <p className='font-bold text-2xl my-5 text-center'>
                                MENSAJE
                              </p>
                              <p className="text-xl text-gray-600 mb-6 my-5">
                                ¡Perfecto! Me comunicaré contigo a través de nuestra central <br /> (01) 748 4747
                              </p>
                              <p className="text-xl text-gray-600 mb-6 my-5">
                                Soy [Tu nombre], tu asesor de la Facultad de {selectedCareerData?.facultad || ''} de la USMP
                              </p>
                              <p className="text-xl text-gray-600 mb-6 my-5">
                                Te dejo mi número {selectedCareerData?.celular || ''} para que lo puedas agendar, ya que por ese medio te
                                brindaré toda la información y puedas enviar todos los documentos solicitados.
                              </p>
                              <p className="text-xl text-gray-600 mb-6 ">
                                Ante cualquier duda o consulta, no dudes en escribirme <br />
                                ¡Gracias por comunicarte con la Universidad de San Martín de Porres! <br />
                                <br /><p className='text-gray-400 text-center'>(PROCEDES A CERRAR EL CHAT)</p>
                              </p> <br />
                            </div>
                          )}
                          {pregunta5 === 'no' && (
                            <div>
                              <div className="h-auto min-h-[10vh]">
                                <div className="max-w-4xl mx-auto px-4">

                                  {situacion === '5to' && (
                                    <>
                                      <h1 className="text-3xl font-bold text-center text-red-700 mb-6 mt-5">8. AVERIGUAR MODALIDAD DE INGRESO</h1>
                                      <h1 className='font-bold text-gray-400 text-center text-2xl'>ESTÁ EN 5TO DE SECUNDARIA</h1>
                                      <h1 className='font-bold text-center text-xl mt-5'>PREGUNTA</h1>
                                      <p className='text-xl mt-5'>¡Genial! Para poder orientarte mejor, ¿me puedes indicar en qué colegio estudias y en qué distrito se encuentra tu colegio?</p>
                                      <p className='text-gray-400 text-center text-xl'>(Esperar respuesta del usuario)</p>

                                      <div className="flex gap-3 my-6">
                                        <div
                                          className={`p-4 border border-gray-200 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition w-1/2 text-center ${selected === 'Aplica CEA' ? 'bg-red-700 text-white' : 'bg-white text-gray-800'
                                            }`}
                                          onClick={() => setSelected('Aplica CEA')}
                                        >
                                          <h3 className="text-lg font-semibold">Aplica CEA</h3>
                                        </div>
                                        <div
                                          className={`p-4 border border-gray-200 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition w-1/2 text-center ${selected === 'Aplica Primera Alternativa' ? 'bg-red-700 text-white' : 'bg-white text-gray-800'
                                            }`}
                                          onClick={() => setSelected('Aplica Primera Alternativa')}
                                        >
                                          <h3 className="text-lg font-semibold">Aplica Primera Alternativa</h3>
                                        </div>
                                      </div>
                                      {selected === 'Aplica CEA' && (
                                        <Section title="">
                                          <h1 className='font-bold text-xl text-center'>MENSAJE CEA</h1>
                                          <p>¡Perfecto! En tu caso, estarías ingresando por la modalidad <strong>CEA (Colegio de Excelencia Académica)</strong>.</p>
                                          <p>✓ Esta modalidad es para estudiantes de 5.º de secundaria cuyos colegios han sido reconocidos por la USMP por su excelencia académica.</p>
                                          <h1 className='font-bold text-xl'>CRONOGRAMA EXAMEN</h1>
                                          {selectedCareerId !== 3 && (
                                            < div >
                                              • Nuestro examen para estudiantes de 5.º año de secundaria inicia el 18 de agosto y
                                              va hasta el 23 de octubre. <br />
                                              • El examen tiene un costo de S/ 350, pero... ¡ contamos con cupos limitados para
                                              exonerarte del pago!
                                            </div>)
                                          }
                                          <div>
                                            • Rinde tu examen digital en la sede más cercana a tu hogar y da el primer paso hacia
                                            tu futuro profesional.
                                          </div>
                                          {selectedCareerId === 3 && (
                                            < div className=''>
                                              • Solo para la carrera de Medicina Humana el examen es el 25 de octubre presencial y
                                              se mantiene el costo de S/ 350.
                                            </div>)
                                          }
                                          <div>
                                            • Una vez admitid@, solo deberás reservar tu vacante con S/ 530, asegurando tu
                                            ingreso para el ciclo 2026-I.
                                          </div>
                                          <div>
                                            ¡No dejes pasar esta oportunidad de ser parte de la gran familia USMP!
                                          </div>


                                        </Section>

                                      )}
                                      {selected === 'Aplica Primera Alternativa' && (
                                        <Section title="">
                                          <h1 className='font-bold text-xl text-center'>MENSAJE PRIMERA ALTERNATIVA</h1>
                                          <p>¡Perfecto! En tu caso, ingresarías por la modalidad <strong>Primera Alternativa</strong>.</p>
                                          <p>✓ Esta modalidad te permite asegurar tu ingreso a la USMP el mismo año en que concluyes la educación secundaria en un colegio escolarizado.</p>
                                          <h1 className='font-bold text-xl'>CRONOGRAMA EXAMEN</h1>
                                          {selectedCareerId !== 3 && (
                                            < div >
                                              • Nuestro examen para estudiantes de 5.º año de secundaria inicia el 18 de agosto y
                                              va hasta el 23 de octubre. <br />
                                              • El examen tiene un costo de S/ 350, pero... ¡ contamos con cupos limitados para
                                              exonerarte del pago!
                                            </div>)
                                          }
                                          <div>
                                            • Rinde tu examen digital en la sede más cercana a tu hogar y da el primer paso hacia
                                            tu futuro profesional.
                                          </div>
                                          {selectedCareerId === 3 && (
                                            < div className='p-0'>
                                              • Solo para la carrera de Medicina Humana el examen es el 25 de octubre presencial y
                                              se mantiene el costo de S/ 350.
                                            </div>)
                                          }
                                          <div>
                                            • Una vez admitid@, solo deberás reservar tu vacante con S/ 530, asegurando tu
                                            ingreso para el ciclo 2026-I.
                                          </div>
                                          <div>
                                            ¡No dejes pasar esta oportunidad de ser parte de la gran familia USMP!
                                          </div>
                                        </Section>
                                      )}

                                    </>
                                  )}

                                  {situacion === 'termino' && (
                                    <>
                                      <h1 className="text-3xl font-bold text-center text-red-700 mb-6">8. AVERIGUAR MODALIDAD DE INGRESO</h1>
                                      <h1 className='text-2xl font-bold text-center text-gray-400'>TERMINÓ EL COLEGIO</h1>
                                      <h1 className='text-xl font-bold text-center mt-5'>PREGUNTA</h1>
                                      <p className='text-xl'>Cuéntame, ¿sería tu primera vez postulando a una universidad o ya estás estudiando otra carrera?</p>
                                      <p className='text-gray-400 text-center text-xl'>(Esperar respuesta del usuario)</p>

                                      <div className="flex gap-3 my-6">
                                        <div
                                          className={`p-4 border border-gray-200 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition w-1/2 text-center 
                                                                  ${selected === 'primera' ? 'bg-red-700 text-white' : 'bg-white text-gray-800'
                                            }`}
                                          onClick={() => setSelected('primera')}
                                        >
                                          <h3 className="text-lg font-semibold">Es primera vez</h3>
                                        </div>
                                        <div
                                          className={`p-4 border border-gray-200 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition w-1/2 text-center ${selected === 'otra' ? 'bg-red-700 text-white' : 'bg-white text-gray-800'
                                            }`}
                                          onClick={() => setSelected('otra')}
                                        >
                                          <h3 className="text-lg font-semibold">Estudia / terminó otra carrera</h3>
                                        </div>
                                      </div>

                                      {/* Sección dinámica: muestra contenido según la opción seleccionada sin redirigir */}
                                      {selected === 'primera' && (
                                        <Section title="">
                                          <h1 className="text-xl font-bold text-center">MENSAJE SI ES PRIMERA VEZ</h1>
                                          <p>Perfecto! En tu caso, como terminaste la secundaria completa, contamos con distintas modalidades de ingreso:</p>
                                          <ul className="list-disc pl-5">
                                            <li>
                                              <strong>Ordinario:</strong> Son para egresados del nivel secundario. <a className="text-blue-600 underline" href="https://admision.usmp.edu.pe/ordinario/" target="_blank" rel="noreferrer">https://admision.usmp.edu.pe/ordinario/</a>
                                            </li>
                                            <li>
                                              <strong>Primeros Puestos:</strong> Para quienes ocuparon el 1.º o 2.º puesto desde 1.º hasta 5.º de secundaria (válido en su región). <a className="text-blue-600 underline" href="https://admision.usmp.edu.pe/primeros/primero_segundo/" target="_blank" rel="noreferrer">https://admision.usmp.edu.pe/primeros/primero_segundo/</a>
                                            </li>
                                            <li>
                                              <strong>Tercio Superior:</strong> Para quienes culminaron el 5.º año ubicándose en el tercio superior, presentando una constancia firmada y sellada por el colegio. <a className="text-blue-600 underline" href="https://admision.usmp.edu.pe/primeros/tercio_superior/" target="_blank" rel="noreferrer">https://admision.usmp.edu.pe/primeros/tercio_superior/</a>
                                            </li>
                                          </ul>
                                          <p className="mt-3">Tener en cuenta que si indica el postulante que cree que está en tercio superior (USAR APLICATIVO DE PRONABEC Y PEDIR FOTO DE DNI)</p>
                                          <h1 className="text-xl font-bold">CRONOGRAMA EXAMEN</h1>
                                          <p>
                                            {selectedCareerId !== 3 && (
                                              <div>
                                                • Nuestro examen para los que ya terminaron el colegio inicio el 1 de setiembre y va
                                                hasta el 11 de diciembre.
                                                <br />• Rinde tu examen digital en la sede más cercana a tu hogar y da el primer paso hacia
                                                tu futuro profesional.
                                                <br />• El examen tiene un costo de S/ 350, pero... ¡ contamos con cupos limitados para
                                                exonerarte del pago!
                                              </div>
                                            )}
                                            {selectedCareerId === 3 && (
                                              <div>
                                                • Solo para la carrera de Medicina Humana el examen es el 13 de diciembre presencial
                                                y se mantiene el costo de S/ 350.
                                              </div>
                                            )}
                                            • Una vez admitid@, solo deberás reservar tu vacante con S/ 530, asegurando tu
                                            ingreso para el ciclo 2026-I.
                                            <br />¡No dejes pasar esta oportunidad de ser parte de la gran familia USMP!
                                          </p>
                                        </Section>
                                      )}

                                      {selected === 'otra' && (
                                        <Section title="">
                                          <h1 className="text-xl text-center font-bold">MENSAJE SI ESTUDIA/ TERMINÓ</h1>
                                          <p>Contamos con las siguientes modalidades de Traslados, complementación, titulado o graduado, etc.</p>
                                          <p className='text-gray-400 text-center'>(Usuario responde)</p>
                                          <h1 className="text-xl font-bold">CRONOGRAMA EXAMEN</h1>
                                          <p>
                                            Inscripciones 1 de setiembre hasta el 10 de diciembre. <br />
                                            🖥️Rinde tu examen presencial. <br />
                                            🕒📍Horario y lugar: Indica en tu declaración jurada. ¡Léela con atención! <br />
                                            💰El examen tiene un costo de S/ 350. <br />
                                            ✅ Una vez admitid@, solo deberás reservar tu vacante con S/ 530, asegurando tu
                                            ingreso para el ciclo 2026-I. <br />
                                            🌟¡No dejes pasar esta oportunidad de ser parte de la gran familia USMP! 💪🏼� <br />
                                            ⚠ Importante: <br />
                                            Recuerda llevar tu DNI físico al momento de rendir tu examen digital. <br />
                                            Recuerda llevar tu DNI físico y Declaración Jurada impresa el día del examen. <br />
                                          </p>
                                        </Section>
                                      )}
                                    </>

                                  )}

                                  {!situacion && selected && (
                                    <div className="text-center py-8">
                                      <p className="text-lg">No se recibió una modalidad. Seleccione una modalidad en la sección anterior.</p>
                                      <div className="mt-6 flex justify-center">
                                        <Button1 nombre="Ir a Modalidades" onClick={() => navigate('/modalidades')} />
                                      </div>
                                    </div>
                                  )}
                                  {selected && (
                                    <div className="text-center py-8">
                                      <h1 className="text-3xl font-bold text-center text-red-700 mb-6">9. PREGUNTAR SI NECESITA ALGO ADICIONAL</h1>
                                      <h1 className="text-xl font-bold text-center">PREGUNTA</h1>
                                      <h1 className='text-center mt-5 text-xl'>¿Por el momento todo claro con la información brindada para continuar?</h1>
                                      <h1 className='text-xl'>¿Desea saber algo adicional?</h1>
                                      <div className="mt-6 flex justify-center gap-6">
                                        <Button1 nombre="PENSIÓN" onClick={() => setShowPRI('pension')} colorC={`${showPRI === 'pension' ? 'bg-red-700 text-white' : 'bg-white text-zinc-800'}`} />
                                        <Button1 nombre="GENERAR RECIBO" onClick={() => setShowPRI('recibo')} colorC={`${showPRI === 'recibo' ? 'bg-red-700 text-white' : 'bg-white text-zinc-800'}`} />
                                        {selectedCareerId === 3 && (
                                          <Button1 nombre="INSCRIBIRSE" onClick={() => setShowPRI('inscripcion')} colorC={`${showPRI === 'inscripcion' ? 'bg-red-700 text-white' : 'bg-white text-zinc-800'}`} />
                                        )}
                                        <Button1 nombre="NO" onClick={() => setShowPRI('no')} colorC={`${showPRI === 'no' ? 'bg-red-700 text-white' : 'bg-white text-zinc-800'}`} />
                                      </div>
                                    </div>
                                  )}

                                </div>
                                {/* PENSION: form + simulator + beneficios */}
                                {showPRI === 'pension' && (
                                  <div >
                                    <div className="max-w-4xl mx-auto my-5 p-6 rounded-lg">
                                      <h1 className="text-center text-2xl font-bold mb-3 text-red-700">PENSIÓN</h1>
                                      {/* <h3 className="text-lg font-semibold mt-4">SIMULADOR PENSIÓN APROXIMADA</h3>
                                        <p className="mb-2">Por favor, completa los siguientes datos:</p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                          <div>
                                            <label className="block text-sm font-medium">Código modular del colegio:</label>
                                            <input className="w-full border p-2 rounded" value={pensionForm.codigo} onChange={e => handlePensionChange('codigo', e.target.value)} />
                                          </div>
                                          <div>
                                            <label className="block text-sm font-medium">Nombre del colegio:</label>
                                            <input className="w-full border p-2 rounded" value={pensionForm.colegio} onChange={e => handlePensionChange('colegio', e.target.value)} />
                                          </div>
                                          <div>
                                            <label className="block text-sm font-medium">Departamento:</label>
                                            <input className="w-full border p-2 rounded" value={pensionForm.departamento} onChange={e => handlePensionChange('departamento', e.target.value)} />
                                          </div>
                                          <div>
                                            <label className="block text-sm font-medium">Provincia:</label>
                                            <input className="w-full border p-2 rounded" value={pensionForm.provincia} onChange={e => handlePensionChange('provincia', e.target.value)} />
                                          </div>
                                          <div>
                                            <label className="block text-sm font-medium">Distrito:</label>
                                            <input className="w-full border p-2 rounded" value={pensionForm.distrito} onChange={e => handlePensionChange('distrito', e.target.value)} />
                                          </div>
                                          <div>
                                            <label className="block text-sm font-medium">¿Estudiaste en el mismo colegio durante 3°, 4° y 5°?</label>
                                            <select className="w-full border p-2 rounded" value={pensionForm.sameSchool} onChange={e => handlePensionChange('sameSchool', e.target.value)}>
                                              <option value="si">Sí</option>
                                              <option value="no">No</option>
                                            </select>
                                          </div>
                                          <div>
                                            <label className="block text-sm font-medium">Pensión base aproximada (S/):</label>
                                            <input type="number" className="w-full border p-2 rounded" value={pensionForm.basePension} onChange={e => handlePensionChange('basePension', e.target.value)} />
                                          </div>
                                          <div>
                                            <label className="block text-sm font-medium">Años a proyectar:</label>
                                            <input type="number" min="1" className="w-full border p-2 rounded" value={pensionForm.years} onChange={e => handlePensionChange('years', e.target.value)} />
                                          </div>
                                          <div>
                                            <label className="block text-sm font-medium">Incremento anual (%) (5-8% recomendable):</label>
                                            <input type="number" className="w-full border p-2 rounded" value={pensionForm.annualIncrease} onChange={e => handlePensionChange('annualIncrease', e.target.value)} />
                                          </div>
                                        </div>

                                        <div className="mt-4 flex justify-center gap-3">
                                          <Button1 nombre={'Calcular simulación'} onClick={calculatePension} colorC={'px-5 py-3 fw-semibold text-xl '} />
                                        </div>

                                        {simulationResult && (
                                          <div className="mt-4 bg-white border p-3 rounded">
                                            {simulationResult.error ? (
                                              <div className="text-red-600">{simulationResult.error}</div>
                                            ) : (
                                              <div>
                                                <div className="font-bold">Pensión proyectada después de {simulationResult.years} año(s):</div>
                                                <div className="text-xl">S/ {simulationResult.projected}</div>
                                                <p className="text-sm text-gray-600 mt-2">⚠ Nota: La pensión incrementa anualmente entre un 5% y 8%.</p>
                                              </div>
                                            )}
                                          </div>
                                        )} */}
                                      <div>
                                        <p className='font-bold'>Enlace de Simulador de Pensiones</p>
                                        <a className='text-blue-700' target='_blank' href="https://preinscripcion.usmp.edu.pe/preinscripcion/Simulador.aspx">https://preinscripcion.usmp.edu.pe/preinscripcion/Simulador.aspx</a>
                                      </div>
                                      <div className="mt-6">
                                        <h3 className="text-lg font-semibold">BENEFICIOS ECONÓMICOS</h3>
                                        <ul className="list-disc pl-5 mt-2 text-gray-700">
                                          <li>Padres o titular egresados de la USMP - <strong>BENEFICIO 10%</strong>.</li>
                                          <li>Padres o titular de MININTER (PNP)-FAP-MGP-MINDEF.</li>
                                          <li>Becas por rendimiento académico a partir del 2do ciclo de la carrera universitaria.</li>
                                        </ul>
                                        <p className="mt-3">✓ Cronograma por cada beneficio: <a className="text-blue-600 underline" href="https://usmp.edu.pe/categorizacion/" target="_blank" rel="noreferrer">https://usmp.edu.pe/categorizacion/</a></p>
                                        <p>✓ Correo electrónico para consulta y asesoría: <strong>categorizacion@usmp.pe</strong></p>
                                        <p>✓ Correo electrónico para envío de documentos para aplicar el beneficio: <strong>categorizacion_recepcion@usmp.pe</strong></p>
                                      </div>

                                    </div>
                                    <div>
                                    </div>
                                  </div>
                                )
                                }

                                {showPRI === 'recibo' && (
                                  <div className="mb-5 mt-6 max-w-3xl mx-auto bg-white p-4 rounded shadow">
                                    <h1 className="text-center text-2xl font-bold mb-3 text-red-700">GENERAR RECIBO</h1>
                                    <h1 className='text-xl font-bold text-center'>MENSAJE</h1>
                                    <p className='text-mb mt-1'>¡Qué buena noticia saber que estás interesado en estudiar con nosotros en la USMP!</p>
                                    <p>Y que ya deseas rendir tu examen digital de admisión</p>
                                    <p>Para poder generarte tu recibo, solo necesito que me envíes los siguientes datos:</p>
                                    <p className='mb-2'>
                                      − Foto de tu DNI (frontal y posterior) <br />
                                      − Modalidad de ingreso:<br />
                                      − Sede donde deseas estudiar: (Te detallo las opciones según tu carrera)<br />
                                      − Correo Electrónico:<br />
                                      − Celular:<br />
                                    </p>
                                    {selected === 'primera' && (
                                      <div>
                                        <h2 className="text-xl font-bold mb-2">SELECCIONE MODALIDAD DE INGRESO</h2>
                                        <div className="grid grid-cols-3 md:grid-cols-3 gap-6 mb-4">
                                          <Button1 nombre={'Ordinario'} onClick={() => setModalidadReceipt('Ordinario')}
                                            colorC={
                                              `${modalidadReceipt === 'Ordinario' ? 'bg-red-700 text-white' : 'bg-white text-zinc-900'
                                              }`
                                            }
                                          />
                                          <Button1 nombre={'Primeros Puestos'} onClick={() => setModalidadReceipt('Primeros Puestos')}
                                            colorC={
                                              `${modalidadReceipt === 'Primeros Puestos' ? 'bg-red-700 text-white' : 'bg-white text-zinc-900'
                                              }`
                                            }
                                          />
                                          <Button1 nombre={'Tercio Superior'} onClick={() => setModalidadReceipt('Tercio Superior')}
                                            colorC={
                                              `${modalidadReceipt === 'Tercio Superior' ? 'bg-red-700 text-white' : 'bg-white text-zinc-900'
                                              }`
                                            }
                                          />
                                        </div>
                                        {modalidadReceipt === 'Ordinario' && (
                                          <div>
                                            <h3 className='font-bold'>Te indico los documentos que debes enviar para continuar con tu inscripción en
                                              la modalidad ORDINARIO</h3>
                                            <p className=' mt-1'>
                                              Tienes que enviar un PDF con los siguientes documentos:
                                              <br />1. Copia de DNI (ambos lados)
                                              <br />2. Certificado Oficial de Estudios original o Constancia de
                                              Logros de Aprendizaje de la secundaria completa
                                              <br />3. La
                                              Declaración Jurada de prevención de lavado de activos y financiamiento del
                                              terrorismo.
                                              <br />4. A parte la foto JPG con las
                                              medidas especificadas en el documento de Instrucciones.
                                              <br />5. Enviar los documentos al correo electrónico (CORREO DE LA FACULTAD),
                                              asunto: Datos completos- DNI y Modalidad a la que está postulando.
                                            </p>
                                            <p>
                                              <strong>PAGINA: </strong>
                                              <br />
                                              <a className='text-blue-500' href="https://admision.usmp.edu.pe/traslados/traslado_ex_n/">https://admision.usmp.edu.pe/traslados/traslado_ex_n/</a>
                                            </p>
                                          </div>
                                        )
                                        }
                                        {modalidadReceipt === 'Primeros Puestos' && (
                                          <div>
                                            <h3 className='font-bold'>Te indico los documentos que debes enviar para continuar con tu inscripción en
                                              la modalidad PRIMEROS PUESTOS</h3>
                                            <p className=' mt-1'>
                                              Tienes que enviar un PDF con los siguientes documentos:
                                              <br />1. Copia de DNI (ambos lados)
                                              <br />2. Certificado Oficial de Estudios original de los cinco años de
                                              estudios secundarios que acrediten haber aprobado todos los cursos,
                                              firmados y sellados por la Dirección del plantel y visado por la dependencia
                                              del Ministerio de Educación, en cuyo reverso conste el haber ocupado el
                                              primer o segundo puesto en el orden de mérito general de su promoción
                                              <br />3. La
                                              Declaración Jurada de prevención de lavado de activos y financiamiento del
                                              terrorismo.
                                              <br />4.  A parte la foto JPG con las medidas especificadas en el documento de
                                              Instrucciones.
                                              <br />5. Enviar los documentos al correo electrónico (CORREO DE LA FACULTAD),
                                              asunto: Datos completos- DNI y Modalidad a la que está postulando.
                                            </p>
                                            <p>
                                              <strong>PAGINA: </strong>
                                              <br />
                                              <a className='text-blue-500' href="https://admision.usmp.edu.pe/traslados/traslado_ex_n/">https://admision.usmp.edu.pe/traslados/traslado_ex_n/</a>
                                            </p>
                                          </div>
                                        )
                                        }
                                        {modalidadReceipt === 'Tercio Superior' && (
                                          <div>
                                            <h3 className='font-bold'>Te indico los documentos que debes enviar para continuar con tu inscripción en
                                              la modalidad TERCIO SUPERIOR</h3>
                                            <p className=' mt-1'>
                                              Tienes que enviar un PDF con los siguientes documentos:
                                              <br />1. Copia de DNI (ambos lados)
                                              <br />2. , Certificado Oficial de Estudios original o Constancia de Logros
                                              de Aprendizaje de la secundaria completa
                                              <br />3. Constancia de tercio superior
                                              <br />4. la
                                              Declaración Jurada y la Declaración Jurada de prevención de lavado de
                                              activos y financiamiento del terrorismo.
                                              <br />5. A parte la foto JPG con las
                                              medidas especificadas en el documento de Instrucciones.
                                              <br />6. Enviar los documentos al correo electrónico (CORREO DE LA FACULTAD),
                                              asunto: Datos completos- DNI y Modalidad a la que está postulando.
                                            </p>
                                            <p>
                                              <strong>PAGINA: </strong>
                                              <br />
                                              <a className='text-blue-500' href="https://admision.usmp.edu.pe/traslados/traslado_ex_n/">https://admision.usmp.edu.pe/traslados/traslado_ex_n/</a>
                                            </p>
                                          </div>
                                        )
                                        }
                                      </div>
                                    )}

                                    {selected === 'otra' && (
                                      <div>
                                        <h3 className='font-bold'>Te indico los documentos que debes enviar para continuar con tu inscripción en
                                          la modalidad TRASLADO EXTERNO</h3>
                                        <p className=' mt-1'>
                                          Tienes que enviar un PDF con los siguientes documentos:
                                          <br />1. Copia de DNI (ambos lados)
                                          <br />2. Certificado de estudios originales que acrediten haber
                                          aprobado por lo menos setenta y dos (72) créditos
                                          <br />3. Constancia original de no
                                          haber sido separado por medida disciplinaria de la universidad de
                                          procedencia
                                          <br />4. Declaración Jurada y Declaración Jurada de prevención de
                                          lavado de activos y financiamiento del terrorismo.
                                          <br />5. A parte la foto JPG con las
                                          medidas especificadas en el documento de Instrucciones.
                                          Lo envías al correo electrónico (CORREO DE LA FACULTAD), asunto: Datos
                                          completos- DNI Y Modalidad a la que está postuland
                                        </p>
                                        <p>
                                          <strong>Importante:</strong> Tener los sílabos de las asignaturas aprobadas firmada y sellada
                                          por tu facultad de procedencia para que después de tus resultados como
                                          ADMITIDO, tienes que enviar un correo electrónico para convalidación por
                                          carrera a través del siguiente link:
                                        </p>
                                        <a className='text-blue-500' href="https://admision.usmp.edu.pe/wp-content/uploads/2025/06/Modalidades-Convalidacion-2025-II.pdf">https://admision.usmp.edu.pe/wp-content/uploads/2025/06/Modalidades-Convalidacion-2025-II.pdf</a>
                                        <p>
                                          <strong>PAGINA: </strong>
                                          <br />
                                          <a className='text-blue-500' href="https://admision.usmp.edu.pe/traslados/traslado_ex_n/">https://admision.usmp.edu.pe/traslados/traslado_ex_n/</a>
                                        </p>
                                      </div>
                                    )}
                                    {(selected === 'Aplica CEA' || selected === 'Aplica Primera Alternativa') && (
                                      <div>
                                        <h3 className='font-bold'>Te indico los documentos que debes enviar</h3>
                                        <p className=' mt-1'>
                                          Tienes que enviar un PDF con los siguientes documentos:
                                          <br />1. Copia de DNI (ambos lados)
                                          <br />2. Constancia de Logros de Aprendizaje de 1° a 4° de secundaria emitido por MINEDU
                                          <br />3. la Declaración Jurada y compromiso de Honor firmado
                                          por el postulante y padre o apoderado donde se comprometen a entregar el
                                          Certificado Oficial de Estudios original.
                                          <br />4. A parte la foto JPG con las
                                          medidas especificadas en el documento de Instrucciones.
                                          <br />5. Enviar los documentos al correo electrónico (CORREO DE LA FACULTAD),
                                          asunto: Datos completos- DNI y Modalidad a la que está postulando.
                                        </p>
                                        <p>
                                          <strong>PAGINA: </strong>
                                          <br />
                                          <a className='text-blue-500' href="https://admision.usmp.edu.pe/traslados/traslado_ex_n/">https://admision.usmp.edu.pe/traslados/traslado_ex_n/</a>
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                )}
                                {showPRI === 'inscripcion' && (
                                  <div className='mt-10 '>
                                    <h1 className="text-center text-2xl font-bold mb-3 text-red-700">INSCRIBIRSE</h1>
                                    <p>
                                      <strong>PASOS DE INSCRIPCIÓN Y ENVIO DE DOCUMENTOS </strong><br />¡Listo para iniciar tu inscripción la USMP!
                                    </p>
                                    <p>
                                      <strong>1. GENERAR TU RECIBO:</strong> en el siguiente link:
                                    </p>
                                    <a className='text-blue-700' href="https://preinscripcion.usmp.edu.pe/Preinscripcion/GenerarRecibo.aspx">
                                      https://preinscripcion.usmp.edu.pe/Preinscripcion/GenerarRecibo.aspx
                                    </a>
                                    <p>
                                      <strong>2. REALIZA EL PAGO:</strong> Realiza el pago en bancos, agentes, banca móvil y yape (en PAGO
                                      DE SERVICIOS {'>>'} USMP {'>>'} CÓDIGO "DNI del postulante"), luego continua con el
                                      siguiente paso.
                                    </p>
                                    <p>
                                      <strong>3. REGISTRA TUS DATOS:</strong> Completa todos tus datos correctamente, en el siguiente
                                      enlace:
                                    </p>
                                    <a className='text-blue-700' href="https://preinscripcion.usmp.edu.pe/Preinscripcion/Acceso.aspx">
                                      https://preinscripcion.usmp.edu.pe/Preinscripcion/Acceso.aspx
                                    </a>
                                    <p>
                                      Recuerda que el número de recibo inicia con 001000.. y se encuentra en el recibo
                                      generado en el paso 1.
                                    </p>
                                    <p>
                                      <strong>4. DESCARGA E IMPRIME:</strong> Descarga la Declaración Jurada e Instrucciones. Revisa
                                      bien, ¡son clave!
                                    </p>
                                    <p>
                                      <strong>5. FINALIZA TU INSCRIPCIÓN: </strong>Envía tus documentos (requisitos) y foto al correo
                                      indicado en tu declaración jurada.
                                      ¡Recuerda! Las declaraciones juradas se generan automáticamente al finalizar el
                                      paso 3.
                                    </p>
                                  </div>
                                )}
                                {showPRI === 'no' && (
                                  <div className='mt-10'>

                                    <h1 className='text-2xl font-bold text-red-700 mb-6 text-center'>MENSAJES DE DESPEDIDA</h1>

                                    <p>
                                      <strong>OPCION 1: </strong>
                                    </p>
                                    <p>
                                      Gracias por comunicarte con la Universidad de San Martín de Porres . ¡Que tengas
                                      un excelente día!
                                    </p>
                                    <p className='mt-5'>
                                      <strong>OPCION 2: </strong>
                                    </p>
                                    <p >
                                      Muchas gracias por su tiempo, si tiene alguna consulta o duda, me indicas por este
                                      medio para poder ayudarte. Gracias por comunicarte con la Universidad de San Martín
                                      de Porres
                                    </p>
                                    <p className='mt-5'>
                                      <strong>OPCIONAL: Si te indica el usuario, gracias por la información.</strong>
                                    </p>
                                    <p >Podemos responder:
                                      Igualmente, para usted, muchas gracias por su tiempo, de igual manera si tiene alguna
                                      consulta o duda, me indicas por este medio. Gracias por comunicarte con la Universidad
                                      de San Martín de Porres
                                    </p>
                                  </div>
                                )}
                              </div >
                            </div>
                          )}
                        </div>
                        {pregunta5 === 'si' && (
                          <Button1 nombre="Finalizar" onClick={inicio} />
                        )
                        }
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )
      }
      {
        respondio === 'no' && (
          <div className='bg-white flex flex-col items-center text-center text-xl'>
            <div className=" text-3xl font-bold fixed top-[25vh] right-[10vh]">
              <Button1 nombre={'Respondió'} colorC={'py-2 px-4'} onClick={() => { setRespondio('si'); setReiniciar('no') }}></Button1>
              <h1>
                {formattedTime}
              </h1>
            </div>
            <div className="relative top-3 max-w-3xl w-full">
              <h1 className="text-3xl font-bold text-red-700 mb-6">MENSAJE SI NO RESPONDE</h1>
              <p className="text-gray-600 mb-6">
                Hola, estamos a la
                espera de tu respuesta para continuar con la atención si no, por lo contrario,
                vamos a dar por finalizado el chat. (Envías mensajes de despedida de la USMP)
              </p>
              <h1 className='text-3xl font-bold text-red-700 mb-6'>MENSAJES DE DESPEDIDA</h1>
              <div className='mt-10 mb-10'>
                <p>
                  <strong>OPCION 1: </strong>
                </p>
                <p>
                  Gracias por comunicarte con la Universidad de San Martín de Porres . ¡Que tengas
                  un excelente día!
                </p>
                <p className='mt-5'>
                  <strong>OPCION 2: </strong>
                </p>
                <p >
                  Muchas gracias por su tiempo, si tiene alguna consulta o duda, me indicas por este
                  medio para poder ayudarte. Gracias por comunicarte con la Universidad de San Martín
                  de Porres
                </p>
                <p className='mt-5'>
                  <strong>OPCIONAL: Si te indica el usuario, gracias por la información.</strong>
                </p>
                <p >Podemos responder:
                  Igualmente, para usted, muchas gracias por su tiempo, de igual manera si tiene alguna
                  consulta o duda, me indicas por este medio. Gracias por comunicarte con la Universidad
                  de San Martín de Porres
                </p>
              </div>
              <div className='mb-10'>
                <Button1 nombre={"Finalizar"} onClick={() => navigate("/")}/>
              </div>
            </div>
          </div>
        )
      }
      <SidebarNumeros
        home={'/'}
        routes={{ 1: '/chatInicio' }}
        currentPage={1}
      />
    </div >
  );
}
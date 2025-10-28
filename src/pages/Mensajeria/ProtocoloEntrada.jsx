import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button1 from '../../components/button1';

export function ChatProtocolIn() {
    const navigate = useNavigate();
    // const finalRef = useRef(null);
    // const finalProtocol = useRef(null);
    const emisor = sessionStorage.getItem('emisor');
    const [protocolIn, setProtocol] = useState(null);
    const [derivarAsesor, setderivarAsesor] = useState(null);
    const [respuesta, setRespuesta] = useState('si');
    const [secondsLeft, setSecondsLeft] = useState(10 * 60); // 10 minutos
    useEffect(() => {
        // if (secondsLeft <= 0) {

        //     navigate('/');
        //     return;
        // }

        const interval = setInterval(() => {
            setSecondsLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [secondsLeft, navigate]);

    // useEffect(() => {
    //     if (finalRef.current) {
    //         finalRef.current.scrollIntoView({ behavior: 'auto' });
    //     }
    // }, [derivarAsesor]);
    // useEffect(() => {
    //     if (finalProtocol.current) {
    //         finalProtocol.current.scrollIntoView({ behavior: 'auto' });
    //     }
    // }, [protocolIn]);

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return (
        <div className='bg-white flex flex-col items-center text-center'>

            {respuesta === 'si' &&
                (
                    <div >
                        <div className=" text-4xl font-bold fixed top-[24vh] right-[20vh]">
                            <h1>
                                {formattedTime}
                            </h1>
                            <Button1 nombre={'No responde'} colorC={'py-2 px-4'} onClick={() => setRespuesta('no')}></Button1>
                        </div>
                        <div className="relative top-20 max-w-3xl w-full">
                            <h1 className="text-4xl font-bold text-red-700 mb-6">3. PROTOCOLO DE ENTRADA</h1>
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">MENSAJE</h2>
                            {emisor === 'asesor' && (
                                <div>
                                    <p className="text-2xl text-gray-600 mb-6">
                                        ¡Hola! 👋🏻😉 somos de la USMP, me comunicó contigo porque te has inscrito anteriormente cuando hemos visitado tu colegio. <br /> Si quieres saber más, bríndanos el consentimiento para usar tus datos. Puedes ver las
                                        condiciones aquí: <a href="https://usmp.edu.pe/politicas-de-privacidad/" className="text-blue-600 hover:underline">Políticas de Privacidad</a>
                                    </p>
                                </div>
                            )}
                            {emisor === 'postulante' && (
                                <div>
                                    <p className="text-2xl text-gray-600 mb-6">
                                        ¡Hola! 👋🏻😉, agradecemos que te hayas comunicado con nosotros. <br /> Si quieres saber más, bríndanos el consentimiento para usar tus datos. Puedes ver las
                                        condiciones aquí: <a href="https://usmp.edu.pe/politicas-de-privacidad/" className="text-blue-600 hover:underline">Políticas de Privacidad</a>
                                    </p>
                                </div>
                            )}
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">PREGUNTA</h2>
                            <p className="text-2xl text-gray-600 mb-8">
                                ¿Estás de acuerdo para que sigamos?
                                <br /><span className='text-gray-400'>(Esperar respuesta del usuario)</span>
                            </p>
                            <div className="flex justify-center gap-4">
                                <Button1 nombre="SI" onClick={() => setProtocol('SI')} colorC={`${protocolIn === 'SI' ? "bg-red-700 text-white" : "bg-white text-zinc-800"}`} />
                                <Button1 nombre="NO" onClick={() => setProtocol('NO')} colorC={`${protocolIn === 'NO' ? "bg-red-700 text-white" : "bg-white text-zinc-800"}`} />
                            </div>
                            {protocolIn === 'SI' && (

                                <div className="my-20 max-w-3xl w-full px-4">
                                    <h1 className="text-4xl text-center font-bold text-red-700 mb-6">4. COMUNICACIÓN PERMITIDA</h1>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">MENSAJE</h2>
                                    <p className="text-2xl text-black mb-6">
                                        ¡Excelente! Hoy inicias tu camino a poder estudiar en una de las mejores universidades del br
                                        Perú, según el ranking de excelencia académica 2025 de SUNEDU.
                                    </p>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-6">PREGUNTAS</h2>
                                    {/* <div ref={finalProtocol} /> */}
                                    <p className="text-2xl text-black mb-6">
                                        1. ¿Me indicas tus nombres y apellidos completos?
                                        <br /><span className='text-gray-400'>(Esperar respuesta del usuario)</span>
                                    </p>
                                    <p className="text-2xl text-black mb-6">
                                        2. ¿Cuál es tu número de DNI?
                                        <br /><span className='text-gray-400'>(Esperar respuesta del usuario)</span>
                                    </p>
                                    <p className="text-2xl text-black mb-6">
                                        3. ¿Cuál es tu carrera de interés?
                                        <br /><span className='text-gray-400'>(Esperar respuesta del usuario)</span>
                                    </p>
                                    <p className="text-2xl text-black mb-5">
                                        4. ¿Tu número de celular es?
                                        <br /><span className='text-gray-400'>(Esperar respuesta del usuario)</span>
                                    </p>
                                    {!derivarAsesor && (
                                        <Button1 nombre='Derivar Asesor' onClick={() => setderivarAsesor('SI')} colorC={`${derivarAsesor === 'SI' ? 'bg-red-700 text-white mb-10' : 'bg-white text-zinc-800 mb-10'}`} />
                                    )}
                                    {derivarAsesor === 'SI' && (
                                        <div className='mt-10'>
                                            <h1 className="text-4xl text-center font-bold text-red-700">
                                                5. TIEMPO DE ESPERA
                                            </h1>
                                            <h2 className="text-2xl font-bold text-gray-800 mt-5">MENSAJE</h2>
                                            <p className="text-2xl text-gray-600 mb-6 my-5">
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
                                    <h1 className="text-4xl font-bold text-red-700 mb-6">4. COMUNICACIÓN DENEGADA</h1>
                                    <p className="text-2xl text-gray-600 mb-6">
                                        • Gracias por tu respuesta. Lamentamos no poder ayudarte.
                                    </p>
                                    <p className="text-2xl text-gray-600 mb-6">
                                        • De igual manera podrás acceder contar con información general de la universidad a
                                        través de la siguiente URL: https://www.admision.usmp.edu.pe o podrás comunicarte
                                        con nosotros vía telefónica a nuestra central 01-7484747
                                    </p>
                                    <Button1 nombre="Finalizar" onClick={() => navigate('/')} colorC={'mb-10'} />
                                    {/* <div ref={finalRef} /> */}
                                </div>

                            )
                            }
                        </div>
                    </div>
                )

            }
            {respuesta === 'no' && (
                <div>
                    <div className=" text-4xl font-bold fixed top-[24vh] right-[20vh]">
                        <Button1 nombre={'Respondió'} colorC={'py-2 px-4'} onClick={() => setRespuesta('si')}></Button1>
                    </div>
                    <div className="relative top-20 max-w-3xl w-full">
                        <h1 className="text-4xl font-bold text-red-700 mb-6">MENSAJE SI NO RESPONDE</h1>
                        <p className="text-2xl text-gray-600 mb-6">
                            [Mensaje de despedida]
                        </p>
                        <Button1 nombre="Finalizar" onClick={() => navigate('/')} />
                    </div>
                </div>
            )}
        </div>
    );
}

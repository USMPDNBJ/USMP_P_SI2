
import React, { useState, useEffect } from 'react';
import SidebarNumeros, { ButtonReiniciar } from '../../components/SidebarNumeros'; // ajusta la ruta si es necesario
import Button1 from '../../components/button1';
import { useNavigate, useParams } from 'react-router-dom';
import Opciones4x4, { Opciones1x1 } from '../../components/Opciones';

export default function LlamadaInicio() {
    const navigate = useNavigate();
    const LlamadaDesicion = () => {
        navigate('/LlamadaDesicion');
    };


    return (
        <div className="h-auto min-h-[10vh]  bg-white ">
            <div className='absolute top-100 right-0 w-16'>
                <ButtonReiniciar />
            </div>
            <div className="max-w-7xl mx-auto my-20 relative">
                {/* Header */}

                <h1 className="text-5xl md:text-5xl font-bold text-center text-red-700 mb-12 tracking-tight">
                    LLAMADA TELEFÓNICA
                </h1>
                <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12 tracking-tight">
                    ¿QUIÉN REALIZÓ LA LLAMADA?
                </h1>
                <div className='flex flex-col items-center gap-4'>
                    <Button1 nombre='Asesor' onClick={LlamadaDesicion} />
                    <Button1 nombre='Cliente' onClick={LlamadaDesicion} />
                </div>

            </div>

        </div>
    );
}

export function LlamadaDesicion() {
    const navigate = useNavigate();
    const careerId = sessionStorage.getItem('careerId');
    const LlamadaProtocolInNo = () => {
        navigate('/LlamadaProtocolInNo');
    };
    const routex = 'llamada';
    const routes = {

        1: '/carrerasUnivChat',
        2: '/llamada/' + careerId,

    };
    return (
        <div className="h-auto min-h-[10vh] bg-white ">
            <div className='absolute top-100 right-0 w-16'>
                <ButtonReiniciar />
            </div>
            <div className="max-w-7xl mx-auto my-20 relative">

                {/* Header */}

                <h1 className="text-5xl md:text-5xl font-bold text-center text-red-700 mb-12 tracking-tight">
                    LLAMADA TELEFÓNICA
                </h1>
                <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12 tracking-tight">
                    ¿CONTESTÓ LA LLAMADA?
                </h1>
                <div className='flex flex-col items-center gap-4'>
                    <Button1 nombre="Si"
                        onClick={() => navigate('/LlamadaProtocolSi')}
                    />
                    <Button1 nombre='No' onClick={LlamadaProtocolInNo} />
                </div>

            </div>

        </div>
    );
}
export function LlamadaProtocolSi() {
    const storageKey = 'careersList';
    const getStored = localStorage.getItem(storageKey);
    return (
        <div>
            <Opciones4x4
                title={'1. SELECCIONE LA CARRERA UNIVERSITARIA'}
                storedList={getStored}
                routex={'/llamada'}
            />
            <SidebarNumeros
                currentPage={1}
                home={'/LlamadaInicio'}
                routes={
                    {
                        1: '/LlamadaProtocolSi'
                    }
                }
            />
        </div>
    );
}
export function LlamadaProtocolInNo() {
    const Inicio = () => {
        navigate('/');
    };
    const navigate = useNavigate();
    return (
        <div className="h-auto min-h-[10vh] bg-white">
            {/* Contenedor del ButtonReiniciar centrado */}
            <div className='absolute top-100 right-0 w-16'>
                <ButtonReiniciar />
            </div>

            <div className="max-w-7xl mx-auto my-20 bg-white text-center relative">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">COMUNICACIÓN DENEGADA</h1>
                <p className="text-2xl text-gray-600 mb-6">
                    • Gracias por tu respuesta. Lamentamos no poder ayudarte.
                </p>
                <p className="text-2xl text-gray-600 mb-6">
                    • De igual manera podrás acceder contar con información general de la universidad a
                    través de la siguiente URL: https://www.admision.usmp.edu.pe o podrás comunicarte
                    con nosotros vía telefónica a nuestra central 01-7484747
                </p>

                {/* Botón Volver centrado */}
                <div className="flex justify-center">
                    <Button1 nombre="Volver" onClick={Inicio} />
                </div>
            </div>
        </div>
    );

}
export function Llamada() {
    const { nombre } = useParams();
    const [careers, setCareers] = useState([]);
    const careerId = sessionStorage.getItem('careerId');
    const navigate = useNavigate();
    // Calculate age from birthdate 17 May 1962 up to today
    const _birthDate = new Date(1962, 4, 17); // months are 0-indexed: 4 = May
    const _today = new Date();
    let _age = _today.getFullYear() - _birthDate.getFullYear();
    const _m = _today.getMonth() - _birthDate.getMonth();
    if (_m < 0 || (_m === 0 && _today.getDate() < _birthDate.getDate())) {
        _age--;
    }
    const yearUSMP = _age; // edad
    const Siguiente = () => {
        navigate('/modalidades');
    };
    useEffect(() => {
        // Try sessionStorage first (used by Carreras.jsx), then localStorage (used elsewhere).
        const sessionRaw = sessionStorage.getItem('careersList');
        const localRaw = localStorage.getItem('careersList');
        let storedCareers = [];
        try {
            if (sessionRaw) storedCareers = JSON.parse(sessionRaw);
            else if (localRaw) storedCareers = JSON.parse(localRaw);
        } catch (e) {
            console.error('Error parsing careersList from storage', e);
            storedCareers = [];
        }

        // If storedCareers is an array of pages (array of arrays), flatten it
        if (Array.isArray(storedCareers) && storedCareers.length && Array.isArray(storedCareers[0])) {
            storedCareers = storedCareers.flat();
        }

        setCareers(storedCareers || []);
    }, []);

    // Resolve career by id (numeric param) or by name (decoded string)
    const career = (() => {
        if (!nombre || careers.length === 0) return undefined;
        const decoded = decodeURIComponent(nombre);
        const asNum = parseInt(decoded, 10);
        if (!Number.isNaN(asNum)) {
            return careers.find(c => Number(c.id) === asNum);
        }
        // match by name (case-insensitive)
        return careers.find(c => String(c.name).toLowerCase() === String(decoded).toLowerCase());
    })();
    return (
        <div className="min-h-screen bg-white flex flex-col items-center py-10 ">
            <div className="max-w-3xl w-full text-center px-4">
                <h1 className="text-4xl font-bold text-red-700 mb-10">2. COMUNICACIÓN ACEPTADA</h1>
                <h1 className='font-bold text-3xl mb-5'>MENSAJE</h1>
                <p className="text-2xl text-gray-600 mb-6">
                    ¡Perfecto! Ya te veo como un/una gran  {career?.profesion} <br /> <br />
                    La Universidad de San Martín de Porres, con {yearUSMP} años de trayectoria
                    académica, cuenta con una amplia variedad de sedes y carreras profesionales
                    para que puedas desarrollarte a nivel nacional e internacional. <br /> <br />

                </p>
                <p className="text-2xl text-gray-600 mb-6 ">
                    <h1 className='font-bold text-3xl mb-5'>SEDES</h1>
                    Para la carrera de {career?.name}, puedes encontrarla en las siguientes sedes: <br /> <br />
                    {/* Beneficios: cada '•' empieza una nueva línea */}
                    {career?.sedesEsp && (
                        <div className="text-2xl text-gray-700 mb-6 text-left">
                            {(String(career.sedesEsp) || '')
                                .split('•')
                                .map(s => s.trim())
                                .filter(Boolean)
                                .map((text, idx) => (
                                    <p key={idx} className="leading-relaxed">• {text} <br />  </p>
                                ))}
                        </div>
                    )}
                    <h1 className='font-bold'>PREGUNTA</h1>
                    <p>¿En cuál de esas sedes deseas iniciar tu carrera universitaria?</p>
                </p>

            </div>
            <Button1 nombre="Siguiente" onClick={Siguiente} />
            <SidebarNumeros currentPage={2}
                home={'/LlamadaInicio'}
                routes={
                    {
                        1: '/LlamadaProtocolSi',
                        2: '/llamada/' + careerId
                    }}
            />
        </div>
    );
}
export function Modalidades() {
    const careerId = sessionStorage.getItem('careerId');
    const getStored = [
        [
            {
                name: 'SI ESTÁ EN 5TO SECUNDARIA',
                id: 1
            },
            {
                name: 'SI TERMINÓ EL COLEGIO',
                id: 2
            }
        ],
    ];
    return (

        <div>
            <Opciones1x1
                storedList={getStored}
                title={'3. SELECCIONE LA SITUACIÓN'}
                routex={'/modalidades2'}
            />
            <SidebarNumeros
                currentPage={3}
                home={'/LlamadaInicio'}
                routes={
                    {
                        1: '/LlamadaProtocolSi',
                        2: '/llamada/' + careerId,
                        3: '/modalidades',
                    }
                }
            />
        </div>
    )
}
export function Modalidades2() {
    const { id } = useParams();
    const navigate = useNavigate();
    const careerId = sessionStorage.getItem('careerId');
    const goBack = () => navigate('/modalidades');
    const [selected, setSelected] = useState(null);
    const onClick = '';
    // Helper small UI pieces
    const Section = ({ title, children }) => (
        <div className="max-w-3xl mx-auto my-8 text-left">
            <h2 className="text-2xl font-bold mb-3">{title}</h2>
            <div className="text-lg text-gray-700 space-y-3">{children}</div>
        </div>
    );

    // Render based on id param
    return (
        <div className="h-auto min-h-[10vh]">
            <div className="max-w-4xl mx-auto px-4">


                {id === '1' && (
                    <>
                        <h1 className="text-3xl font-bold text-center text-red-700 mb-6">SI ESTÁ EN 5TO SECUNDARIA</h1>
                        <Section title="PREGUNTA">
                            <p>¡Genial! Para poder orientarte mejor, ¿me puedes indicar en qué colegio estudias y en qué distrito se encuentra tu colegio?</p>
                            <p className="font-semibold">(Usuario responde)</p>
                        </Section>
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
                                <h1 className='font-bold text-2xl'>MENSAJE CEA</h1>
                                <p>¡Perfecto! En tu caso, estarías ingresando por la modalidad <strong>CEA (Colegio de Excelencia Académica)</strong>.</p>
                                <p>✓ Esta modalidad es para estudiantes de 5.º de secundaria cuyos colegios han sido reconocidos por la USMP por su excelencia académica.</p>
                                <h1 className='font-bold text-2xl'>CRONOGRAMA EXAMEN</h1>
                                <p>
                                    • Nuestro examen para estudiantes de 5.º año de secundaria inicia el 18 de agosto y
                                    va hasta el 23 de octubre. <br />
                                    • Rinde tu examen digital en la sede más cercana a tu hogar y da el primer paso hacia
                                    tu futuro profesional. <br />
                                    • El examen tiene un costo de S/ 350, pero... ¡ contamos con cupos limitados para
                                    exonerarte del pago! <br />
                                    • Solo para la carrera de Medicina Humana el examen es el 25 de octubre presencial y
                                    se mantiene el costo de S/ 350. <br />
                                    • Una vez admitid@, solo deberás reservar tu vacante con S/ 530, asegurando tu
                                    ingreso para el ciclo 2026-I. <br />
                                    ¡No dejes pasar esta oportunidad de ser parte de la gran familia USMP!
                                </p>
                                <h1 className='font-bold text-center mt-5'>¿Por el momento todo claro con la información brindada para continuar?</h1>
                                <div className="flex justify-center">
                                    <Button1
                                        nombre={'SIGUIENTE'}
                                        colorC={'px-5 py-3 fw-semibold text-xl '}
                                    />
                                </div>

                            </Section>

                        )}
                        {selected === 'Aplica Primera Alternativa' && (
                            <Section title="">
                                <h1 className='font-bold text-2xl'>MENSAJE PRIMERA ALTERNATIVA</h1>
                                <p>¡Perfecto! En tu caso, ingresarías por la modalidad <strong>Primera Alternativa</strong>.</p>
                                <p>✓ Esta modalidad te permite asegurar tu ingreso a la USMP el mismo año en que concluyes la educación secundaria en un colegio escolarizado.</p>
                                <h1 className='font-bold text-2xl'>CRONOGRAMA EXAMEN</h1>
                                <p>
                                    • Nuestro examen para estudiantes de 5.º año de secundaria inicia el 18 de agosto y
                                    va hasta el 23 de octubre. <br />
                                    • Rinde tu examen digital en la sede más cercana a tu hogar y da el primer paso hacia
                                    tu futuro profesional. <br />
                                    • El examen tiene un costo de S/ 350, pero... ¡ contamos con cupos limitados para
                                    exonerarte del pago! <br />
                                    • Solo para la carrera de Medicina Humana el examen es el 25 de octubre presencial y
                                    se mantiene el costo de S/ 350. <br />
                                    • Una vez admitid@, solo deberás reservar tu vacante con S/ 530, asegurando tu
                                    ingreso para el ciclo 2026-I. <br />
                                    ¡No dejes pasar esta oportunidad de ser parte de la gran familia USMP!
                                </p>
                                <h1 className='font-bold text-center mt-5'>¿Por el momento todo claro con la información brindada para continuar?</h1>
                                <div className="flex justify-center">
                                    <Button1
                                        nombre={'SIGUIENTE'}
                                        colorC={'px-5 py-3 fw-semibold text-xl '}
                                    />
                                </div>

                            </Section>
                        )}

                    </>
                )}

                {id === '2' && (
                    <>
                        <h1 className="text-3xl font-bold text-center text-red-700 mb-6">SI TERMINÓ EL COLEGIO</h1>
                        <Section title="PREGUNTA">
                            <p>Cuéntame, ¿sería tu primera vez postulando a una universidad o ya estás estudiando otra carrera?</p>
                            <p className="font-semibold">(Usuario responde)</p>
                        </Section>

                        <div className="flex gap-3 my-6">
                            <div
                                className={`p-4 border border-gray-200 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition w-1/2 text-center ${selected === 'primera' ? 'bg-red-700 text-white' : 'bg-white text-gray-800'
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
                                <h1 className="text-2xl font-bold">MENSAJE PRIMERA VEZ</h1>
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
                                <h1 className="text-2xl font-bold">CRONOGRAMA EXAMEN</h1>
                                <p>
                                    • Nuestro examen para los que ya terminaron el colegio inicio el 1 de setiembre y va
                                    hasta el 11 de diciembre.<br />•
                                    Rinde tu examen digital en la sede más cercana a tu hogar y da el primer paso hacia
                                    tu futuro profesional.<br /> •
                                    El examen tiene un costo de S/ 350, pero... ¡ contamos con cupos limitados para
                                    exonerarte del pago!<br /> •
                                    Solo para la carrera de Medicina Humana el examen es el 13 de diciembre presencial
                                    y se mantiene el costo de S/ 350.<br /> •
                                    Una vez admitid@, solo deberás reservar tu vacante con S/ 530, asegurando tu
                                    ingreso para el ciclo 2026-I.<br />
                                    ¡No dejes pasar esta oportunidad de ser parte de la gran familia USMP!
                                </p>
                                <h1 className='font-bold text-center mt-5'>¿Por el momento todo claro con la información brindada para continuar?</h1>
                                <div className="flex justify-center">
                                    <Button1
                                        nombre={'SIGUIENTE'}
                                        colorC={'px-5 py-3 fw-semibold text-xl '}
                                    />
                                </div>

                            </Section>
                        )}

                        {selected === 'otra' && (
                            <Section title="">
                                <h1 className="text-2xl font-bold">MENSAJE SI ESTUDIA/ TERMINÓ</h1>
                                <p>Contamos con las siguientes modalidades de Traslados, complementación, titulado o graduado, etc.</p>
                                <p>(Usuario responde)</p>
                                <h1 className="text-2xl font-bold">CRONOGRAMA EXAMEN</h1>
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
                                <h1 className='font-bold text-center mt-5'>¿Por el momento todo claro con la información brindada para continuar?</h1>
                                <div className="flex justify-center">
                                    <Button1
                                        nombre={'SIGUIENTE'}
                                        colorC={'px-5 py-3 fw-semibold text-xl '}
                                    />
                                </div>
                            </Section>
                        )}
                    </>

                )}

                {!id && (
                    <div className="text-center py-8">
                        <p className="text-lg">No se recibió una modalidad. Vuelve a la pantalla anterior para seleccionar una modalidad.</p>
                        <div className="mt-6 flex justify-center">
                            <Button1 nombre="Ir a Modalidades" onClick={() => navigate('/modalidades')} />
                        </div>
                    </div>
                )}
            </div>
            <SidebarNumeros
                currentPage={4}
                home={'/LlamadaInicio'}
                routes={
                    {
                        1: '/LlamadaProtocolSi',
                        2: '/llamada/' + careerId,
                        3: '/modalidades',
                        4: '/modalidades2',
                    }
                }
            />
        </div>
    );
}


import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import SidebarNumeros, { ButtonReiniciar } from '../../components/SidebarNumeros'; // ajusta la ruta si es necesario
import Button1, { Button2 } from '../../components/button1';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Opciones4x4, { Opciones1x1 } from '../../components/Opciones';
import { Navigation } from 'lucide-react';

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
    const situacionId = sessionStorage.getItem('situacionId');
    const goBack = () => navigate('/modalidades');
    const [selected, setSelected] = useState(null);
    const [showPension, setShowPension] = useState(false);
    const [pensionForm, setPensionForm] = useState({
        codigo: '',
        colegio: '',
        departamento: '',
        provincia: '',
        distrito: '',
        sameSchool: 'si',
        basePension: '',
        years: '1',
        annualIncrease: '6'
    });
    const [simulationResult, setSimulationResult] = useState(null);
    const [generateReceipt, setGenerateReceipt] = useState(null);
    const [modalidadReceipt, setModalidadReceipt] = useState(null);

    const handlePensionChange = (field, value) => {
        setPensionForm(prev => ({ ...prev, [field]: value }));
    };

    // Preserve scroll: when user clicks CONTINUAR we save the current scroll
    // and after the pension panel renders we restore it to avoid jumping to top.
    const savedScroll = useRef(null);
    const continueWithPension = () => {
        savedScroll.current = window.scrollY || window.pageYOffset || 0;
        setShowPension(true);
    };

    useLayoutEffect(() => {
        if (showPension && savedScroll.current !== null) {
            // next paint: restore scroll
            window.requestAnimationFrame(() => {
                window.scrollTo({ top: savedScroll.current, behavior: 'auto' });
                // clear saved value
                savedScroll.current = null;
            });
        }
    }, [showPension]);

    const calculatePension = () => {
        const base = parseFloat(pensionForm.basePension);
        const years = parseInt(pensionForm.years, 10) || 1;
        const inc = parseFloat(pensionForm.annualIncrease) / 100 || 0.06;
        if (Number.isNaN(base) || base <= 0) {
            setSimulationResult({ error: 'Ingrese una pensión base válida (número mayor a 0).' });
            return;
        }
        let value = base;
        for (let i = 0; i < years; i++) {
            value = value * (1 + inc);
        }
        setSimulationResult({ projected: value.toFixed(2), years });
    };
    const goToReciboPage = () => {
        // Navigate to a recibo/pago page. Adjust route if you have a specific one.
        navigate('/recibo');
    };
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
                            </Section>
                        )}

                        {selected && !showPension && (
                            <div >
                                <h1 className='font-bold text-center mt-5'>¿Por el momento todo claro con la información brindada para continuar?</h1>
                                <div className="flex justify-center">
                                    <Button1
                                        nombre={'CONTINUAR'}
                                        colorC={'px-5 py-3 fw-semibold text-xl '}
                                        onClick={continueWithPension}
                                    />
                                </div>
                            </div>
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
                            </Section>
                        )}
                        {selected && !showPension && (
                            <div >
                                <h1 className='font-bold text-center mt-5'>¿Por el momento todo claro con la información brindada para continuar?</h1>
                                <div className="flex justify-center">
                                    <Button1
                                        nombre={'CONTINUAR'}
                                        colorC={'px-5 py-3 fw-semibold text-xl '}
                                        onClick={continueWithPension}
                                    />
                                </div>
                            </div>
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
            {/* PENSION: form + simulator + beneficios */}
            {showPension && (
                <div>
                    <div className="max-w-4xl mx-auto my-8 bg-gray-50 p-6 rounded-lg">
                        <h1 className="text-center text-2xl font-bold mb-3 text-red-700">PENSIÓN</h1>
                        <h3 className="text-lg font-semibold mt-4">SIMULADOR PENSIÓN APROXIMADA</h3>
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
                        )}

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


                        <div>
                            <div>
                                <h1 className='text-xl text-center'> <strong>¿Desea generar su recibo ahora mismo?</strong></h1>
                            </div>
                            <div className="mt-4 flex justify-center">
                                <Button1 nombre={'SI'} onClick={() => setGenerateReceipt('si')} colorC={'px-8 py-3 fw-semibold text-xl '} />
                                <Button1 nombre={'NO'} onClick={() => { setGenerateReceipt('no'); }} colorC={'px-8 py-3 fw-semibold text-xl ml-5'} />
                            </div>
                        </div>



                        {generateReceipt === 'si' && (
                            <div className="mb-5 mt-6 max-w-3xl mx-auto bg-white p-4 rounded shadow">
                                <h1 className='text-xl font-bold'>MENSAJE INICIAL</h1>
                                <p className=' mt-1'>¡Qué buena noticia saber que estás interesado en estudiar con nosotros en la USMP!</p>
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
                                    <div >
                                        <h2 className="text-xl font-bold mb-2">SELECCIONE MODALIDAD</h2>
                                        <div className="grid grid-cols-3 md:grid-cols-3 gap-6 mb-4">
                                            <Button2 nombre={'Ordinario'} onClick={() => setModalidadReceipt('Ordinario')}
                                                classes={
                                                    `${modalidadReceipt === 'Ordinario' ? 'bg-red-300 text-black' : 'bg-white text-gray-800'
                                                    }`
                                                }
                                            ></Button2>
                                            <Button2 nombre={'Primeros Puestos'} onClick={() => setModalidadReceipt('Primeros Puestos')}
                                                classes={
                                                    `${modalidadReceipt === 'Primeros Puestos' ? 'bg-red-300 text-black' : 'bg-white text-gray-800'
                                                    }`
                                                }
                                            ></Button2>
                                            <Button2 nombre={'Tercio Superior'} onClick={() => setModalidadReceipt('Tercio Superior')}
                                                classes={
                                                    `${modalidadReceipt === 'Tercio Superior' ? 'bg-red-300 text-black' : 'bg-white text-gray-800'
                                                    }`
                                                }
                                            ></Button2>
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
                        {(generateReceipt === 'no' || (generateReceipt === 'si' && selected !== 'primera') || (selected === 'primera' && modalidadReceipt)) && (
                            <div className="mb-5 mt-6 max-w-3xl mx-auto bg-white p-4 rounded shadow">
                                <h2 className="text-xl font-bold mb-2">MENSAJE DE DESPEDIDA</h2>
                                <p className='mb-4'>
                                    Muchas gracias por su tiempo, si tiene alguna consulta o duda, me indicas por este
                                    medio para poder ayudarte. Gracias por comunicarte con la Universidad de San Martín
                                    de Porres
                                </p>
                                <h3 className="text-xl font-bold mb-2">OPCIONAL</h3>
                                <p>
                                    Si te indica el usuario, gracias por la información. Podemos responder:
                                    Igualmente, para usted, muchas gracias por su tiempo, de igual manera si tiene alguna
                                    consulta o duda, me indicas por este medio. Gracias por comunicarte con la Universidad
                                    de San Martín de Porres
                                </p>
                                <div className="flex justify-center mt-3">
                                    <Button1 nombre={'Finalizar'} onClick={() => navigate('/')}></Button1>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <SidebarNumeros
                currentPage={4}
                home={'/LlamadaInicio'}
                routes={
                    {
                        1: '/LlamadaProtocolSi',
                        2: '/llamada/' + careerId,
                        3: '/modalidades',
                        4: '/modalidades2/' + situacionId,
                    }
                }
            />
        </div>
    );
}

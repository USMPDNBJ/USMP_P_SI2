
import React, { useState, useEffect } from 'react';
import SidebarNumeros, { ButtonReiniciar } from '../../components/SidebarNumeros'; // ajusta la ruta si es necesario
import Button1 from '../../components/button1';
import { useNavigate, useParams } from 'react-router-dom';
import Opciones4x4 from '../../components/Opciones';

export default function LlamadaInicio() {
    const navigate = useNavigate();
    const LlamadaDesicion = () => {
        navigate('/LlamadaDesicion');
    };


    return (
        <div className="h-auto min-h-[70vh] bg-white ">
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

        1: '/derivacion',
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
                    ¿Contestó la llamada?
                </h1>
                <div className='flex flex-col items-center gap-4'>
                    <Button1 nombre="Si"
                        onClick={() => navigate('/carrerasUnivLlam')}
                    />
                    <Button1 nombre='No' onClick={LlamadaProtocolInNo} />
                </div>

            </div>

        </div>
    );
}
export function LlamadaProtocolInNo() {
    const Inicio = () => {
        navigate('/LlamadaInicio');
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
                <h1 className="text-4xl font-bold text-gray-800 mb-10">COMUNICACIÓN ACEPTADA</h1>
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
                        1: '/derivacion',
                        2: '/llamada/' + careerId
                    }}
                routex={'llamada'}
            />
        </div>
    );
}
export function Modalidades() {
    const getStored = [
        [
            {
                name: 'SI ESTÁ EN QUINTO',
                id: 1
            },
            {
                name: 'SI TERMINÓ EL COLEGIO',
                id: 2
            },
            {
                name: 'SI INDICA QUE ES PRIMERA VEZ',
                id: 3
            },
            {
                name: 'SI SE ENCUENTRA ESTUDIANDO EN OTRA UNIVERSIDAD O TERMINÓ UNA CARRERA',
                id: 4
            },
        ],
    ];
    return (

        <div>
            <Opciones4x4
                storedList={getStored}
                title={'1. SELECCIONE LA MODALIDAD'}
                routex={'s'}
            />
        </div>
    )
}
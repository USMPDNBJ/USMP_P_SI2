
import React, { useState, useEffect } from 'react';
import SidebarNumeros, { ButtonReiniciar } from '../components/SidebarNumeros'; // ajusta la ruta si es necesario
import Button1 from '../components/button1';
import { useNavigate } from 'react-router-dom';

export default function LlamadaInicio() {
    const navigate = useNavigate();
    const LlamadaDesicion = () => {
        navigate('/LlamadaDesicion');
    };


    return (
        <div className="h-auto min-h-[70vh] bg-white ">
            <div className="max-w-7xl mx-auto my-20">
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
            <div className='relative size-32 '>
                <div className='absolute -inset-y-20 right-0 w-16'>
                    <ButtonReiniciar />
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
            <div className="max-w-7xl mx-auto my-20">
                {/* Header */}

                <h1 className="text-5xl md:text-5xl font-bold text-center text-red-700 mb-12 tracking-tight">
                    LLAMADA TELEFÓNICA
                </h1>
                <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12 tracking-tight">
                    ¿Contestó la llamada?
                </h1>
                <div className='flex flex-col items-center gap-4'>
                    <Button1 nombre="Si"
                        onClick={() => navigate('/derivacion', { state: { routex, routes } })}
                    />
                    <Button1 nombre='No' onClick={LlamadaProtocolInNo} />
                </div>

            </div>
            <div className='relative size-32 '>
                <div className='absolute -inset-y-20 right-0 w-16'>
                    <ButtonReiniciar />
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
            <div className="max-w-7xl mx-auto my-20 bg-white text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">COMUNICACIÓN DENEGADA</h1>
                <p className="text-2xl text-gray-600 mb-6">
                    • Gracias por tu respuesta. Lamentamos no poder ayudarte.
                </p>
                <p className="text-2xl text-gray-600 mb-6">
                    • De igual manera podrás acceder contar con información general de la universidad a
                    través de la siguiente URL: https://www.admision.usmp.edu.pe o podrás comunicarte
                    con nosotros vía telefónica a nuestra central 01-7484747
                </p>
                <Button1 nombre="Volver" onClick={Inicio} />
            </div>
            <div className='relative size-32'>
                <div className='absolute -inset-y-20 right-0 w-16'>
                    <ButtonReiniciar />
                </div>
            </div>
        </div>
    );
}

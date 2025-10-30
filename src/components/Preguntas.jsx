import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button2 } from './button1';
export default function PreguntasBasicas({ classArg }) {

    return (
        <div className={`text-center ${classArg}`}>
            <h2 className=" font-bold text-gray-800 mb-6">MENSAJE</h2>
            <p className=" text-black mb-6">
                ¡Excelente! Hoy inicias tu camino a poder estudiar en una de las mejores universidades del
                Perú, según el ranking de excelencia académica 2025 de SUNEDU.
            </p>
            <h2 className=" font-bold text-gray-800 mb-6 ">PREGUNTAS</h2>
            {/* <div ref={finalProtocol} /> */}
            <p className=" text-black mb-6">
                1. ¿Me indicas tus nombres y apellidos completos?
                <br /><span className='text-gray-400'>(Esperar respuesta del usuario)</span>
            </p>
            <p className=" text-black mb-6">
                2. ¿Cuál es tu número de DNI?
                <br /><span className='text-gray-400'>(Esperar respuesta del usuario)</span>
            </p>
            <p className=" text-black mb-6">
                3. ¿Cuál es tu carrera de interés?
                <br /><span className='text-gray-400'>(Esperar respuesta del usuario)</span>
            </p>
            <p className=" text-black mb-5">
                4. ¿Tu número de celular es?
                <br /><span className='text-gray-400'>(Esperar respuesta del usuario)</span>
            </p>
        </div >
    );
}

import React, { useState, useEffect } from 'react';
import SidebarNumeros from '../components/SidebarNumeros'; // ajusta la ruta si es necesario
import Button1 from '../components/button1';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export function ChatSolicitud() {
  // Route uses `/carrera/:nombre` in App.jsx — nombre may be an id or an encoded name
  const careerId = sessionStorage.getItem('careerId');
  const { nombre } = useParams();
  const [careers, setCareers] = useState([]);
  const Inicio = () => {
    navigate('/');
  };
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-white flex flex-col items-center ">

      <div className="max-w-3xl w-full px-4">

        <h1 className="text-4xl text-center font-bold text-red-700 mb-10 my-10">
          4. SOLICITUD DE LLAMADA
        </h1>
        <p className='font-bold text-3xl my-5 text-center'>
          PREGUNTA
        </p>
        <p className="text-2xl text-gray-600 mb-10">
          ¿Qué te parece si te llamo unos minutos? Así te cuento todos los beneficios de
          estudiar en nuestra universidad
        </p>

        <p className='font-bold text-3xl text-center'>
          RESPONDIÓ QUE SÍ ?
        </p>
        <p className="text-2xl text-gray-600 mb-6 my-5">
          ¡Perfecto! Me comunicaré contigo a través de nuestra central <br /> (01) 748 4747
        </p>
        <p className="text-2xl text-gray-600 mb-6 my-5">
          Soy {career?.asesor || ''}, tu asesor de la Facultad de {career?.facultad || ''} de la USMP
        </p>
        <p className="text-2xl text-gray-600 mb-6 my-5">
          Te dejo mi número {career?.celular || ''} para que lo puedas agendar, ya que por ese medio te
          brindaré toda la información y puedas enviar todos los documentos solicitados.
        </p>
        <p className="text-2xl text-gray-600 mb-6 ">
          Ante cualquier duda o consulta, no dudes en escribirme <br />
          ¡Gracias por comunicarte con la Universidad de San Martín de Porres! <br />
          (PROCEDES A CERRAR EL CHAT)
        </p> <br />

      </div>

      <Button1 nombre="Finalizar" onClick={Inicio} />
      <SidebarNumeros currentPage={4} home={'/chatInicio'}
        routes={
          {
            1: '/carrerasUnivChat',
            2: '/carrera/' + careerId,
            3: '/preguntar/' + careerId,
            4: '/solicitud/' + careerId,
          }
        }
      />
    </div>
  );
}

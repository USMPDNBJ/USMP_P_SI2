
import React, { useState, useEffect } from 'react';
import SidebarNumeros from '../components/SidebarNumeros'; // ajusta la ruta si es necesario
import Button1 from '../components/button1';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Carrera() {
  // Route uses `/carrera/:nombre` in App.jsx — nombre may be an id or an encoded name
  const { nombre } = useParams();
  const [careers, setCareers] = useState([]);
  const navigate = useNavigate();
  const careerId = sessionStorage.getItem('careerId');
  const handleCareerClick = (careerIdOrName) => {
    navigate(`/preguntar/${careerId}`);
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
      <h1 className="text-4xl text-center font-bold text-red-700 mb-6">
        2. SALUDO DEL ASESOR Y FORTALEZAS DE LA CARRERA
      </h1>
      <p className='font-bold text-3xl my-5'>
        SALUDO INICIAL
      </p>
      <div className="max-w-3xl w-full px-4 my-5">

        <p className="text-2xl text-gray-600 mb-6">
          👋 ¡Hola! Te saluda {career?.asesor || ''}, asesor de admisión de la USMP,<br />
          Quiero contarte un poco sobre una de nuestras carreras más representativas: ({career?.name || 'Carrera no encontrada'})
        </p>
        <p className="text-2xl text-gray-600 mb-6">
          {career?.descripcion1 || ''}
        </p>
      </div>

      <p className='font-bold text-3xl'>
        BENEFICIOS
      </p>
      <p className="text-2xl text-gray-600 mb-6 my-5">
        🎓 Estudiar {career?.name} en la USMP te ofrece los siguientes beneficios:
      </p>
      {/* Beneficios: cada '✅' empieza una nueva línea */}
      {career?.beneficios && (
        <div className="text-2xl text-gray-700 mb-6">
          {(String(career.beneficios) || '')
            .split('✅')
            .map(s => s.trim())
            .filter(Boolean)
            .map((text, idx) => (
              <p key={idx} className="leading-relaxed">✅ {text}</p>
            ))}
        </div>
      )}
      <p className='font-bold text-3xl '>
        PERFIL DEL EGRESADO
      </p>
      <p className="text-2xl text-gray-600 mb-6 my-5">
        👨‍🎓 Como profesional podras desempeñarte como:
      </p>
      {/* Beneficios: cada '✅' empieza una nueva línea */}
      {career?.beneficios && (
        <div className="text-2xl text-gray-700 mb-6">
          {(String(career.perfil) || '')
            .split('•')
            .map(s => s.trim())
            .filter(Boolean)
            .map((text, idx) => (
              <p key={idx} className="leading-relaxed">• {text}</p>
            ))}
        </div>
      )}
      <p className='font-bold text-3xl '>
        SEDES
      </p>
      <p className="text-2xl text-gray-600 mb-6 my-5">
        🌍 La carrera se siente disponible en las siguientes sedes:
      </p>
      <p className="text-2xl text-gray-600 mb-6 ">
        {career?.sedes || ''}
      </p> <br />
      <Button1 nombre="Continuar" onClick={() => { if (career) handleCareerClick(career.id); }} />
      <SidebarNumeros currentPage={2}
        home={'/chatInicio'}
        routex={'carrera'}
        routes={
          {
            1: '/carrerasUnivChat',
            2: '/carrera/' + careerId,
          }
        }
      />
    </div>
  );
}

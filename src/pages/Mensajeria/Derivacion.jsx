import Button1 from "../../components/button1";
import Opciones4x4 from "../../components/Opciones";
import SidebarNumeros from "../../components/SidebarNumeros";
import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from 'react-router-dom';

export default function CarrerasUnivChat() {
  const storageKey = 'careersList';
  const navigate = useNavigate();
  // Memoizar storedList para que no cambie en cada render
  const storedList = useMemo(() => {
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : [];
  }, [storageKey]);

  const inicio = () => {
    navigate('/');
  };

  const [selectedCareerId, setSelectedCareerId] = useState(null);
  const [selectedCareerData, setSelectedCareerData] = useState(null);
  const [pregunta3, setPregunta3] = useState(null);
  const [pregunta4, setPregunta4] = useState(null);

  // useEffect solo depende de selectedCareerId y storedList (que es estable)
  useEffect(() => {
    if (selectedCareerId && storedList.length > 0) {
      const career = storedList.find(item => item.id === selectedCareerId);
      setSelectedCareerData(career || null);
    } else {
      setSelectedCareerData(null);
    }
  }, [selectedCareerId, storedList]);

  return (
    <div>
      <Opciones4x4
        title={'3. SELECCIONE LA CARRERA UNIVERSITARIA'}
        storedList={JSON.stringify(storedList)} // pasa como string si el componente lo espera así
        selectedCareerId={selectedCareerId}
        onSelectCareer={setSelectedCareerId}
        routex={'/carrera'}
      />

      {selectedCareerId && selectedCareerData && (
        <div className=" bg-white flex flex-col items-center py-10">
          <h1 className="text-3xl text-center font-bold text-red-700 mb-6">
            4. SALUDO DEL ASESOR Y FORTALEZAS DE LA CARRERA
          </h1>

          <p className='font-bold text-3xl my-5'>SALUDO INICIAL</p>
          <div className="max-w-3xl w-full px-4 my-5">
            <p className="text-2xl text-gray-600 mb-6">
              Hola! Te saluda {selectedCareerData.asesor || ''}, asesor de admisión de la USMP,<br />
              Quiero contarte un poco sobre: {selectedCareerData.name || 'Carrera no encontrada'}
            </p>
            <p className="text-2xl text-gray-600 mb-6">
              {selectedCareerData.descripcion1 || ''}
            </p>
          </div>

          <p className='font-bold text-3xl'>BENEFICIOS</p>
          <p className="text-2xl text-gray-600 mb-6 my-5">
            Estudiar {selectedCareerData.name} en la USMP te ofrece:
          </p>
          {selectedCareerData.beneficios && (
            <div className="text-2xl text-gray-700 mb-6">
              {String(selectedCareerData.beneficios)
                .split('✅')
                .map(s => s.trim())
                .filter(Boolean)
                .map((text, idx) => (
                  <p key={idx} className="leading-relaxed">✅ {text}</p>
                ))}
            </div>
          )}

          <p className='font-bold text-3xl'>PERFIL DEL EGRESADO</p>
          <p className="text-2xl text-gray-600 mb-6 my-5">
            Como profesional podrás desempeñarte como:
          </p>
          {selectedCareerData.perfil && (
            <div className="text-2xl text-gray-700 mb-6 w-[1000px]">
              {String(selectedCareerData.perfil)
                .split('•')
                .map(s => s.trim())
                .filter(Boolean)
                .map((text, idx) => (
                  <p key={idx} className="leading-relaxed">• {text}</p>
                ))}
            </div>
          )}

          <p className='font-bold text-3xl'>SEDES</p>
          <p className="text-2xl text-gray-600 mb-6 my-5">
            La carrera se dicta en:
          </p>
          <p className="text-2xl text-gray-600 mb-3">
            {selectedCareerData.sedes || ''}
          </p>
          <br />
        </div>
      )}

      {!pregunta3 && selectedCareerData && (
        <div className="flex mb-10 justify-center">
          <Button1 nombre="Continuar" onClick={() => setPregunta3('si')} />
        </div>
      )}

      {pregunta3 === 'si' && (
        <div className="bg-white flex flex-col items-center mb-10">
          <h1 className="text-3xl text-center font-bold text-red-700 mb-6">
            5. PREGUNTAR SI ESTÁ EN 5TO O ES EGRESADO
          </h1>
          <p className='font-bold text-3xl my-5'>PREGUNTA</p>
          <div className="max-w-3xl w-full px-4 my-5">
            <p className="text-2xl text-gray-600 text-center">
              ¿Te encuentras cursando 5to de secundaria o ya terminaste el colegio?
              <br /><span className='text-gray-400'>(Esperar respuesta del usuario)</span>
            </p>
            <div className="flex justify-center mt-5">
              {!pregunta4 && (
                <div>
                  <Button1 nombre="Continuar" onClick={() => setPregunta4('si')} />
                </div>
              )
              }
            </div>
          </div>
        </div>
      )}
      {pregunta4 === 'si' && (
        <div className="bg-white flex flex-col items-center mb-10">
          <div className="max-w-3xl w-full px-4">
            <h1 className="text-3xl text-center font-bold text-red-700 mb-10">
              6. SOLICITUD DE LLAMADA
            </h1>
            <p className='font-bold text-3xl my-5 text-center'>
              PREGUNTA
            </p>
            <p className="text-2xl text-gray-600 mb-10 text-center">
              ¿Qué te parece si te llamo en unos minutos? Así te cuento todos los beneficios de
              estudiar en nuestra universidad
              <br /><span className='text-gray-400'>(Esperar respuesta del usuario)</span>
            </p>

            <p className='font-bold text-3xl text-center'>
              RESPONDIÓ QUE SÍ ?
            </p>
            <p className="text-2xl text-gray-600 mb-6 my-5">
              ¡Perfecto! Me comunicaré contigo a través de nuestra central <br /> (01) 748 4747
            </p>
            <p className="text-2xl text-gray-600 mb-6 my-5">
              Soy [Tu nombre], tu asesor de la Facultad de {selectedCareerData?.facultad || ''} de la USMP
            </p>
            <p className="text-2xl text-gray-600 mb-6 my-5">
              Te dejo mi número {selectedCareerData?.celular || ''} para que lo puedas agendar, ya que por ese medio te
              brindaré toda la información y puedas enviar todos los documentos solicitados.
            </p>
            <p className="text-2xl text-gray-600 mb-6 ">
              Ante cualquier duda o consulta, no dudes en escribirme <br />
              ¡Gracias por comunicarte con la Universidad de San Martín de Porres! <br />
              <br /><p className='text-gray-400 text-center'>(PROCEDES A CERRAR EL CHAT)</p>
            </p> <br />

          </div>

          <Button1 nombre="Finalizar" onClick={inicio} />
        </div>
      )}
    </div>
  );
}
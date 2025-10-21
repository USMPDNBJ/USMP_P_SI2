import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarNumeros from '../components/SidebarNumeros';

const ChevronLeft = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export default function CarrerasUniversitarias() {
  const navigate = useNavigate();
  const [careersPages, setCareersPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Tamaño de página: cuántas carreras mostrar por página
  const PAGE_SIZE = 16;

  // Función para navegar cuando se hace clic en una carrera
  const handleCareerClick = (careerName) => {
    const encodedName = encodeURIComponent(careerName);
    navigate(`/carrera/${encodedName}`);
  };

  // Cargar datos desde sessionStorage o inicializarlos
  useEffect(() => {
    const storageKey = 'careersList';
    const stored = sessionStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Creamos páginas
          const pages = [];
          for (let i = 0; i < parsed.length; i += PAGE_SIZE) {
            pages.push(parsed.slice(i, i + PAGE_SIZE));
          }
          setCareersPages(pages);
          return;
        }
      } catch (e) {
        console.error('Error parsing careersList from sessionStorage', e);
      }
    }

    // Si no existe o está vacío, inicializamos con tus datos
    const initialCareers = [
      { name: 'DERECHO', id: 1 },
      { name: 'MARKETING', id: 2 },
      { name: 'MEDICINA HUMANA', id: 3 },
      { name: 'ADMINISTRACIÓN', id: 4 },
      { name: 'NEGOCIOS INTERNACIONALES', id: 5 },
      { name: 'CIENCIAS AERONÁUTICAS', id: 6 },
      { name: 'ING. COMPUTACIÓN Y SISTEMAS', id: 7 },
      { name: 'ING. INDUSTRIAL', id: 8 },
      { name: 'ENFERMERÍA', id: 9 },
      { name: 'ING. CIVIL', id: 10 },
      { name: 'OBSTETRICIA', id: 11 },
      { name: 'ARQUITECTURA', id: 12 },
      { name: 'PSICOLOGÍA', id: 13 },
      { name: 'INTELIGENCIA ARTIFICIAL', id: 14 },
      { name: 'ING. CIENCIA DE DATOS', id: 15 },
      { name: 'ODONTOLOGÍA', id: 16 },
      { name: 'ECONOMÍA', id: 17 },
      { name: 'CIBERSEGURIDAD Y ANÁLISIS FORENSE DIGITAL', id: 18 },
      { name: 'TURISMO Y HOTELERÍA', id: 19 },
      { name: 'CIENCIAS DE LA COMUNICACIÓN', id: 20 },
      { name: 'GESTIÓN DE RECURSOS HUMANOS', id: 21 },
    ];

    sessionStorage.setItem(storageKey, JSON.stringify(initialCareers));

    const pages = [];
    for (let i = 0; i < initialCareers.length; i += PAGE_SIZE) {
      pages.push(initialCareers.slice(i, i + PAGE_SIZE));
    }
    setCareersPages(pages);

  }, []);

  const totalPages = careersPages.length;
  const currentCareers = careersPages[currentPage - 1] || [];

  const nextPage = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  };

  const prevPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="min-h-[70vh] bg-white flex flex-col">
      <div className="max-w-7xl mx-auto flex-grow flex flex-col py-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12 tracking-tight">
          CARRERAS UNIVERSITARIAS
        </h1>

        <div className="flex flex-col flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-3 flex-grow">
            {currentCareers.map(career => (
              <button
                key={career.id}
                onClick={() => handleCareerClick(career.id)}
                className="bg-red-300 hover:bg-red-400 text-gray-900 font-bold px-6 py-4 rounded-2xl shadow-lg
                           transform hover:scale-105 transition-all duration-300 hover:shadow-2xl active:scale-95 text-center
                           text-sm md:text-base leading-tight"
              >
                {career.name}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`p-3 rounded-full transition-all duration-300 ${currentPage === 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-400 hover:bg-gray-500 active:scale-95'
              }`}
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <div className="text-3xl font-bold text-gray-700">{currentPage}</div>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`p-3 rounded-full transition-all duration-300 ${currentPage === totalPages
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-500 hover:bg-gray-600 active:scale-95'
              }`}
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="text-center mt-4 text-gray-600">
            Página {currentPage} de {totalPages}
          </div>
        </div>

        <SidebarNumeros currentPage={currentPage} totalPages={totalPages} goToPage={goToPage} />
      </div>
    </div>
  );
}

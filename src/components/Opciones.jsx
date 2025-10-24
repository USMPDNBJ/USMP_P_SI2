
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SidebarNumeros from './SidebarNumeros';

export default function Opciones4x4({ storedList, title, routex }) {
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
  const navigate = useNavigate();
  const [careersPages, setCareersPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Tamaño de página: cuántas carreras mostrar por página
  const PAGE_SIZE = 16;
  const location = useLocation();
  // const routesState = location.state?.routes;
  // Función para navegar cuando se hace clic en una carrera
  const handleCareerClick = (careerIdOrName) => {
    // careerIdOrName can be a number (id) or a name string; encode for the URL
    const value = encodeURIComponent(String(careerIdOrName));
    sessionStorage.setItem('careerId', String(careerIdOrName));
    navigate(`${routex}/${value}`);
  };

  // Cargar datos desde localStorage o inicializarlos
  useEffect(() => {
    // If caller passed storedList prop (JS array or JSON string), use it
    if (storedList) {
      try {
        if (Array.isArray(storedList)) {
          // If it's already paginated (array of pages), use directly
          if (Array.isArray(storedList[0])) {
            setCareersPages(storedList);
            return;
          }
          // Otherwise it's a flat array of careers -> paginate
          const pages = [];
          for (let i = 0; i < storedList.length; i += PAGE_SIZE) {
            pages.push(storedList.slice(i, i + PAGE_SIZE));
          }
          setCareersPages(pages);
          return;
        }

        // if it's a JSON string, try parse
        if (typeof storedList === 'string') {
          const parsed = JSON.parse(storedList);
          if (Array.isArray(parsed)) {
            if (Array.isArray(parsed[0])) {
              setCareersPages(parsed);
              return;
            }
            const pages = [];
            for (let i = 0; i < parsed.length; i += PAGE_SIZE) {
              pages.push(parsed.slice(i, i + PAGE_SIZE));
            }
            setCareersPages(pages);
            return;
          }
        }
      } catch (e) {
        console.error('Error parsing storedList prop', e);
      }
    }

    // Fallback: try reading from localStorage
    const storageKey = 'careersList';
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        let parsed = JSON.parse(stored);
        // If parsed is already paginated (array of pages), use directly
        if (Array.isArray(parsed) && Array.isArray(parsed[0])) {
          setCareersPages(parsed);
          return;
        }
        // Otherwise paginate flat array
        if (Array.isArray(parsed) && parsed.length > 0) {
          const pages = [];
          for (let i = 0; i < parsed.length; i += PAGE_SIZE) {
            pages.push(parsed.slice(i, i + PAGE_SIZE));
          }
          setCareersPages(pages);
          return;
        }
      } catch (e) {
        console.error('Error parsing careersList from localStorage', e);
      }
    }

    // default empty
    setCareersPages([]);
  }, [storedList]);

  const totalPages = careersPages.length;
  const titleC = title;
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
      <div className="max-w-7xl mx-auto flex-grow flex flex-col">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-red-700 mb-12 tracking-tight">
          {titleC}
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
      </div>
    </div>
  );
}
export function Opciones1x1({ storedList, title, routex }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [careersPages, setCareersPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Mostrar 2 elementos por página
  const PAGE_SIZE = 2;
  const routesState = location.state?.routes;


  const parseAndPaginate = (arr) => {
    if (!Array.isArray(arr)) return [];
    // si ya es array de páginas
    if (Array.isArray(arr[0])) return arr;
    const pages = [];
    for (let i = 0; i < arr.length; i += PAGE_SIZE) {
      pages.push(arr.slice(i, i + PAGE_SIZE));
    }
    return pages;
  };

  useEffect(() => {
    // Priorizar prop storedList
    if (storedList) {
      try {
        if (Array.isArray(storedList)) {
          setCareersPages(parseAndPaginate(storedList));
          return;
        }
        if (typeof storedList === 'string') {
          const parsed = JSON.parse(storedList);
          setCareersPages(parseAndPaginate(parsed));
          return;
        }
      } catch (e) {
        console.error('Opciones1x1: error parsing storedList', e);
      }
    }

    // fallback a localStorage
    try {
      const raw = localStorage.getItem('careersList');
      if (raw) {
        const parsed = JSON.parse(raw);
        setCareersPages(parseAndPaginate(parsed));
        return;
      }
    } catch (e) {
      console.error('Opciones1x1: error reading careersList from localStorage', e);
    }

    setCareersPages([]);
  }, [storedList]);

  const currentCareers = careersPages[currentPage - 1] || [];

  const handleCareerClick = (careerIdOrName) => {
    const value = encodeURIComponent(String(careerIdOrName));
    sessionStorage.setItem('situacionId', String(careerIdOrName));
    navigate(`/${(routex || 'carrera')}/${value}`);
  };

  return (
    <div className="min-h-[40vh] bg-white flex flex-col">
      <div className="max-w-xl mx-auto w-full py-8">
        <h1 className="text-3xl font-bold text-center text-red-700 mb-8">{title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {currentCareers.map(career => (
            <button
              key={career.id}
              onClick={() => handleCareerClick(career.id)}
              className="text-center bg-red-300 hover:bg-red-400 text-gray-900 font-bold py-8 rounded-2xl shadow-lg
                         transform hover:scale-105 transition-all duration-300 hover:shadow-2xl active:scale-95 text-left">
              <div className="text-xl md:text-2xl">{career.name}</div>
              {career.descripcion1 && <div className="mt-2 text-sm text-gray-700">{career.descripcion1}</div>}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
// src/components/SidebarNumeros.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function SidebarNumeros({ currentPage, totalPages, goToPage }) {
  const navigate = useNavigate();

  const handleClick = () => {

    navigate('/');

    // Puedes agregar más rutas según el nombre si lo deseas
  };

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
      {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => num <= totalPages && goToPage(num)}
          className={`w-12 h-12 rounded-lg font-bold text-lg transition-all duration-300 ${num === currentPage
            ? 'bg-gray-800 text-white shadow-lg scale-110'
            : num <= totalPages
              ? 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              : 'bg-gray-500 text-gray-400 cursor-not-allowed'
            }`}
          disabled={num > totalPages}
        >
          {num}
        </button>
      ))}
      <button
        onClick={handleClick}
        className="bg-red-700 rounded-lg w-12 h-12 font-bold text-4xl">
        <svg fill="#ffffffff" viewBox="-5 -5 35 35" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M4,12a1,1,0,0,1-2,0A9.983,9.983,0,0,1,18.242,4.206V2.758a1,1,0,1,1,2,0v4a1,1,0,0,1-1,1h-4a1,1,0,0,1,0-2h1.743A7.986,7.986,0,0,0,4,12Zm17-1a1,1,0,0,0-1,1A7.986,7.986,0,0,1,7.015,18.242H8.757a1,1,0,1,0,0-2h-4a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V19.794A9.984,9.984,0,0,0,22,12,1,1,0,0,0,21,11Z"></path></g></svg>
      </button>
    </div>
  );
}

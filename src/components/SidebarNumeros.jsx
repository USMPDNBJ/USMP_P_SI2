// src/components/SidebarNumeros.jsx
import React from 'react';

export default function SidebarNumeros({ currentPage, totalPages, goToPage }) {
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
      {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => num <= totalPages && goToPage(num)}
          className={`w-12 h-12 rounded-lg font-bold text-lg transition-all duration-300 ${
            num === currentPage
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
    </div>
  );
}

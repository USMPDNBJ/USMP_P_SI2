
import React, { useState } from 'react';


export default function Button1({ colorC, nombre, onClick }) {

    return (
        <button
            onClick={onClick}
            className={`  
      bg-red-700
      font-bold text-white rounded-2xl shadow-lg px-20 py-5 
      text-2xl text-center leading-tight
      transform hover:scale-105 transition-all duration-300 
      hover:shadow-2xl active:scale-95 my-2 ${colorC} 
        `}>
            {nombre}
        </button>
    );
}

// src/components/SidebarNumeros.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function SidebarNumeros({ home, currentPage, totalPages, goToPage, lengthReq, routes = {} }) {
  const navigate = useNavigate();

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
      <ButtonHome route={home} />
      {Array.from({ length: lengthReq }, (_, i) => i + 1).map((num) => {
        const target = routes && routes[num];
        return (
          <button
            key={num}
            onClick={() => {
              if (target) return navigate(target);
              return null;
            }}
            className={`w-12 h-12 rounded-lg font-bold  text-lg transition-all duration-300 ${num === currentPage
              ? 'bg-black text-white shadow-lg scale-110'
              : num <= totalPages
                ? 'bg-black-300 text-black-700 hover:bg-gray-400'
                : 'bg-black-500 text-white-400'
              }`}
          >
            {num}
          </button>
        );
      })}
      <ButtonReiniciar />
    </div>
  );
}
export function ButtonReiniciar() {
  const navigate = useNavigate();
  // Allow parent to override reset route via element props? Keep simple: navigate to '/'

  return (
    <button
      onClick={() => navigate('/')}
      className="bg-red-700 rounded-lg w-12 h-12 font-bold text-4xl">
      <svg fill="#ffffffff" viewBox="-5 -5 35 35" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M4,12a1,1,0,0,1-2,0A9.983,9.983,0,0,1,18.242,4.206V2.758a1,1,0,1,1,2,0v4a1,1,0,0,1-1,1h-4a1,1,0,0,1,0-2h1.743A7.986,7.986,0,0,0,4,12Zm17-1a1,1,0,0,0-1,1A7.986,7.986,0,0,1,7.015,18.242H8.757a1,1,0,1,0,0-2h-4a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V19.794A9.984,9.984,0,0,0,22,12,1,1,0,0,0,21,11Z"></path></g></svg>
    </button>
  );
}
export function ButtonHome({route}) {
  const navigate = useNavigate();
  // Allow parent to override reset route via element props? Keep simple: navigate to '/'

  return (
    <button
      onClick={() => navigate(route)}
      className="">
      <svg width="50px" height="50px" viewBox="-4.16 -4.16 24.32 24.32" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#c42727" stroke-width="0.00016"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)"><rect x="-4.16" y="-4.16" width="24.32" height="24.32" rx="2.9184" fill="#9f191f" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0L0 6V8H1V15H4V10H7V15H15V8H16V6L14 4.5V1H11V2.25L8 0ZM9 10H12V13H9V10Z" fill="#ffffff"></path> </g></svg>
    </button>
  );
}

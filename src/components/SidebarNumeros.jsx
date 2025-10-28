// src/components/SidebarNumeros.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function SidebarNumeros({ home, currentPage, totalPages, routes = {} }) {
  const navigate = useNavigate();
  const lengthReq = Object.keys(routes).length;
  return (
    <div className="fixed top-[25vh] right-0 flex flex-col gap-2 mx-5">
      <ButtonHome route={() => navigate(home)} />
      {Array.from({ length: lengthReq }, (_, i) => i + 1).map((num) => {
        const target = routes && routes[num];
        return (
          <button
            key={num}
            onClick={() => {
              if (target) return navigate(target, { state: { routes } });
              return null;
            }}
            className={`w-12 h-12 rounded-lg font-bold  text-lg transition-all duration-300 ${num === currentPage
              ? 'bg-red-800 text-white shadow-lg scale-110'
              : num <= totalPages
                ? 'bg-black-300 text-black-700 hover:bg-gray-400'
                : 'bg-black-500 text-white-400'
              }`}
          >
            {num}
          </button>
        );
      })}
    </div>
  );
}
export function ButtonReiniciar() {
  const navigate = useNavigate();
  // Allow parent to override reset route via element props? Keep simple: navigate to '/'

  return (
    <button
      onClick={() => navigate('/')}
    >
      <svg width="50px" height="50px" viewBox="-4.16 -4.16 24.32 24.32" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000ff" stroke-width="0.00016"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)"><rect x="-4.16" y="-4.16" width="24.32" height="24.32" rx="2.9184" fill="#000000ff" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0L0 6V8H1V15H4V10H7V15H15V8H16V6L14 4.5V1H11V2.25L8 0ZM9 10H12V13H9V10Z" fill="#ffffff"></path> </g></svg>
    </button>
  );
}
export function ButtonHome({ colorC, route }) {
  const navigate = useNavigate();
  // Allow parent to override reset route via element props? Keep simple: navigate to '/'

  return (
    <button
      onClick={route}
      className="">
      <svg width="50px" height="50px" viewBox="-4.16 -4.16 24.32 24.32" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#c42727" stroke-width="0.00016"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(0,0), scale(1)"><rect x="-4.16" y="-4.16" width="24.32" height="24.32" rx="2.9184" fill="#9f191f" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0L0 6V8H1V15H4V10H7V15H15V8H16V6L14 4.5V1H11V2.25L8 0ZM9 10H12V13H9V10Z" fill="#ffffff"></path> </g></svg>
    </button>
  );
}

import Opciones4x4 from "../components/Opciones";
import SidebarNumeros from "../components/SidebarNumeros";

export default function CarrerasUnivChat() {
  const storageKey = 'careersList';
  const getStored = localStorage.getItem(storageKey);
  return (

    <div>
      <Opciones4x4
        title={'1. SELECCIONE LA CARRERA UNIVERSITARIA'}
        storedList={getStored}
        routex={'/carrera'}
      />
      <SidebarNumeros currentPage={1}
        home={'/chatInicio'}
        routes={
          {
            1: '/carrerasUnivChat',
          }} />
    </div>
  );
}

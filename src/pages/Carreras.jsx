import Opciones4x4 from "../components/Opciones";

export default function CarrerasUnivChat() {
  const storageKey = 'careersList';
  const getStored = localStorage.getItem(storageKey);
  return (
    <Opciones4x4
      title={'1. SELECCIONE LA CARRERA UNIVERSITARIA'}
      storedList={getStored}
      routex={'/carrera'}
    />
  );
}
export function CarrerasUnivLlam() {
  const storageKey = 'careersList';
  const getStored = localStorage.getItem(storageKey);
  return (
    <Opciones4x4
      title={'1. SELECCIONE LA CARRERA UNIVERSITARIA'}
      storedList={getStored}
      routex={'/llamada'}
    />
  );
}

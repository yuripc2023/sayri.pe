export type SectorMascotAsset = { src: string; personality: string; role: string }

// Static URLs let Vite fingerprint each render; the slider mounts only nearby portraits.
export const sectorMascots: Record<string, SectorMascotAsset> = {
  'elecciones': { src: new URL('../img/mascot/sectors/poses-v2/elecciones.webp', import.meta.url).href, personality: 'Imparcial · Organizado', role: 'Coordinador electoral' },
  'comercial': { src: new URL('../img/mascot/sectors/poses-v2/comercial.webp', import.meta.url).href, personality: 'Ágil · Persuasivo', role: 'Consultor comercial' },
  'distribucion-logistica': { src: new URL('../img/mascot/sectors/poses-v2/distribucion-logistica.webp', import.meta.url).href, personality: 'Resolutivo · Organizado', role: 'Coordinador logístico' },
  'droguerias': { src: new URL('../img/mascot/sectors/poses-v2/droguerias.webp', import.meta.url).href, personality: 'Meticuloso · Confiable', role: 'Especialista farmacéutico' },
  'ferreterias': { src: new URL('../img/mascot/sectors/poses-v2/ferreterias.webp', import.meta.url).href, personality: 'Práctico · Fuerte', role: 'Experto en herramientas' },
  'odontologia': { src: new URL('../img/mascot/sectors/poses-v2/odontologia.webp', import.meta.url).href, personality: 'Preciso · Cercano', role: 'Especialista dental' },
  'agroindustria': { src: new URL('../img/mascot/sectors/poses-v2/agroindustria.webp', import.meta.url).href, personality: 'Paciente · Observador', role: 'Especialista de campo' },
  'colegios-profesionales': { src: new URL('../img/mascot/sectors/poses-v2/colegios-profesionales.webp', import.meta.url).href, personality: 'Institucional · Integrador', role: 'Representante profesional' },
  'educacion': { src: new URL('../img/mascot/sectors/poses-v2/educacion.webp', import.meta.url).href, personality: 'Curioso · Motivador', role: 'Guía del aprendizaje' },
  'estudios-juridicos': { src: new URL('../img/mascot/sectors/poses-v2/estudios-juridicos.webp', import.meta.url).href, personality: 'Analítico · Justo', role: 'Asesor jurídico' },
  'planta-de-produccion': { src: new URL('../img/mascot/sectors/poses-v2/planta-de-produccion.webp', import.meta.url).href, personality: 'Metódico · Inventivo', role: 'Ingeniero de producción' },
  'restaurantes': { src: new URL('../img/mascot/sectors/poses-v2/restaurantes.webp', import.meta.url).href, personality: 'Creativo · Cálido', role: 'Chef' },
  'transporte-pasajeros': { src: new URL('../img/mascot/sectors/poses-v2/transporte-pasajeros.webp', import.meta.url).href, personality: 'Atento · Puntual', role: 'Conductor de pasajeros' },
  'cocheras': { src: new URL('../img/mascot/sectors/poses-v2/cocheras.webp', import.meta.url).href, personality: 'Servicial · Ordenado', role: 'Guardián del acceso' },
}

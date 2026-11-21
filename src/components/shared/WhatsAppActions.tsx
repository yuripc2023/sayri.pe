import { useLocation } from 'react-router-dom'
import { contact } from '../../config/contact'
import { pageSeo, siteUrl } from '../../config/seo'
import { solutions } from '../../data/solutions'

function whatsappUrl(message: string) {
  return `https://wa.me/?text=${encodeURIComponent(message)}`
}

export function WhatsAppActions() {
  const location = useLocation()
  const pathname = location.pathname.replace(/\/$/, '') || '/'
  const page = pageSeo(pathname)
  const pageUrl = page.canonical
  const solution = solutions.find(item => pathname === `/soluciones/${item.slug}`)
  const pageTitle = solution?.name ?? (pathname === '/' ? 'SAYRI' : page.title.split('|')[0].trim())
  const contactMessage = solution
    ? `Hola, quisiera conocer ${solution.name} y solicitar una demostración.`
    : 'Hola, quisiera conocer Sayri y solicitar una demostración.'
  const shareDescriptions: Record<string, string> = {
    ferreterias: 'Ordena catálogo, inventario por tienda, compras, ventas y caja. Revisa costos y rentabilidad para tomar mejores decisiones en tu ferretería.',
    comercial: 'Conecta ventas, compras, inventario, facturación, cobranzas y caja para tener una visión clara de tu operación comercial.',
    'distribucion-logistica': 'Organiza vehículos, cargas, programación y entregas para conectar la operación logística con el inventario.',
    droguerias: 'Gestiona medicamentos, lotes y vencimientos, compras, inventario y pedidos de venta desde una misma plataforma.',
    odontologia: 'Organiza pacientes, citas, registros clínicos, recetas y cobros para acompañar la atención de tu consultorio dental.',
    agroindustria: 'Conecta catálogo, compras, inventario por lotes, ventas, distribución y tareas de tu operación agroindustrial.',
    'colegios-profesionales': 'Conecta el padrón de colegiados, cuotas, cobranza y servicios institucionales en una gestión integrada.',
    educacion: 'Organiza alumnos, docentes, admisión, matrículas, certificados y cobranza para tu institución educativa.',
    'estudios-juridicos': 'Conecta clientes, agenda, tareas, documentos y cobranza para acompañar la gestión de tu estudio jurídico.',
    'planta-de-produccion': 'Conecta materiales, compras, inventario por lotes, tareas, ventas y despachos para tu planta de producción.',
    restaurantes: 'Organiza carta, ambientes, mesas, pedidos y caja para acompañar la gestión diaria de tu restaurante.',
    'transporte-pasajeros': 'Organiza flota y administración, con opciones para gestionar viajes, asientos, reservas y boletos de pasajeros.',
    cocheras: 'Gestiona espacios, vehículos, estadías, tarifas, pagos y caja para tener tu cochera bajo control.',
    elecciones: 'Organiza procesos electorales, administra padrones y consulta resultados con votación asistida e identificada.',
  }
  const shareDescription = solution ? shareDescriptions[solution.slug] ?? solution.description : page.description
  const shareMessage = `${pageTitle}\n${shareDescription}\nConoce más: ${pageUrl}`
  const shareFallback = whatsappUrl(shareMessage)

  async function sharePage() {
    if (navigator.share) {
      try {
        await navigator.share({ text: shareMessage })
        return
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return
      }
    }
    window.open(shareFallback, '_blank', 'noopener,noreferrer')
  }

  return <div className="whatsapp-actions" aria-label="Acciones de WhatsApp">
    <button className="whatsapp-action whatsapp-share" type="button" onClick={sharePage} aria-label="Compartir esta página por WhatsApp" title="Compartir esta página">
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a3.3 3.3 0 0 0 0-1.39l7.05-4.11A3 3 0 1 0 15 5c0 .23.03.46.08.67L8.03 9.78a3 3 0 1 0 0 4.44l7.12 4.16c-.05.2-.08.41-.08.62a2.93 2.93 0 1 0 2.93-2.92Z"/></svg>
    </button>
    <a className="whatsapp-action whatsapp-chat" href={`https://wa.me/51999669634?text=${encodeURIComponent(contactMessage)}`} target="_blank" rel="noopener noreferrer" aria-label={`Contactar por WhatsApp sobre ${solution?.name ?? 'SAYRI'}`} title="Contactar por WhatsApp">
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.88 11.88 0 0 0 12.05 0C5.47 0 .11 5.35.11 11.93c0 2.1.55 4.16 1.59 5.97L0 24l6.25-1.64a11.94 11.94 0 0 0 5.8 1.48h.01c6.58 0 11.94-5.35 11.94-11.93c0-3.19-1.24-6.18-3.48-8.43ZM12.06 21.82h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.71.97.99-3.62-.24-.37a9.87 9.87 0 0 1-1.51-5.28c0-5.47 4.45-9.91 9.92-9.91a9.85 9.85 0 0 1 7.01 2.9 9.84 9.84 0 0 1 2.9 7.01c0 5.46-4.45 9.89-9.95 9.89Zm5.44-7.41c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.08 4.5.71.3 1.27.48 1.7.62.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>
    </a>
  </div>
}

import { useState, type CSSProperties, type KeyboardEvent } from 'react'
import mascot from '../../img/mascot/evolution/organizamos.webp'
import './evolution.css'

const situations = [
  { id: 'pedidos', label: 'Pedidos por mensaje', before: 'Cada pedido, en una conversación.', beforeDetail: 'Los productos, cantidades y observaciones quedan repartidos entre mensajes, notas y audios.', beforeNodes: ['Mensajes', 'Notas', 'Audios'], after: 'Un pedido listo para continuar.', afterDetail: 'Registra los detalles del pedido y ponlos a disposición de los procesos que siguen.', afterNodes: ['Cliente', 'Pedido', 'Operación'], outcome: 'Dale continuidad al pedido desde que lo recibes.' },
  { id: 'digitacion', label: 'Doble digitación', before: 'La misma información, varias veces.', beforeDetail: 'Un pedido se recibe, se transcribe y vuelve a registrarse para que otra área pueda trabajar.', beforeNodes: ['Pedido', 'Transcripción', 'Otro registro'], after: 'Información que acompaña el proceso.', afterDetail: 'Comparte los registros entre los procesos conectados para aprovechar la información que tu equipo ya ingresó.', afterNodes: ['Registro', 'Consulta', 'Continuidad'], outcome: 'Revisa dónde puedes evitar volver a digitar los mismos datos.' },
  { id: 'areas', label: 'Información aislada', before: 'Cada área tiene una parte.', beforeDetail: 'Ventas, almacén y caja trabajan con archivos propios. Reunir la información requiere coordinación adicional.', beforeNodes: ['Ventas', 'Almacén', 'Caja'], after: 'Áreas que trabajan conectadas.', afterDetail: 'Relaciona la información de las áreas alrededor de una misma operación y sus permisos de acceso.', afterNodes: ['Ventas', 'Almacén', 'Caja'], outcome: 'Conecta a las personas con la información que necesitan.' },
  { id: 'reportes', label: 'Reportes manuales', before: 'Primero reunir. Después analizar.', beforeDetail: 'Preparar un reporte implica buscar archivos, consolidar hojas y revisar qué registros faltan.', beforeNodes: ['Archivos', 'Consolidación', 'Reporte'], after: 'Del registro a la consulta.', afterDetail: 'Consulta reportes a partir de la información registrada en SAYRI y dedica más atención a entender los resultados.', afterNodes: ['Registros', 'Consulta', 'Reporte'], outcome: 'Haz que los registros de tu operación también te ayuden a analizarla.' },
  { id: 'decisiones', label: 'Decisiones tardías', before: 'La información llega después.', beforeDetail: 'Conocer lo que ocurre depende de reunir novedades y esperar el siguiente resumen del equipo.', beforeNodes: ['Datos', 'Espera', 'Decisión'], after: 'Más contexto para decidir.', afterDetail: 'Da seguimiento a los registros e indicadores de tu operación para orientar tus próximos pasos.', afterNodes: ['Operación', 'Seguimiento', 'Decisión'], outcome: 'Acompaña tus decisiones con el seguimiento de tu operación.' },
]

export function OperationEvolution() {
  const [selected, setSelected] = useState(0)
  const situation = situations[selected]
  const navigate = (event: KeyboardEvent<HTMLDivElement>) => {
    let next: number
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (selected + 1) % situations.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (selected + situations.length - 1) % situations.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = situations.length - 1
    else return
    event.preventDefault()
    setSelected(next)
    event.currentTarget.querySelectorAll<HTMLButtonElement>('button')[next]?.focus()
  }

  return <section className="operation-evolution" aria-labelledby="evolution-title">
    <div className="evolution-heading"><div><p className="eyebrow">CUANDO LA OPERACIÓN CRECE</p><h2 id="evolution-title">Cuando tu negocio crece,<br/><em>tu forma de trabajar también puede evolucionar.</em></h2></div><p>Conecta lo que hoy resuelves entre mensajes, hojas de cálculo y tareas manuales.</p></div>
    <div className="evolution-selector-top"><p>¿Te resulta familiar?</p><span>ELIGE UNA SITUACIÓN <span aria-hidden="true">↓</span></span></div>
    <div className="evolution-options" role="group" aria-label="Situaciones de tu operación" onKeyDown={navigate}>{situations.map((item, index) => <button type="button" key={item.id} aria-pressed={selected === index} aria-controls="evolution-comparison" onClick={() => setSelected(index)}><span aria-hidden="true">0{index + 1}</span>{item.label}</button>)}</div>
    <div id="evolution-comparison" className="evolution-comparison" aria-live="polite" aria-atomic="true">
      <div className="evolution-board" key={situation.id}>
        <article className="evolution-panel evolution-fragmented"><div className="evolution-panel-label"><span><i/> SITUACIÓN ACTUAL</span><span aria-hidden="true">01</span></div><div className="evolution-process" aria-hidden="true">{situation.beforeNodes.map((node, index) => <span className="process-chip" key={node} style={{ '--item': index } as CSSProperties}><svg viewBox="0 0 24 24" fill="none"><path d="M6 3h9l4 4v14H6ZM14 3v5h5M9 12h7M9 16h5"/></svg>{node}</span>)}</div><h3>{situation.before}</h3><p>{situation.beforeDetail}</p></article>
        <div className="evolution-bridge" aria-hidden="true"><span className="evolution-bridge-line"/><img src={mascot} alt="" width="1254" height="1254" loading="lazy" decoding="async"/><span className="evolution-bridge-arrow">→</span></div>
        <article className="evolution-panel evolution-connected"><div className="evolution-panel-label"><span><i/> CON SAYRI</span><span aria-hidden="true">02</span></div><div className="evolution-process" aria-hidden="true">{situation.afterNodes.map((node, index) => <span className="process-chip" key={node} style={{ '--item': index } as CSSProperties}><svg viewBox="0 0 24 24" fill="none"><path d="m6 12 4 4 8-9"/></svg>{node}</span>)}</div><h3>{situation.after}</h3><p>{situation.afterDetail}</p></article>
      </div>
      <p className="evolution-outcome"><span aria-hidden="true">↗</span>{situation.outcome}</p>
    </div>
    <div className="evolution-contact"><p>Podemos empezar por un proceso concreto.</p><a href="#contacto">Identifiquemos qué proceso puedes mejorar primero <span aria-hidden="true">↗</span></a></div>
  </section>
}

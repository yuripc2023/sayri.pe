import { useRef, useState, type KeyboardEvent } from 'react'
import clienteMascot from '../../img/mascot/journey/cliente.webp'
import pedidoMascot from '../../img/mascot/journey/pedido.webp'
import stockMascot from '../../img/mascot/journey/stock.webp'
import procesamientoMascot from '../../img/mascot/journey/procesamiento.webp'
import facturacionMascot from '../../img/mascot/journey/facturacion.webp'
import cobranzaMascot from '../../img/mascot/journey/cobranza.webp'
import analiticaMascot from '../../img/mascot/journey/analitica.webp'
import decisionMascot from '../../img/mascot/journey/decision.webp'
import './journey.css'

const stages = [
  { name: 'Cliente', mascot: clienteMascot, pose: 'Saludando y presentando una ficha de cliente', icon: '♙', preview: 'Una necesidad inicia el recorrido', title: 'Todo empieza por conocer al cliente.', description: 'Un cliente solicita 20 unidades. Su información y las condiciones comerciales acompañan el pedido desde el inicio.', input: 'Solicitud de 20 unidades', output: 'Cliente y condiciones identificados', team: 'Equipo comercial' },
  { name: 'Pedido', mascot: pedidoMascot, pose: 'Registrando un pedido en una tablet', icon: '☷', preview: 'La solicitud se convierte en un pedido', title: 'Registra el pedido una sola vez.', description: 'El vendedor registra los productos y las cantidades solicitadas. El equipo consulta el mismo pedido para continuar la atención.', input: 'Cliente, productos y cantidades', output: 'Pedido registrado para su atención', team: 'Ventas' },
  { name: 'Stock', mascot: stockMascot, pose: 'Consultando cajas con un escáner', icon: '▦', preview: 'Se consulta la disponibilidad', title: 'Conoce qué puedes atender.', description: 'Almacén consulta la disponibilidad de las 20 unidades y detecta si es necesario coordinar una reposición o ajustar la atención.', input: 'Productos y cantidades del pedido', output: 'Disponibilidad para coordinar la entrega', team: 'Almacén' },
  { name: 'Procesamiento', mascot: procesamientoMascot, pose: 'Preparando y etiquetando una caja', icon: '⚙', preview: 'El equipo prepara la entrega', title: 'Coordina la preparación del pedido.', description: 'El equipo prepara las unidades disponibles y registra el avance de la atención. Ventas puede consultar cómo sigue el pedido.', input: 'Pedido y disponibilidad confirmada', output: 'Atención preparada y avance registrado', team: 'Operaciones' },
  { name: 'Facturación', mascot: facturacionMascot, pose: 'Presentando un comprobante y una calculadora', icon: '▤', preview: 'La operación tiene su comprobante', title: 'Mantén el comprobante ligado a la operación.', description: 'Los datos del cliente y del pedido sirven de referencia para emitir el comprobante según las condiciones de la venta.', input: 'Datos de la venta y del cliente', output: 'Comprobante e importe por cobrar', team: 'Facturación' },
  { name: 'Cobranza', mascot: cobranzaMascot, pose: 'Registrando un pago con tarjeta', icon: '＄', preview: 'Los pagos y saldos quedan visibles', title: 'Da seguimiento a lo que falta cobrar.', description: 'El equipo registra el pago o consulta el saldo pendiente de esta venta. La información acompaña el seguimiento con el cliente.', input: 'Importe y condiciones de pago', output: 'Pagos registrados y saldo actualizado', team: 'Finanzas' },
  { name: 'Analítica', mascot: analiticaMascot, pose: 'Examinando gráficos con una lupa', icon: '▥', preview: 'La operación aporta información', title: 'Convierte el recorrido en información útil.', description: 'La venta y su atención aportan datos para consultar productos vendidos, importes y saldos, junto con otras operaciones.', input: 'Registros de ventas, atención y pagos', output: 'Reportes e indicadores de la operación', team: 'Gestión' },
  { name: 'Decisión', mascot: decisionMascot, pose: 'Orientando el siguiente paso con una brújula', icon: '↗', preview: 'Tu equipo decide con contexto', title: 'Decide con una visión más completa.', description: 'Con información del recorrido, tu equipo puede evaluar qué reponer, qué clientes atender y qué cobros priorizar.', input: 'Reportes e indicadores disponibles', output: 'Prioridades para el siguiente paso', team: 'Dirección' },
]

export function OrderJourney() {
  const [selected, setSelected] = useState(0)
  const detail = useRef<HTMLDivElement>(null)
  const stage = stages[selected]
  const choose = (index: number) => {
    setSelected(index)
    if (window.matchMedia('(max-width: 650px)').matches) requestAnimationFrame(() => {
      detail.current?.focus({ preventScroll: true })
      detail.current?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
    })
  }
  const navigate = (event: KeyboardEvent<HTMLOListElement>) => {
    let next: number
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (selected + 1) % stages.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (selected + stages.length - 1) % stages.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = stages.length - 1
    else return
    event.preventDefault()
    setSelected(next)
    event.currentTarget.querySelectorAll('button')[next]?.focus()
  }
  return <section className="order-journey" aria-labelledby="journey-title">
    <header className="journey-header">
      <div><p className="eyebrow">UNA OPERACIÓN, UNA MISMA INFORMACIÓN</p><h2 id="journey-title">Un pedido conecta <span>toda tu empresa.</span></h2></div>
      <p>Desde el primer contacto hasta la decisión final, cada área trabaja con la misma información.</p>
    </header>
    <div className="journey-intro"><span>UN EJEMPLO · 20 UNIDADES, UN MISMO PEDIDO</span><p>Elige una etapa y sigue el recorrido de la información.</p></div>
    <ol className="journey-stages" onKeyDown={navigate} aria-label="Etapas de un pedido">
      {stages.map((item, index) => <li key={item.name} className={selected === index ? 'journey-active' : ''}>
        <button type="button" aria-pressed={selected === index} aria-controls="journey-detail" onClick={() => choose(index)}>
          <span className="journey-card-top"><span className="journey-icon" aria-hidden="true">{item.icon}</span><span className="journey-number">0{index + 1}</span></span>
          <strong>{item.name}</strong><span className="journey-preview">{item.preview}</span>
          <span className="journey-action">{selected === index ? 'Explorando' : 'Ver etapa'}<span aria-hidden="true">{selected === index ? '✓' : '→'}</span></span>
        </button><span className="journey-connector" aria-hidden="true">→</span>
      </li>)}
    </ol>
    <div className="journey-detail" id="journey-detail" ref={detail} tabIndex={-1} aria-labelledby="journey-detail-title">
      <div className="journey-copy">
        <div key={stage.name} className="journey-content" aria-live="polite" aria-atomic="true">
          <p className="journey-kicker">0{selected + 1} / {stage.name} <span>· {stage.team}</span></p>
          <h3 id="journey-detail-title">{stage.title}</h3><p className="journey-description">{stage.description}</p>
          <dl className="journey-handoff"><div><dt>INFORMACIÓN QUE RECIBE</dt><dd>{stage.input}</dd></div><div><dt>LO QUE ENTREGA</dt><dd>{stage.output}</dd></div></dl>
        </div>
        <div className="journey-controls" role="group" aria-label="Recorrer las etapas">
          <button type="button" disabled={selected === 0} onClick={() => setSelected(i => i - 1)}>← Anterior</button><span>0{selected + 1} / 08</span><button type="button" disabled={selected === stages.length - 1} onClick={() => setSelected(i => i + 1)}>Siguiente etapa →</button>
        </div>
      </div>
      <div className="journey-guide" aria-hidden="true"><div className="journey-orbit"><span>20</span><small>UNIDADES</small></div><img key={stage.name} src={stage.mascot} alt="" title={stage.pose} width="1254" height="1254" loading="lazy" decoding="async" /><p>Un mismo pedido.<br />Información que acompaña a tu equipo.</p></div>
    </div>
    <footer className="journey-footer"><p>La información avanza. <strong>Tu equipo también.</strong></p><a href="#contacto">Ver cómo aplicarlo a mi negocio <span aria-hidden="true">↗</span></a></footer>
    <p className="journey-note">Recorrido ilustrativo: las etapas se adaptan a los procesos de cada empresa.</p>
  </section>
}

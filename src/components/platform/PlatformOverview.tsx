import { useState, type KeyboardEvent } from 'react'
import { ScheduleDemoButton } from '../shared/ScheduleDemoButton'
import logoDark from '../../img/logo-sayri-dark.png'
import logoWhite from '../../img/logo-sayri-white.png'
import './platform.css'

const modules = [
  { id: 'ventas', name: 'Ventas', x: 50, y: 10, icon: 'M4 19V10h4v9m2 0V6h4v13m2 0V3h4v16', title: 'De la oportunidad al pedido.', description: 'Conecta clientes, cotizaciones y pedidos para acompañar cada venta con información de tu operación.', features: ['Clientes y CRM', 'Cotizaciones', 'Pedidos'] },
  { id: 'inventarios', name: 'Inventarios', x: 87, y: 38, icon: 'm3 7 9-4 9 4v10l-9 4-9-4Zm0 0 9 4 9-4m-9 4v10M7 5l10 4', title: 'Conoce lo que tienes. Planifica lo que sigue.', description: 'Relaciona productos, almacenes y movimientos para consultar existencias y coordinar compras con ventas.', features: ['Productos', 'Almacenes', 'Movimientos'] },
  { id: 'operaciones', name: 'Operaciones', x: 73, y: 83, icon: 'M3 4h6v6H3Zm12 10h6v6h-6ZM6 10v7h9M15 4h6v6h-6ZM9 7h6', title: 'Haz que cada proceso continúe al siguiente.', description: 'Coordina compras, tareas y procesos de tu rubro con la información que necesitan las personas que los ejecutan.', features: ['Compras', 'Procesos', 'Coordinación'] },
  { id: 'finanzas', name: 'Finanzas', x: 27, y: 83, icon: 'M3 7h18v13H3Zm0 0V4h14v3m0 5h4m-4 0a2 2 0 1 0 0 4h4', title: 'Tu gestión financiera, con contexto.', description: 'Conecta la facturación, la caja y las cuentas por cobrar para dar seguimiento al movimiento de tu negocio.', features: ['Facturación', 'Caja', 'Cuentas por cobrar'] },
  { id: 'inteligencia', name: 'Inteligencia', x: 13, y: 38, icon: 'M4 20V4m0 16h17M8 15l4-5 4 2 5-7', title: 'Transforma información en decisiones.', description: 'Reúne los datos de tu operación en reportes e indicadores para entender resultados e identificar oportunidades.', features: ['Reportes', 'Indicadores', 'Analítica'] },
]

export function PlatformOverview() {
  const [selected, setSelected] = useState(0)
  const module = modules[selected]
  const navigate = (event: KeyboardEvent<HTMLDivElement>) => {
    let next: number
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (selected + 1) % modules.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (selected + modules.length - 1) % modules.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = modules.length - 1
    else return
    event.preventDefault()
    setSelected(next)
    event.currentTarget.querySelectorAll<HTMLButtonElement>('button')[next]?.focus()
  }

  return <section className="platform-overview" aria-labelledby="experience-cta-title">
    <div className="platform-layout">
      <div className="platform-copy"><p className="eyebrow">SAYRI · TU EMPRESA CONECTADA</p>
        <h2 id="experience-cta-title">Tu operación conectada.<br/><em>Tu empresa bajo control.</em></h2>
        <p className="platform-description">Conecta ventas, inventarios, operaciones y finanzas. Empieza por lo que necesitas y amplía SAYRI al ritmo de tu empresa.</p>
        <div className="platform-promise"><span aria-hidden="true">+</span><p>Un proceso hoy.<br/><strong>Más posibilidades para lo que viene.</strong></p></div>
        <div className="platform-actions"><ScheduleDemoButton /><a className="text-link" href="#plataforma">Explorar la plataforma <span aria-hidden="true">↓</span></a></div>
      </div>
      <div className="platform-visual">
        <div className="platform-visual-top"><span>UN NÚCLEO. TODA TU OPERACIÓN.</span><span><i/> CONECTADOS</span></div>
        <div className="platform-diagram" role="group" aria-label="Explora los módulos de SAYRI" onKeyDown={navigate}>
          <svg className="platform-connections" viewBox="0 0 500 440" aria-hidden="true">
            <ellipse className="platform-orbit" cx="250" cy="211" rx="168" ry="152"/>
            {modules.map((item, index) => <path key={item.id} className={selected === index ? 'connection-active' : ''} d={`M250 211 L${item.x * 5} ${item.y * 4.4}`}/>)}
          </svg>
          <div className="platform-core" aria-hidden="true"><span className="core-ring"/><div><img className="core-logo-light" src={logoDark} alt="" width="108"/><img className="core-logo-dark" src={logoWhite} alt="" width="108"/><span>NÚCLEO COMPARTIDO</span></div></div>
          {modules.map((item, index) => <button type="button" key={item.id} className="platform-node" style={{ left: `${item.x}%`, top: `${item.y}%` }} aria-pressed={selected === index} aria-controls="platform-module-detail" onClick={() => setSelected(index)}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={item.icon}/></svg><span>{item.name}</span></button>)}
        </div>
        <p className="platform-hint">Elige un módulo y descubre cómo se conecta <span aria-hidden="true">↗</span></p>
        <div className="platform-module-detail" id="platform-module-detail" aria-live="polite" aria-atomic="true"><div className="module-detail-top"><span>{module.name}</span><span aria-hidden="true">0{selected + 1} / 05</span></div><h3>{module.title}</h3><p>{module.description}</p><ul>{module.features.map(feature => <li key={feature}><span aria-hidden="true">+</span>{feature}</li>)}</ul></div>
      </div>
    </div>
  </section>
}

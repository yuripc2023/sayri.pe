import { useState, type KeyboardEvent } from 'react'
import mascot from '../../img/mascot/growth/construimos.webp'
import './growth.css'

const levels = [
  { id: 'dato', name: 'Dato', title: 'Empieza por información concreta.', description: 'Un producto, una cantidad y un cliente son el punto de partida para registrar lo que ocurre en tu negocio.', example: 'Producto, cantidad y cliente', tags: ['Producto', 'Cantidad', 'Cliente'] },
  { id: 'microproceso', name: 'Microproceso', title: 'Resuelve una tarea del día a día.', description: 'Una acción específica puede ser tu primer paso: que el vendedor registre el pedido desde su celular.', example: 'Registrar un pedido desde el celular', tags: ['Vendedor', 'Pedido móvil', 'Registro'] },
  { id: 'proceso', name: 'Proceso', title: 'Conecta las acciones de un mismo recorrido.', description: 'Reúne el registro, la revisión y el seguimiento para acompañar la gestión de los pedidos.', example: 'Gestionar pedidos', tags: ['Registro', 'Revisión', 'Seguimiento'] },
  { id: 'capacidad', name: 'Capacidad', title: 'Dale más herramientas a tu operación.', description: 'Relaciona clientes, cotizaciones y pedidos para apoyar el trabajo comercial con información compartida.', example: 'Coordinar ventas', tags: ['Clientes', 'Cotizaciones', 'Pedidos'] },
  { id: 'area', name: 'Área', title: 'Organiza el trabajo de un equipo.', description: 'Conecta procesos comerciales, responsabilidades y consultas alrededor de los objetivos del área.', example: 'Conectar la gestión comercial', tags: ['Equipo', 'Procesos', 'Responsabilidades'] },
  { id: 'empresa', name: 'Empresa', title: 'Haz que la información acompañe a las áreas.', description: 'Relaciona ventas, almacén y finanzas para que la operación continúe con una misma información.', example: 'Integrar ventas, almacén y finanzas', tags: ['Ventas', 'Almacén', 'Finanzas'] },
  { id: 'inteligencia', name: 'Inteligencia', title: 'Aprende de la información que ya generas.', description: 'Consulta reportes e indicadores de la operación para entender resultados y orientar tus decisiones.', example: 'Analizar resultados para orientar decisiones', tags: ['Reportes', 'Indicadores', 'Decisiones'] },
]
const points = [{x:250,y:180}, {x:95,y:85}, {x:250,y:38}, {x:405,y:85}, {x:405,y:275}, {x:250,y:322}, {x:95,y:275}]

export function ProgressiveGrowth() {
  const [selected, setSelected] = useState(0)
  const level = levels[selected]
  const navigate = (event: KeyboardEvent<HTMLOListElement>) => {
    let next: number
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (selected + 1) % levels.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (selected + levels.length - 1) % levels.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = levels.length - 1
    else return
    event.preventDefault()
    setSelected(next)
    event.currentTarget.querySelectorAll<HTMLButtonElement>('button')[next]?.focus()
  }

  return <section className="progressive-growth" id="procesos" aria-labelledby="growth-title">
    <header className="growth-heading"><p className="eyebrow">CRECIMIENTO PROGRESIVO</p><h2 id="growth-title">Empieza con un proceso.<br/><em>Crece a tu ritmo.</em></h2><p>Resuelve una necesidad de hoy y conecta nuevas áreas cuando tu operación lo requiera.</p></header>
    <p className="growth-instruction">Explora las posibilidades. Puedes comenzar donde lo necesites.</p>
    <ol className="growth-levels" aria-label="Niveles de crecimiento de SAYRI" onKeyDown={navigate}>{levels.map((item,index) => <li key={item.id}><button type="button" className={index<=selected ? 'growth-reached' : ''} aria-pressed={selected===index} aria-controls="growth-detail" onClick={() => setSelected(index)}><span className="growth-index">{String(index+1).padStart(2,'0')}</span><span className="growth-level-name">{item.name}</span><span className="growth-level-indicator" aria-hidden="true">{selected===index ? '↗' : '+'}</span></button></li>)}</ol>
    <div className="growth-detail" id="growth-detail">
      <div className="growth-detail-copy" key={level.id} aria-live="polite" aria-atomic="true"><span className="growth-current">{String(selected+1).padStart(2,'0')} / {level.name}</span><h3>{level.title}</h3><p>{level.description}</p><div className="growth-example"><span>UN MISMO EJEMPLO QUE CRECE</span><strong>{level.example}</strong><ul>{level.tags.map(tag=><li key={tag}>{tag}</li>)}</ul></div></div>
      <div className="growth-visual"><div className="growth-network"><svg viewBox="0 0 500 360" fill="none" aria-hidden="true"><ellipse className="growth-network-orbit" cx="250" cy="180" rx="167" ry="145"/>{points.slice(1).map((point,index)=><path key={index} className={`growth-wire ${index+1<=selected ? 'wire-reached' : ''}`} d={`M250 180L${point.x} ${point.y}`}/>)}{points.map((point,index)=><g key={index} className={`growth-network-node ${index<=selected ? 'node-reached' : ''}`}><circle cx={point.x} cy={point.y} r={index===0 ? 43 : 21}/><text x={point.x} y={point.y+(index===0 ? 5 : 4)} textAnchor="middle">{index===0 ? 'SAYRI' : String(index+1).padStart(2,'0')}</text></g>)}</svg><span className="growth-network-caption">Un núcleo que suma conexiones.</span></div><img className="growth-mascot" src={mascot} alt="" width="1254" height="1254" loading="lazy" decoding="async"/></div>
    </div>
    <div className="growth-footer"><p>No necesitas implementarlo todo a la vez.</p><a href="#contacto">¿Por dónde necesita empezar tu empresa? <span aria-hidden="true">↗</span></a></div>
  </section>
}

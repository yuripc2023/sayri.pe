import { useState, type KeyboardEvent } from 'react'
import { ScheduleDemoButton } from '../shared/ScheduleDemoButton'
import logoDark from '../../img/logo-sayri-dark.png'
import logoWhite from '../../img/logo-sayri-white.png'
import './platform.css'

const modules = [
  { id: 'computadora', name: 'Computadora', x: 50, y: 10, icon: 'M3 4h18v13H3ZM8 21h8m-4-4v4', title: 'Tu gestión, desde el navegador.', description: 'Administra tu operación, consulta tablas y revisa reportes desde una computadora compatible. Accede con tu usuario, conexión a internet y los permisos correspondientes, sin instalar un programa de escritorio.', features: ['Administración', 'Reportes', 'Sin instalación de escritorio'] },
  { id: 'web-movil', name: 'Tablet y celular', x: 85, y: 48, icon: 'M4 3h10v18H4Zm13 5h5v13h-5M8 18h2', title: 'La web se adapta a tu pantalla.', description: 'Ingresa desde el navegador de tu tablet o celular a las pantallas adaptadas a estos dispositivos. Consulta y gestiona información desde donde estés, según las funciones disponibles para tu tarea.', features: ['Acceso web', 'Interfaz adaptable', 'Información centralizada'] },
  { id: 'app', name: 'App móvil', x: 50, y: 85, icon: 'M6 2h12v20H6ZM10 18h4m-3-13h2', title: 'Una experiencia para trabajar en movimiento.', description: 'La aplicación en React Native utiliza los servicios del backend central en Django. Permite consultar y actualizar información compartida con la web mediante las funciones móviles implementadas.', features: ['React Native', 'Tareas en campo', 'Servicios compartidos'] },
  { id: 'integraciones', name: 'Integraciones', x: 15, y: 48, icon: 'M8 7H3v10h5m8-10h5v10h-5M8 12h8m-5-3 3 3-3 3', title: 'Una base para conectar tus herramientas.', description: 'La API central facilita desarrollar conexiones con facturación, pagos y otros servicios. Cada integración se implementa según los requisitos del proveedor y de tu operación.', features: ['API central', 'Conexión de servicios', 'Reglas de negocio compartidas'] },
]

const benefits = [
  ['Accede desde donde estés', 'Trabaja desde el navegador de dispositivos compatibles, con conexión a internet y los permisos de tu usuario. Sin instalar un programa de escritorio en cada computadora.'],
  ['Tu equipo puede crecer', 'Una arquitectura escalable permite ampliar capacidad para acompañar más usuarios, operaciones y datos. La capacidad simultánea depende de la infraestructura y la carga de trabajo.'],
  ['Actualizaciones centralizadas', 'Las mejoras de la web se publican de forma centralizada y quedan disponibles sin una instalación manual en cada equipo. Menos instalaciones que mantener y una distribución más ágil de las mejoras.'],
  ['Una plataforma que evoluciona', 'Los desarrollos comunes realizados para distintas empresas pueden beneficiar a otras organizaciones, según sus módulos y configuración. Se comparten mejoras del producto; cada empresa conserva su propia información.'],
  ['Pantallas que se adaptan a tu trabajo', 'Los componentes reutilizables de React facilitan mejorar o personalizar partes de la interfaz. Las acciones pueden actualizar datos y secciones sin recargar toda la página, y la web puede evolucionar de forma independiente de la app.'],
  ['Web y app conectadas', 'React y React Native consultan y actualizan información mediante Django. Las reglas de negocio implementadas en el backend se comparten para mantener criterios consistentes entre ambos canales.'],
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

  return <section id="plataforma" className="platform-overview" aria-labelledby="experience-cta-title">
    <div className="platform-layout">
      <div className="platform-copy"><p className="eyebrow">SAYRI · TU EMPRESA CONECTADA</p>
        <h2 id="experience-cta-title">Tu empresa contigo.<br/><em>Desde donde estés.</em></h2>
        <p className="platform-description">Accede a SAYRI desde el navegador de tu computadora, tablet o celular, sin instalar un programa de escritorio. Tu equipo trabaja con información centralizada y una plataforma preparada para incorporar nuevas funciones conforme crece tu operación.</p>
        <div className="platform-promise"><span aria-hidden="true">+</span><p>Una arquitectura web que crece contigo.<br/><strong>Acceso con conexión a internet y permisos de usuario.</strong></p></div>
        <div className="platform-actions"><ScheduleDemoButton /><a className="text-link" href="#platform-benefits">Explorar la plataforma <span aria-hidden="true">↓</span></a></div>
      </div>
      <div id="platform-modules" className="platform-visual">
        <div className="platform-visual-top"><span>UNA BASE. DISTINTAS FORMAS DE TRABAJAR.</span><span><i/> CONECTADOS</span></div>
        <div className="platform-diagram" role="group" aria-label="Explora la arquitectura web de SAYRI" onKeyDown={navigate}>
          <svg className="platform-connections" viewBox="0 0 500 440" aria-hidden="true">
            <ellipse className="platform-orbit" cx="250" cy="211" rx="168" ry="152"/>
            {modules.map((item, index) => <path key={item.id} className={selected === index ? 'connection-active' : ''} d={`M250 211 L${item.x * 5} ${item.y * 4.4}`}/>)}
          </svg>
          <div className="platform-core" aria-hidden="true"><span className="core-ring"/><div><img className="core-logo-light" src={logoDark} alt="" width="108"/><img className="core-logo-dark" src={logoWhite} alt="" width="108"/><span>DATOS Y PROCESOS</span></div></div>
          {modules.map((item, index) => <button type="button" key={item.id} className="platform-node" style={{ left: `${item.x}%`, top: `${item.y}%` }} aria-pressed={selected === index} aria-controls="platform-module-detail" onClick={() => setSelected(index)}><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={item.icon}/></svg><span>{item.name}</span></button>)}
        </div>
        <p className="platform-stack">Django · Servicios centrales <span>React · Web</span><span>React Native · App</span></p>
        <p className="platform-hint">Elige un dispositivo o una integración <span aria-hidden="true">↗</span></p>
        <div className="platform-module-detail" id="platform-module-detail" aria-live="polite" aria-atomic="true"><div className="module-detail-top"><span>{module.name}</span><span aria-hidden="true">0{selected + 1} / 04</span></div><h3>{module.title}</h3><p>{module.description}</p><ul>{module.features.map(feature => <li key={feature}><span aria-hidden="true">+</span>{feature}</li>)}</ul></div>
      </div>
    </div>
    <div id="platform-benefits" className="platform-benefits" aria-labelledby="platform-benefits-title">
      <p className="eyebrow">TECNOLOGÍA QUE ACOMPAÑA TU OPERACIÓN</p>
      <h3 id="platform-benefits-title">Una base conectada. Más posibilidades para crecer.</h3>
      <div className="platform-benefit-grid">{benefits.map(([title, description], index) => <article key={title}><span className="platform-benefit-number" aria-hidden="true">0{index + 1}</span><h4>{title}</h4><p>{description}</p></article>)}</div>
    </div>
  </section>
}

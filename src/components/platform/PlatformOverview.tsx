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
  { tag: 'LIBERTAD PARA TRABAJAR', title: 'Tu empresa va contigo.', description: 'Abre el navegador y sigue con tu operación desde tu computadora, tablet o celular. Sin instalar un programa de escritorio.', note: 'Con conexión a internet, un dispositivo compatible y los permisos de tu usuario.', icon: 'M3 4h18v12H3ZM8 21h8m-4-5v5M8 8h8' },
  { tag: 'ESPACIO PARA CRECER', title: 'Más equipo. Más posibilidades.', description: 'Suma usuarios, procesos y datos sobre una arquitectura que permite ampliar su capacidad a medida que tu empresa crece.', note: 'La capacidad simultánea depende de la infraestructura y la carga de trabajo.', icon: 'M4 18V12h4v6m3 0V8h4v10m3 0V4h3v14M3 21h19' },
  { tag: 'MENOS INSTALACIONES', title: 'Las mejoras llegan a tu web.', description: 'Publicamos las actualizaciones de forma centralizada para que estén disponibles sin instalar una nueva versión en cada computadora.', note: 'Menos mantenimiento por equipo y una distribución más ágil de las mejoras.', icon: 'M19 7a8 8 0 1 0 1 9M19 3v5h-5M8 12l3 3 5-6' },
  { tag: 'EVOLUCIÓN COMPARTIDA', title: 'Una mejora puede impulsar a muchos.', description: 'Los desarrollos comunes para distintas empresas pueden incorporarse a SAYRI y aportar nuevas posibilidades a tu organización.', note: 'Según los módulos y la configuración. Se comparten mejoras del producto, no la información de cada empresa.', icon: 'M12 3v6m-3-3h6M5 12h6v7H5Zm9 0h6v7h-6M8 9v3m9-3v3M8 9h9' },
  { tag: 'FLEXIBILIDAD EN CADA PANTALLA', title: 'Tu forma de trabajar tiene espacio.', description: 'Los componentes de React facilitan mejorar o personalizar partes de la plataforma y actualizar información sin recargar toda la página.', note: 'La interfaz web puede evolucionar de forma independiente de la aplicación móvil.', icon: 'M3 4h18v16H3ZM3 9h18M9 9v11m4-7h5m-5 3h3' },
  { tag: 'UN MISMO PUNTO DE PARTIDA', title: 'Web y app, información conectada.', description: 'Tu equipo consulta y actualiza información desde ambos canales mediante los servicios centrales de Django.', note: 'React y React Native comparten las reglas de negocio implementadas en el backend.', icon: 'M2 4h12v10H2Zm4 14h4m-2-4v4M17 8h5v13h-5ZM5 7h6m7 11h3' },
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
      <div className="platform-benefits-heading"><div><p className="eyebrow">¿QUÉ CAMBIA EN TU DÍA A DÍA?</p><h3 id="platform-benefits-title">Menos barreras para trabajar.<br/><em>Más espacio para crecer.</em></h3></div><p>La tecnología importa por lo que te permite hacer. Descubre seis ventajas de trabajar con una plataforma conectada.</p></div>
      <div className="platform-benefit-grid">{benefits.map((benefit, index) => <article key={benefit.title}><div className="platform-benefit-top"><span className="platform-benefit-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d={benefit.icon}/></svg></span><span className="platform-benefit-number" aria-hidden="true">0{index + 1} / 06</span></div><p className="platform-benefit-tag">{benefit.tag}</p><h4>{benefit.title}</h4><p className="platform-benefit-description">{benefit.description}</p><p className="platform-benefit-note">{benefit.note}</p></article>)}</div>
      <div className="platform-benefits-next"><p>¿Cuál de estas ventajas necesita hoy tu empresa?</p><a className="text-link" href="#contacto">Conversemos sobre tu operación <span aria-hidden="true">↗</span></a></div>
    </div>
  </section>
}

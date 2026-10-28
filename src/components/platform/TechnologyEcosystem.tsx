import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import mascot from '../../img/mascot/technology/nucleo-v2.webp'
import postgres from '../../img/technology/postgresql.svg'
import python from '../../img/technology/python.svg'
import django from '../../img/technology/django.svg'
import react from '../../img/technology/react.svg'
import git from '../../img/technology/git.svg'
import './technology.css'
import { technologyDetails } from '../../data/technologyDetails'

const technologies = [
  { name: 'AWS', role: 'Infraestructura en la nube', description: 'La infraestructura que aloja los servicios de SAYRI y permite acompañar las necesidades de la operación.', example: 'Servicios que sostienen tu plataforma.', logo: '', color: '#ff9900', x: 29, y: 8 },
  { name: 'PostgreSQL', role: 'Gestión de datos', description: 'Organiza y relaciona los datos del negocio para que los procesos consulten una base de información consistente.', example: 'Clientes, productos y operaciones relacionados.', logo: postgres, color: '#4c92c5', x: 71, y: 8 },
  { name: 'Python', role: 'Lógica y automatización', description: 'Permite construir la lógica que transforma registros y tareas en procesos útiles para tu equipo.', example: 'Reglas y tareas de tu operación.', logo: python, color: '#f2c94c', x: 13, y: 33 },
  { name: 'Django', role: 'Servicios y reglas del negocio', description: 'Estructura los servicios que conectan la información con las funciones y reglas de cada proceso.', example: 'Una base organizada para desarrollar soluciones.', logo: django, color: '#36b78a', x: 87, y: 33 },
  { name: 'React', role: 'Experiencia web', description: 'Da forma a las pantallas web con las que tu equipo consulta información y gestiona su trabajo.', example: 'La operación desde el navegador.', logo: react, color: '#35b9df', x: 16, y: 64 },
  { name: 'React Native', role: 'Aplicación móvil', description: 'Permite llevar capacidades de SAYRI al celular para acompañar a las personas donde ocurre el trabajo.', example: 'Clientes y pedidos también fuera de la oficina.', logo: react, color: '#58a7ec', x: 84, y: 64 },
  { name: 'Git', role: 'Control de versiones', description: 'Registra los cambios del código y ayuda al equipo de desarrollo a coordinar su evolución con trazabilidad.', example: 'Cambios con historia y seguimiento.', logo: git, color: '#f16a50', x: 35, y: 88 },
  { name: 'CI/CD', role: 'Integración y despliegue continuos', description: 'Conecta la integración del código con verificaciones y pasos de publicación para acompañar las actualizaciones.', example: 'Un proceso de entrega organizado.', logo: '', color: '#a79cec', x: 65, y: 88 },
]

function Emblem({ index }: { index: number }) {
  const item = technologies[index]
  if (item.name === 'AWS') return <span className="technology-aws" aria-hidden="true">aws<svg viewBox="0 0 50 14"><path d="M3 3Q25 17 45 3m-8 0 9-1-2 8" /></svg></span>
  if (item.name === 'CI/CD') return <svg className="technology-cycle" viewBox="0 0 52 36" aria-hidden="true"><path d="M26 18C15-1 2 4 2 18s13 19 24 0S50 4 50 18s-13 19-24 0ZM12 7l5 1-1 5M37 24l-1 5 5-1" /></svg>
  return <span className={item.name === 'React Native' ? 'technology-native' : 'technology-logo'} aria-hidden="true"><img src={item.logo} alt="" width="32" height="32" /></span>
}

export function TechnologyEcosystem() {
  const [selected, setSelected] = useState(0)
  const detail = useRef<HTMLDivElement>(null)
  const choose = (index: number) => {
    setSelected(index)
    if (window.matchMedia('(max-width: 650px)').matches) requestAnimationFrame(() => {
      detail.current?.focus({ preventScroll: true })
      detail.current?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
    })
  }
  const item = technologies[selected]
  const info = technologyDetails[item.name]
  const navigate = (event: KeyboardEvent<HTMLUListElement>) => {
    let next: number
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (selected + 1) % technologies.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (selected + technologies.length - 1) % technologies.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = technologies.length - 1
    else return
    event.preventDefault(); setSelected(next)
    event.currentTarget.querySelectorAll('button')[next]?.focus()
  }
  return <section className="technology-ecosystem" aria-labelledby="technology-title">
    <header className="technology-header"><p className="eyebrow">EVOLUCIÓN CONTINUA · OCHO PIEZAS, UN MISMO SISTEMA</p><h2 id="technology-title">Tecnología que conecta.<br /><span>Ingeniería que te acompaña.</span></h2><p>Cada pieza cumple una función para que SAYRI pueda evolucionar junto a tu operación.</p></header>
    <p className="technology-instruction">Elige una tecnología y descubre qué aporta a SAYRI.</p>
    <div className="technology-scene">
      <img className="technology-mascot" src={mascot} alt="" width="1254" height="1254" loading="lazy" decoding="async" />
      <ul className="technology-badges" aria-label="Tecnologías de SAYRI" onKeyDown={navigate}>
        {technologies.map((technology, index) => <li key={technology.name} style={{ '--badge-x': `${technology.x}%`, '--badge-y': `${technology.y}%`, '--badge-color': technology.color, '--badge-delay': `${index * -.63}s` } as CSSProperties}>
          <button type="button" aria-pressed={selected === index} aria-controls="technology-detail" onClick={() => choose(index)}>
            <Emblem index={index} /><strong>{technology.name}</strong><span className="technology-action">{selected === index ? 'Explorando ✓' : 'Descubrir →'}</span>
          </button>
        </li>)}
      </ul>
    </div>
    <div className="technology-detail" id="technology-detail" ref={detail} tabIndex={-1} aria-labelledby="technology-detail-title" aria-live="polite" aria-atomic="true">
      <div className="technology-detail-name"><span>0{selected + 1} / 08</span><strong>{item.name}</strong><a href={info.source} target="_blank" rel="noreferrer">Conocer la tecnología <span aria-hidden="true">↗</span></a></div>
      <div className="technology-detail-body">
        <h3 id="technology-detail-title">{item.role}</h3><p className="technology-summary">{item.description}</p>
        <div className="technology-explanation"><div><h4>Qué es</h4><p>{info.overview}</p></div><div><h4>Su papel en SAYRI</h4><p>{info.application}</p></div></div>
        <div className="technology-contributions"><h4>Qué aporta</h4><ul>{info.benefits.map(benefit => <li key={benefit}><span aria-hidden="true">＋</span>{benefit}</li>)}</ul></div>
        <div className="technology-scenario"><h4>Un ejemplo para entenderlo</h4><p>{info.scenario}</p></div>
      </div>
    </div>
    <p className="technology-closing">Ocho tecnologías conectadas por un propósito: <strong>acompañar el trabajo de tu equipo.</strong></p>
  </section>
}

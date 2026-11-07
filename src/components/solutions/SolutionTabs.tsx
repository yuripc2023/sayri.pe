import { lazy, Suspense, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ScheduleDemoButton } from '../shared/ScheduleDemoButton'
import { solutions } from '../../data/solutions'
import { DentalInterfaces } from './DentalInterfaces'
import { HardwareInterfaces } from './HardwareInterfaces'
import { SolutionPricing } from './SolutionPricing'
import './solution-tabs.css'

const SayriExperience = lazy(() => import('../../experience/SayriExperience').then(module => ({ default: module.SayriExperience })))
const tabs = [
  { id: 'caracteristicas', label: 'Características' },
  { id: 'precios', label: 'Precios' },
  { id: 'como-funciona', label: 'Cómo funciona' },
  { id: 'interfaces', label: 'Interfaces' },
] as const
type SolutionTab = typeof tabs[number]['id']

export function SolutionTabs({ slug, children }: { slug: string; children: ReactNode }) {
  const name = solutions.find(solution => solution.slug === slug)?.name ?? 'SAYRI'
  const electoral = slug === 'elecciones'
  const [activeTab, setActiveTab] = useState<SolutionTab>('caracteristicas')
  const tabButtons = useRef<(HTMLButtonElement | null)[]>([])
  const featuresPanel = useRef<HTMLDivElement>(null)
  const { pathname, search, hash } = useLocation()
  const navigate = useNavigate()

  // Preserve existing hero anchors and direct links into the characteristics panel.
  useEffect(() => {
    let frame = 0
    const reveal = (value: string) => {
      let id: string
      try { id = decodeURIComponent(value.replace(/^#/, '')) } catch { return }
      const target = document.getElementById(id)
      if (!target || !featuresPanel.current?.contains(target)) return
      setActiveTab('caracteristicas')
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }))
    }
    reveal(hash)
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null
      if (!anchor) return
      const target = document.getElementById(anchor.hash.slice(1))
      if (!target || !featuresPanel.current?.contains(target)) return
      event.preventDefault()
      reveal(anchor.hash)
      if (hash !== anchor.hash) navigate(`${pathname}${search}${anchor.hash}`)
    }
    document.addEventListener('click', onClick)
    return () => { cancelAnimationFrame(frame); document.removeEventListener('click', onClick) }
  }, [hash, pathname, search, navigate])

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = tabs.length - 1
    else return
    event.preventDefault()
    tabButtons.current[next]?.focus()
  }
  const interfaces = electoral ? [
    { title: 'Procesos y candidaturas', text: 'Preparación de elecciones, listas e integrantes.' },
    { title: 'Padrón y jornada electoral', text: 'Revisión de electores y registro asistido de votos.' },
    { title: 'Participación y resultados', text: 'Consulta del avance y cierre del proceso.' },
  ] : [
    { title: 'Vista general', text: `Aquí publicaremos una vista del entorno de ${name}.` },
    { title: 'Gestión de la operación', text: 'Espacio para las pantallas de los procesos de este rubro.' },
    { title: 'Consultas y seguimiento', text: 'Espacio para mostrar cómo consultar la información del sistema.' },
  ]
  return <div className="solution-tabs-content" key={slug}>
    <div className="solution-tabs" role="tablist" aria-label={`Información de ${name}`}>
      {tabs.map((tab, index) => <button key={tab.id} ref={element => { tabButtons.current[index] = element }} id={`solution-tab-${tab.id}`} type="button" role="tab" aria-selected={activeTab === tab.id} aria-controls={`solution-panel-${tab.id}`} tabIndex={activeTab === tab.id ? 0 : -1} onClick={() => setActiveTab(tab.id)} onKeyDown={event => onTabKeyDown(event, index)}>{tab.label}</button>)}
    </div>
    <div ref={featuresPanel} id="solution-panel-caracteristicas" role="tabpanel" aria-labelledby="solution-tab-caracteristicas" tabIndex={0} hidden={activeTab !== 'caracteristicas'}>{children}</div>
    <div id="solution-panel-precios" role="tabpanel" aria-labelledby="solution-tab-precios" tabIndex={0} hidden={activeTab !== 'precios'}>
      <SolutionPricing slug={slug} name={name}/>
    </div>
    <div id="solution-panel-como-funciona" role="tabpanel" aria-labelledby="solution-tab-como-funciona" tabIndex={0} hidden={activeTab !== 'como-funciona'}>
      {activeTab === 'como-funciona' && <>
        <section className="solution-motion-intro" aria-labelledby="solution-motion-title"><p className="eyebrow">CÓMO FUNCIONA</p><h2 id="solution-motion-title">Explora la experiencia SAYRI.</h2><p className="lead">Por ahora, este espacio muestra la narrativa general de SAYRI con animación por scroll. Aquí incorporaremos el recorrido específico de {name}.</p></section>
        <Suspense fallback={<p className="solution-motion-loading" role="status">Cargando experiencia…</p>}><SayriExperience/></Suspense>
        <div id="despues-de-la-historia" className="solution-motion-end" tabIndex={-1}><p>Fin del recorrido. Conoce cómo podemos acompañar tu operación.</p><ScheduleDemoButton/></div>
      </>}
    </div>
    <div id="solution-panel-interfaces" role="tabpanel" aria-labelledby="solution-tab-interfaces" tabIndex={0} hidden={activeTab !== 'interfaces'}>
      <section aria-labelledby="solution-interfaces-title"><p className="eyebrow">INTERFACES DEL SISTEMA</p><h2 id="solution-interfaces-title">Conoce el entorno de {name}.</h2>{slug === 'odontologia' ? <DentalInterfaces/> : slug === 'ferreterias' ? <HardwareInterfaces/> : <><p className="lead">Próximamente publicaremos aquí las capturas de las interfaces del sistema.</p>
        <div className="solution-interface-grid">{interfaces.map((item, index) => <article className="solution-interface-card" key={item.title}><div className="solution-interface-placeholder" aria-hidden="true"><span>0{index + 1}</span><span>CAPTURA PRÓXIMAMENTE</span></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </> }</section>
    </div>
  </div>
}

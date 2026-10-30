import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ScheduleDemoButton } from '../shared/ScheduleDemoButton'
import { solutions } from '../../data/solutions'
import darkLogo from '../../img/logo-sayri-dark.png'
import whiteLogo from '../../img/logo-sayri-white.png'

const links = [['Cómo trabajamos', '/#como-trabajamos'], ['Preguntas frecuentes', '/#faq'], ['Contacto', '/#contacto']]
const platformLinks = [
  ['Arquitectura web', 'plataforma', 'Acceso, dispositivos y servicios conectados.'],
  ['Evolución', 'evolucion', 'Una gestión que acompaña los cambios.'],
  ['Crecimiento', 'procesos', 'Empieza con un proceso y suma nuevas áreas.'],
  ['Recorrido de un pedido', 'recorrido-pedido', 'La información conecta a todo tu equipo.'],
  ['App móvil', 'app-movil', 'Tu operación también en movimiento.'],
  ['Tecnología', 'tecnologia', 'Las herramientas que sostienen SAYRI.'],
]

export function Header({ theme }: { theme: 'light' | 'dark' }) {
  const [open, setOpen] = useState(false)
  const [dropdown, setDropdown] = useState<'platform' | 'solutions' | null>(null)
  const solutionsOpen = dropdown === 'solutions'
  const platformOpen = dropdown === 'platform'
  const header = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const solutionsToggle = useRef<HTMLButtonElement>(null)
  const platformToggle = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const close = () => { setOpen(false); setDropdown(null) }

  useEffect(() => { setOpen(false); setDropdown(null) }, [location])
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) close()
    }
    const media = window.matchMedia('(min-width: 1100px)')
    const resize = () => close()
    document.addEventListener('pointerdown', outside)
    media.addEventListener('change', resize)
    return () => { document.removeEventListener('pointerdown', outside); media.removeEventListener('change', resize) }
  }, [])

  return <header ref={header} className="header site-header" onKeyDown={event => {
    if (event.key !== 'Escape') return
    if (dropdown) { setDropdown(null); (platformOpen ? platformToggle : solutionsToggle).current?.focus() }
    else if (open) { setOpen(false); toggle.current?.focus() }
  }} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close()
  }}>
    <a className="skip" href="#main">Ir al contenido</a>
    <Link className="brand logo-brand" to="/" aria-label="Sayri, inicio" onClick={close}><img src={theme === 'dark' ? whiteLogo : darkLogo} alt="Sayri" width="184" height="64"/></Link>
    <nav id="nav" className={`site-nav ${open ? 'open' : ''}`} aria-label="Navegación principal">
      <div className="platform-disclosure">
        <button ref={platformToggle} type="button" className="header-link solutions-toggle" aria-expanded={platformOpen} aria-controls="header-platform" onClick={() => setDropdown(platformOpen ? null : 'platform')}>Plataforma<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 8 5 5 5-5"/></svg></button>
        <div id="header-platform" className="solutions-dropdown platform-dropdown" hidden={!platformOpen}>
          <div className="solutions-dropdown-heading"><div><span>CONOCE LA PLATAFORMA</span><p>Una mirada a todo lo que conecta SAYRI.</p></div></div>
          <ul className="header-platform-list">{platformLinks.map(([label, anchor, description], index) => <li key={anchor}><Link to={`/#${anchor}`} onClick={close}><span className="header-sector-number" aria-hidden="true">0{index + 1}</span><span><strong>{label}</strong><small>{description}</small></span><span className="header-sector-arrow" aria-hidden="true">↗</span></Link></li>)}</ul>
        </div>
      </div>
      <div className="solutions-disclosure">
        <button ref={solutionsToggle} type="button" className={`header-link solutions-toggle ${location.pathname.startsWith('/soluciones') ? 'is-current' : ''}`} aria-expanded={solutionsOpen} aria-controls="header-solutions" onClick={() => setDropdown(solutionsOpen ? null : 'solutions')}>Soluciones<svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 8 5 5 5-5"/></svg></button>
        <div id="header-solutions" className="solutions-dropdown" hidden={!solutionsOpen}>
          <div className="solutions-dropdown-heading"><div><span>ECOSISTEMA SAYRI</span><p>Una solución para cada rubro.</p></div><Link to="/soluciones" onClick={close}>Ver todas <span aria-hidden="true">↗</span></Link></div>
          <Link className="header-hangar-link" to="/#sectores" onClick={close}>Explorar las especialidades en el hangar <span aria-hidden="true">↗</span></Link>
          <ul className="header-sector-list">{solutions.map((solution, index) => <li key={solution.slug}><Link to={`/soluciones/${solution.slug}`} aria-current={location.pathname === `/soluciones/${solution.slug}` ? 'page' : undefined} onClick={close}><span className="header-sector-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span>{solution.category}</span><span className="header-sector-arrow" aria-hidden="true">↗</span></Link></li>)}</ul>
        </div>
      </div>
      {links.map(([label, url]) => <Link className="header-link" key={url} to={url} onClick={close}>{label}</Link>)}
      <ScheduleDemoButton className="nav-cta"/>
    </nav>
    <button ref={toggle} type="button" className="menu header-menu-toggle" aria-expanded={open} aria-controls="nav" onClick={() => { setOpen(value => !value); setDropdown(null) }}><span>{open ? 'Cerrar' : 'Menú'}</span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={open ? 'm6 6 12 12M6 18 18 6' : 'M4 7h16M4 12h16M4 17h16'}/></svg></button>
  </header>
}

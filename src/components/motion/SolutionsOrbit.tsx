import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { solutions } from '../../data/solutions'
import darkLogo from '../../img/logo-sayri-dark.png'
import whiteLogo from '../../img/logo-sayri-white.png'

const Sphere = lazy(() => import('./SectorSphere').then(module => ({ default: module.SectorSphere })))
class OrbitBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onError() }
  render() { return this.state.failed ? null : this.props.children }
}

export function SolutionsOrbit() {
  const [available, setAvailable] = useState(false)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(true)
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      if (media.matches) { setAvailable(false); return }
      try {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('webgl2')
        setAvailable(!!context)
        context?.getExtension('WEBGL_lose_context')?.loseContext()
      } catch { setAvailable(false) }
    }
    update(); media.addEventListener('change', update)
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    if (root.current) observer.observe(root.current)
    const visibility = () => setVisible(!document.hidden && !!root.current && root.current.getBoundingClientRect().bottom > 0 && root.current.getBoundingClientRect().top < innerHeight)
    document.addEventListener('visibilitychange', visibility)
    return () => { observer.disconnect(); media.removeEventListener('change', update); document.removeEventListener('visibilitychange', visibility) }
  }, [])
  return <div className="solutions-orbit-panel" ref={root}>
    <div className="solutions-orbit-top"><span>UN NÚCLEO · {solutions.length} RUBROS</span>{available && <button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? 'Activar giro' : 'Pausar giro'}</button>}</div>
    <div className="solutions-orbit-visual">
      <div className="solutions-orbit-core" aria-hidden="true"><img className="orbit-logo-light" src={darkLogo} alt=""/><img className="orbit-logo-dark" src={whiteLogo} alt=""/><span>ECOSISTEMA SAYRI</span></div>
      {available && <OrbitBoundary onError={() => setAvailable(false)}><Suspense fallback={null}><Sphere solutions={solutions} paused={paused || !visible} onUnavailable={() => setAvailable(false)}/></Suspense></OrbitBoundary>}
    </div>
    <p className="solutions-orbit-hint">{available ? 'Explora los rubros en la órbita o elige una solución en el listado.' : 'Un mismo núcleo conecta nuestras soluciones. Explora los rubros en el listado.'}</p>
    <Link className="text-link" to="#listado-soluciones">Ver todas las soluciones ↓</Link>
  </div>
}

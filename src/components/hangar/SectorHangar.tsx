import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { armors } from '../../data/armors'
import { ScheduleDemoButton } from '../shared/ScheduleDemoButton'
import { SectorMascot } from './SectorMascot'
import './hangar.css'
import './capsules.css'

const wideQuery = '(min-width: 1100px)'

export function SectorHangar() {
  const [selected, setSelected] = useState(() => Math.floor(Math.random() * armors.length))
  const [paused, setPaused] = useState(false)
  const [visibleCount, setVisibleCount] = useState(() => window.matchMedia(wideQuery).matches ? 5 : 3)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const gesture = useRef<{ x: number; y: number; id: number } | null>(null)
  const suppressClick = useRef(false)
  const centerSlot = Math.floor(visibleCount / 2)
  const armor = armors[selected]
  const wrap = (index: number) => (index + armors.length) % armors.length
  const move = (delta: number) => setSelected(index => wrap(index + delta))

  useEffect(() => {
    const media = window.matchMedia(wideQuery)
    const update = () => setVisibleCount(media.matches ? 5 : 3)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let next: number
    if (event.key === 'ArrowRight') next = wrap(selected + 1)
    else if (event.key === 'ArrowLeft') next = wrap(selected - 1)
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = armors.length - 1
    else return
    event.preventDefault()
    setSelected(next)
    requestAnimationFrame(() => buttons.current[next]?.focus({ preventScroll: true }))
  }
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!gesture.current || gesture.current.id !== event.pointerId) return
    const dx = event.clientX - gesture.current.x
    const dy = event.clientY - gesture.current.y
    gesture.current = null
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      suppressClick.current = true
      move(dx < 0 ? 1 : -1)
    }
  }

  return <section className={`sector-hangar ${paused ? 'hangar-paused' : ''}`} style={{ '--suit-color': armor.color, '--visible-count': visibleCount, '--center-slot': centerSlot } as CSSProperties} aria-labelledby="hangar-title">
    <div className="hangar-top"><span><i/> SAYRI / SISTEMAS ESPECIALIZADOS</span><button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? 'Activar movimiento' : 'Pausar movimiento'} <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span></button></div>
    <div className="hangar-introduction">
      <div className="hangar-copy"><p className="hangar-kicker">UN MISMO NÚCLEO. MÚLTIPLES PERSONALIDADES.</p><h1 id="hangar-title">Cada negocio tiene su <em>poder.</em></h1></div>
      <div className="hangar-guide"><p className="hangar-intro">Muchas formas de trabajar. Una inteligencia que las conecta. Elige el SAYRI que entiende tu rubro.</p><span>EXPLORA EL HANGAR <span aria-hidden="true">↓</span></span></div>
    </div>
    <div className="hangar-display">
      <div className="hangar-stage-label" aria-hidden="true"><span>SAYRI / GALERÍA DE ESPECIALIDADES</span><span>{visibleCount} EN EXHIBICIÓN · {armors.length} POR DESCUBRIR</span></div>
      <p className="sr-only" id="hangar-slider-instructions">Usa las flechas izquierda y derecha para elegir un rubro, Inicio para el primero y Fin para el último. También puedes deslizar o usar los botones anterior y siguiente.</p>
      <div className="hangar-carousel">
      <button type="button" className="hangar-side-arrow arrow-previous" onClick={() => move(-1)} aria-label="Rubro anterior"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m14 5-7 7 7 7"/></svg></button>
      <div className="hangar-slider" role="region" aria-roledescription="carrusel" aria-label="Pulpos por rubro" aria-describedby="hangar-slider-instructions" onKeyDown={onKeyDown}
        onPointerDown={event => { if (event.button !== 0 || !event.isPrimary) return; suppressClick.current = false; gesture.current = { x: event.clientX, y: event.clientY, id: event.pointerId } }}
        onPointerUp={onPointerUp} onPointerCancel={() => { gesture.current = null }} onPointerLeave={() => { gesture.current = null }}
        onClickCapture={event => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false } }}>
        <div className="hangar-track">
          {armors.map((item, index) => {
            // Signed circular distance keeps both neighbours visible at the ends of the catalogue.
            const half = Math.floor(armors.length / 2)
            const offset = ((index - selected + armors.length + half) % armors.length) - half
            const visible = Math.abs(offset) <= centerSlot
            const nearby = Math.abs(offset) <= centerSlot + 1
            const active = index === selected
            return <article key={item.slug}
              className={`hangar-slot ${active ? 'is-selected' : ''} ${offset < 0 ? 'is-before' : ''} ${visible ? 'is-visible' : 'is-outside'}`}
              style={{ '--slot': offset, '--bay-color': item.color } as CSSProperties}
              aria-hidden={!visible}>
              <button type="button" className="slot-pick" ref={element => { buttons.current[index] = element }} aria-label={`Seleccionar ${item.label}`} aria-pressed={active} tabIndex={active ? 0 : -1} onClick={() => setSelected(index)}>
              <span className="slot-frame" aria-hidden="true"><span className="slot-glass"/><span className="slot-crown"><span className="slot-crown-inset"/></span><span className="slot-label">{item.label}</span><span className="slot-light"/><span className="slot-visual">{nearby && <SectorMascot armor={item} priority={active ? 'high' : 'low'}/>}</span><span className="slot-platform"><span className="slot-base-indicators"><i/><i/><i/></span></span></span>
              </button>
              <div className="slot-caption"><h3>{item.label}</h3><div className="slot-summary"><div className="slot-copy"><p>{item.description}</p><ul className="slot-modules" aria-label={`Módulos de ${item.label}`}>{item.capabilities.map(module => <li key={module}><span aria-hidden="true">+</span>{module}</li>)}</ul></div><Link className="slot-explore" tabIndex={visible ? 0 : -1} to={`/soluciones/${item.slug}`}>Explorar {item.label}<span aria-hidden="true">↗</span></Link></div></div>
            </article>
          })}
        </div>
      </div>
      <button type="button" className="hangar-side-arrow arrow-next" onClick={() => move(1)} aria-label="Rubro siguiente"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m10 5 7 7-7 7"/></svg></button>
      </div>
      <div className="hangar-navigation"><span>{String(selected + 1).padStart(2, '0')} <i>/ {armors.length}</i></span></div>
    </div>
    <p className="sr-only" aria-live="polite" aria-atomic="true">{armor.label}: {armor.description}</p>
    <div className="hangar-demo"><p>Tu próximo paso empieza con una conversación.</p><ScheduleDemoButton /></div>
    <div className="hangar-selector" role="group" aria-label="Selecciona la especialidad de tu rubro">{armors.map((item, index) => <button key={item.slug} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} style={{ '--item-color': item.color } as CSSProperties}><span className="selector-number">{String(index + 1).padStart(2, '0')}</span><span>{item.label}</span><i aria-hidden="true"/></button>)}</div>
    <div className="hangar-bottom"><span>{armors.length} ESPECIALIDADES. UN ECOSISTEMA EN EVOLUCIÓN.</span><a href="#historia-sayri">Descubre cómo se conecta todo ↓</a></div>
  </section>
}

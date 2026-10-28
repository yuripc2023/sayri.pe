import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { chapters } from './content'
import { createExperienceModel } from './animation/model'
import { useScrollTimeline } from './animation/useScrollTimeline'
import { useExperienceCapability } from './hooks/useExperienceCapability'
import { StoryOverlay } from './ui/StoryOverlay'
import { ExperienceFallback } from './ui/ExperienceFallback'
import { SceneBoundary } from './ui/SceneBoundary'
import './experience.css'

const ExperienceScene = lazy(() => import('./scene/ExperienceScene'))

export function SayriExperience() {
  const root = useRef<HTMLElement>(null)
  const model = useMemo(createExperienceModel, [])
  const capability = useExperienceCapability()
  const [reading, setReading] = useState(false)
  const [failed, setFailed] = useState(false)
  const scrollToStart = useCallback(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const element = root.current
      if (!element) return
      const header = document.querySelector('.header')?.getBoundingClientRect().height ?? 78
      window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - header, behavior: 'instant' })
      element.querySelector<HTMLButtonElement>('.story-topline button')?.focus({ preventScroll: true })
    }))
  }, [])
  const animated = capability.ready && capability.quality !== 'fallback' && !reading && !failed
  const jump = useScrollTimeline(root, model, animated)
  const fail = useCallback(() => {
    const bounds = root.current?.getBoundingClientRect()
    setFailed(true)
    if (bounds && bounds.top < innerHeight && bounds.bottom > 80) scrollToStart()
  }, [scrollToStart])
  useEffect(() => {
    const element = root.current
    element?.addEventListener('sayri-story-error', fail)
    const visibility = new IntersectionObserver(([entry]) => {
      if (element) element.dataset.visible = String(entry.isIntersecting)
    })
    if (element) visibility.observe(element)
    return () => { visibility.disconnect(); element?.removeEventListener('sayri-story-error', fail); model.invalidate = () => {} }
  }, [fail, model])

  return <section id="historia-sayri" ref={root} className={`sayri-experience ${animated ? 'is-animated' : 'is-reading'}`} data-quality={capability.quality} data-chapter="0" aria-labelledby="experience-title">
    <h2 id="experience-title" className="sr-only">Sayri. Diseña, construye y controla tu empresa desde un solo lugar.</h2>
    <div className="story-topline flex items-center justify-between gap-4">
      <span>SAYRI <span className="story-topline-divider">/</span> LA EMPRESA, DESDE SU ORIGEN</span>
      <div className="flex items-center gap-4">
        {capability.quality !== 'fallback' && !failed && <button type="button" className="story-text-button" onClick={() => { setReading(value => !value); scrollToStart() }}>{reading ? 'Explorar con scroll' : 'Leer sin animación'}</button>}
        <a href="#despues-de-la-historia" className="story-text-button">Saltar historia <span aria-hidden="true">↗</span></a>
      </div>
    </div>
    {animated ? <>
      <div className="story-canvas" aria-hidden="true"><SceneBoundary onFailure={fail}><Suspense fallback={<div className="story-loading" />}><ExperienceScene model={model} quality={capability.quality as 'high' | 'medium' | 'low'} onFailure={fail} /></Suspense></SceneBoundary></div>
      <StoryOverlay />
      <div className="story-stage-label" aria-hidden="true">{chapters.map((chapter, index) => <span key={chapter.id} data-label={index}>{chapter.name}</span>)}</div>
      <div className="story-bottomline">
        <p className="story-scroll-hint">DESLIZA PARA CONSTRUIR <span aria-hidden="true">↓</span></p>
        <div className="story-chapters" role="group" aria-label="Etapas de la historia">{chapters.map((chapter, index) => <button type="button" key={chapter.id} data-chapter={index} aria-label={`Ir a ${chapter.name}`} aria-current={index === 0 ? 'step' : 'false'} onClick={() => jump.current(index)}><span className="chapter-number">{String(index + 1).padStart(2, '0')}</span><span className="chapter-name">{chapter.name}</span></button>)}</div>
        <Link className="story-ecosystem-link" to="/soluciones">Ecosistema ↗</Link>
      </div>
    </> : <ExperienceFallback />}
  </section>
}

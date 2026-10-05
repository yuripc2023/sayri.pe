import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { chapters } from '../content'
import type { ExperienceModel } from './model'

export function useScrollTimeline(root: RefObject<HTMLElement | null>, model: ExperienceModel, enabled: boolean) {
  const jump = useRef<(index: number) => void>(() => {})
  useEffect(() => {
    if (!enabled || !root.current) return
    const element = root.current
    let cancelled = false
    let cleanup = () => {}
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      const cards = Array.from(element.querySelectorAll<HTMLElement>('.story-copy'))
      const buttons = Array.from(element.querySelectorAll<HTMLElement>('[data-chapter]'))
      let active = -1
      let refreshProgress: number | null = null
      let viewportWidth = innerWidth
      let viewportHeight = innerHeight
      let viewportHeader = document.querySelector('.header')?.getBoundingClientRect().height ?? 78
      let stableProgress = 0
      let resizeVisible = false
      const captureResize = () => {
        const bounds = element.getBoundingClientRect()
        const header = document.querySelector('.header')?.getBoundingClientRect().height ?? 78
        resizeVisible = bounds.top >= -2 && bounds.top <= Math.max(header, viewportHeader) + 2 && bounds.bottom > header
      }
      window.addEventListener('resize', captureResize)
      const showChapter = () => {
        if (innerWidth === viewportWidth && innerHeight === viewportHeight) stableProgress = model.phase / 7
        const current = Math.min(7, Math.floor(model.phase + .3))
        if (active !== current) {
          active = current
          element.dataset.chapter = String(current)
          cards.forEach((card, index) => card.setAttribute('aria-hidden', String(index !== current)))
          buttons.forEach((button, index) => button.setAttribute('aria-current', index === current ? 'step' : 'false'))
        }
        element.style.setProperty('--story-progress', String(model.phase / 7))
        model.invalidate()
      }
      const context = gsap.context(() => {
        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            id: 'sayri-story', trigger: element, pin: true,
            start: () => `top ${document.querySelector('.header')?.getBoundingClientRect().height ?? 78}`,
            end: () => `+=${Math.round(element.clientHeight * 7 * (innerWidth <= 680 ? .8 : 1))}`,
            scrub: .35, anticipatePin: 1,
            onToggle: self => { element.dataset.pinned = String(self.isActive) },
            onRefreshInit: () => {
              const resizing = viewportWidth !== innerWidth || viewportHeight !== innerHeight
              refreshProgress = resizing && resizeVisible ? stableProgress : null
            },
            onRefresh: self => {
              viewportWidth = innerWidth
              viewportHeight = innerHeight
              viewportHeader = document.querySelector('.header')?.getBoundingClientRect().height ?? 78
              // Keep the same chapter when rotation/resize changes the pin distance.
              if (refreshProgress !== null && refreshProgress > 0) {
                window.scrollTo({ top: self.start + refreshProgress * (self.end - self.start), behavior: 'instant' })
                self.animation?.progress(refreshProgress)
              }
              refreshProgress = null
            },
          },
          onUpdate: showChapter,
        })
        chapters.forEach((chapter, index) => {
          timeline.addLabel(chapter.id, index)
          if (index > 0) {
            timeline.to(model, { phase: index, duration: 1 }, index - 1)
            timeline.to(cards[index - 1], { autoAlpha: 0, y: -18, duration: .2 }, index - .5)
            timeline.fromTo(cards[index], { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: .3 }, index - .3)
          }
        })
        jump.current = index => {
          const trigger = timeline.scrollTrigger
          if (trigger) window.scrollTo({ top: trigger.labelToScroll(chapters[index].id), behavior: 'instant' })
        }
        showChapter()
      }, element)
      cleanup = () => { window.removeEventListener('resize', captureResize); context.revert() }
      // Fonts can alter later anchor positions; refresh after their metrics settle.
      document.fonts.ready.then(() => {
        if (!cancelled) { ScrollTrigger.refresh(); window.dispatchEvent(new Event('sayri-story-ready')) }
      })
    }).catch(() => { if (!cancelled) element.dispatchEvent(new CustomEvent('sayri-story-error')) })
    return () => {
      cancelled = true
      cleanup()
      delete element.dataset.pinned
      jump.current = () => {}
      model.phase = 0
      model.invalidate()
    }
  }, [root, model, enabled])
  return jump
}

import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/** Hash navigation must wait for the scroll narrative to establish pin spacing. */
export function RouteScroll() {
  const { pathname, hash, key } = useLocation()
  const navigation = useNavigationType()
  useEffect(() => {
    const scrollToAnchor = () => {
      if (!hash) return
      let id: string
      try { id = decodeURIComponent(hash.slice(1)) } catch { return }
      const target = document.getElementById(id)
      if (!target) return
      const header = document.querySelector('.header')?.getBoundingClientRect().height ?? 78
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - header - 16, behavior: 'instant' })
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
      target.focus({ preventScroll: true })
    }
    const frame = requestAnimationFrame(() => {
      if (hash) scrollToAnchor()
      else if (navigation !== 'POP') window.scrollTo({ top: 0, behavior: 'instant' })
    })
    window.addEventListener('sayri-story-ready', scrollToAnchor)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('sayri-story-ready', scrollToAnchor) }
  }, [pathname, hash, key, navigation])
  return null
}

import { useEffect, useState } from 'react'
import type { Quality } from '../content'

type Capability = { quality: Quality; reducedMotion: boolean; ready: boolean }
export function useExperienceCapability(): Capability {
  const [capability, setCapability] = useState<Capability>({ quality: 'fallback', reducedMotion: false, ready: false })
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    const mobile = matchMedia('(max-width: 680px)')
    const tablet = matchMedia('(max-width: 1100px)')
    let supported = false
    try {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true })
      supported = Boolean(context)
      context?.getExtension('WEBGL_lose_context')?.loseContext()
    } catch { /* HTML is always available. */ }
    const update = () => {
      const limited = navigator.hardwareConcurrency <= 4 || (navigator as Navigator & { deviceMemory?: number }).deviceMemory! <= 4
      setCapability({ quality: !supported || motion.matches ? 'fallback' : mobile.matches ? 'low' : tablet.matches || limited ? 'medium' : 'high', reducedMotion: motion.matches, ready: true })
    }
    update()
    for (const media of [motion, mobile, tablet]) media.addEventListener('change', update)
    return () => { for (const media of [motion, mobile, tablet]) media.removeEventListener('change', update) }
  }, [])
  return capability
}

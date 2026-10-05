import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import type { ExperienceModel } from '../animation/model'

export function RenderLifecycle({ model, onFailure }: { model: ExperienceModel; onFailure: () => void }) {
  const gl = useThree(state => state.gl)
  const invalidate = useThree(state => state.invalidate)
  useEffect(() => {
    const lost = (event: Event) => { event.preventDefault(); onFailure() }
    model.invalidate = invalidate
    gl.domElement.addEventListener('webglcontextlost', lost)
    invalidate()
    return () => {
      gl.domElement.removeEventListener('webglcontextlost', lost)
      model.invalidate = () => {}
    }
  }, [gl, invalidate, model, onFailure])
  return null
}

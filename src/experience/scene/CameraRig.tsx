import { useFrame } from '@react-three/fiber'
import { PerspectiveCamera } from 'three'
import { smooth } from '../animation/model'
import type { ExperienceModel } from '../animation/model'

const views = [[0, 0, 8], [.8, .5, 7], [1, 1, 11], [1.2, 1.8, 11], [3, 2.5, 11], [4.5, 4, 10.5], [1, .5, 9.5], [0, 0, 8.8]]

export function CameraRig({ model }: { model: ExperienceModel }) {
  useFrame(({ camera, size }) => {
    const index = Math.min(7, Math.floor(model.phase))
    const from = views[index], to = views[Math.min(7, index + 1)]
    const t = smooth(model.phase - index)
    const distance = size.width < 680 ? 1.12 : 1
    camera.position.set((from[0] + (to[0] - from[0]) * t) * distance, (from[1] + (to[1] - from[1]) * t) * distance, (from[2] + (to[2] - from[2]) * t) * distance)
    camera.lookAt(0, 0, 0)
    if (camera instanceof PerspectiveCamera) {
      camera.fov = 40
      camera.updateProjectionMatrix()
    }
  })
  return null
}

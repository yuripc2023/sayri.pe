import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Object3D } from 'three'
import type { BufferAttribute, InstancedMesh, LineBasicMaterial, LineSegments, MeshBasicMaterial } from 'three'
import { smooth } from '../animation/model'
import type { ExperienceModel } from '../animation/model'
import { groupCenter } from './layout'

const cubeEdges = [[0, 1], [0, 2], [0, 4], [1, 3], [1, 5], [2, 3], [2, 6], [3, 7], [4, 5], [4, 6], [5, 7], [6, 7]]

export function BusinessModules({ model }: { model: ExperienceModel }) {
  const frames = useRef<LineSegments>(null)
  const modules = useRef<InstancedMesh>(null)
  const positions = useMemo(() => new Float32Array(4 * cubeEdges.length * 6), [])
  const transform = useMemo(() => new Object3D(), [])
  const centers = useMemo(() => Array.from({ length: 8 }, (_, stage) => Array.from({ length: 4 }, (_, group) => groupCenter(Math.min(stage, 5), group))), [])

  useFrame(() => {
    if (!frames.current || !modules.current) return
    const stage = Math.min(7, Math.floor(model.phase))
    const next = Math.min(7, stage + 1)
    const t = smooth(model.phase - stage)
    const visibility = smooth(model.phase - 2) * (1 - smooth(model.phase - 5))
    frames.current.visible = visibility > .001
    modules.current.visible = visibility > .001
    for (let group = 0; group < 4; group++) {
      const from = centers[stage][group], to = centers[next][group]
      const x = from[0] + (to[0] - from[0]) * t
      const y = from[1] + (to[1] - from[1]) * t
      const z = from[2] + (to[2] - from[2]) * t
      const width = 1.8
      const height = model.phase >= 4 ? 1.8 + (group % 2) * .3 * smooth(model.phase - 4) : 1.8
      transform.position.set(x, y, z)
      transform.scale.set(width, height, width)
      transform.updateMatrix()
      modules.current.setMatrixAt(group, transform.matrix)
      cubeEdges.forEach((edge, index) => {
        edge.forEach((corner, endpoint) => {
          const offset = (group * cubeEdges.length + index) * 6 + endpoint * 3
          positions[offset] = x + (corner & 1 ? .5 : -.5) * width
          positions[offset + 1] = y + (corner & 2 ? .5 : -.5) * height
          positions[offset + 2] = z + (corner & 4 ? .5 : -.5) * width
        })
      })
    }
    modules.current.instanceMatrix.needsUpdate = true
    ;(modules.current.material as MeshBasicMaterial).opacity = visibility * .035
    ;(frames.current.material as LineBasicMaterial).opacity = visibility * .45
    ;(frames.current.geometry.attributes.position as BufferAttribute).needsUpdate = true
  })

  return <>
    <instancedMesh ref={modules} args={[undefined, undefined, 4]} frustumCulled={false}><boxGeometry /><meshBasicMaterial color="#459fe0" transparent opacity={0} depthWrite={false} /></instancedMesh>
    <lineSegments ref={frames} frustumCulled={false}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><lineBasicMaterial color="#6ec8ff" transparent opacity={0} depthWrite={false} /></lineSegments>
  </>
}

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Color, DynamicDrawUsage, Object3D } from 'three'
import type { BufferAttribute, InstancedMesh, LineSegments } from 'three'
import type { ExperienceModel } from '../animation/model'
import { smooth } from '../animation/model'
import { createEdges, createLayouts, sampleLayout } from './layout'

export function ConnectedStructure({ model, count }: { model: ExperienceModel; count: number }) {
  const nodes = useRef<InstancedMesh>(null)
  const lines = useRef<LineSegments>(null)
  const layouts = useMemo(() => createLayouts(count), [count])
  const edges = useMemo(() => createEdges(count), [count])
  const linePositions = useMemo(() => new Float32Array(edges.length * 6), [edges])
  const scratch = useMemo(() => ({ transform: new Object3D(), pose: { x: 0, y: 0, z: 0, scale: 0 }, target: { x: 0, y: 0, z: 0, scale: 0 }, color: new Color() }), [])

  useFrame(() => {
    if (!nodes.current || !lines.current) return
    const { transform, pose, target, color } = scratch
    for (let i = 0; i < count; i++) {
      sampleLayout(layouts, count, model.phase, i, pose)
      transform.position.set(pose.x, pose.y, pose.z)
      transform.scale.setScalar(pose.scale)
      transform.updateMatrix()
      nodes.current.setMatrixAt(i, transform.matrix)
      nodes.current.setColorAt(i, color.set(i === 0 ? '#fff1d9' : model.phase >= 3 && model.phase < 6 && Math.floor(i / (count / 4)) === 2 ? '#fda273' : '#70ccff'))
    }
    nodes.current.instanceMatrix.setUsage(DynamicDrawUsage)
    nodes.current.instanceMatrix.needsUpdate = true
    if (nodes.current.instanceColor) nodes.current.instanceColor.needsUpdate = true
    edges.forEach(([from, to], index) => {
      sampleLayout(layouts, count, model.phase, from, pose)
      sampleLayout(layouts, count, model.phase, to, target)
      const offset = index * 6
      linePositions[offset] = pose.x; linePositions[offset + 1] = pose.y; linePositions[offset + 2] = pose.z
      linePositions[offset + 3] = target.x; linePositions[offset + 4] = target.y; linePositions[offset + 5] = target.z
    })
    ;(lines.current.geometry.attributes.position as BufferAttribute).needsUpdate = true
    const material = lines.current.material as import('three').LineBasicMaterial
    material.opacity = smooth(model.phase) * (.34 - smooth(model.phase - 5) * .15)
    lines.current.visible = model.phase > .001
  })

  return <>
    <instancedMesh ref={nodes} args={[undefined, undefined, count]} frustumCulled={false}>
      <icosahedronGeometry args={[1, 0]} /><meshBasicMaterial toneMapped={false} />
    </instancedMesh>
    <lineSegments ref={lines} frustumCulled={false}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[linePositions, 3]} /></bufferGeometry>
      <lineBasicMaterial color="#55b3e6" transparent opacity={0} depthWrite={false} />
    </lineSegments>
  </>
}

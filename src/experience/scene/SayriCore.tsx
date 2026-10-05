import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Object3D } from 'three'
import type { Group, InstancedMesh, Mesh, MeshBasicMaterial, MeshStandardMaterial } from 'three'
import { smooth } from '../animation/model'
import type { ExperienceModel } from '../animation/model'

export function SayriCore({ model, lowQuality }: { model: ExperienceModel; lowQuality: boolean }) {
  const core = useRef<Group>(null)
  const shell = useRef<Mesh>(null)
  const heart = useRef<Mesh>(null)
  const signals = useRef<InstancedMesh>(null)
  const transform = useMemo(() => new Object3D(), [])
  const count = lowQuality ? 8 : 16

  useFrame(() => {
    if (!core.current || !shell.current || !heart.current || !signals.current) return
    const presence = smooth(model.phase - 5)
    const intelligence = smooth(model.phase - 6)
    core.current.visible = presence > .001
    core.current.scale.setScalar(presence * (.8 + intelligence * .2))
    core.current.rotation.set(.1 + intelligence * .25, model.phase * .35, .15 + intelligence * .2)
    shell.current.rotation.set(-model.phase * .25, model.phase * .2, .2)
    ;(shell.current.material as MeshBasicMaterial).opacity = .2 + intelligence * .2
    ;(heart.current.material as MeshStandardMaterial).emissiveIntensity = .6 + intelligence * .8
    signals.current.visible = intelligence > .001
    for (let i = 0; i < count; i++) {
      const angle = i / count * Math.PI * 2
      const travel = ((model.phase - 6) * .9 + i / count) % 1
      const radius = 2.2 * (1 - travel)
      transform.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, Math.sin(angle * 3) * radius * .4)
      transform.scale.setScalar(.025 * intelligence)
      transform.updateMatrix()
      signals.current.setMatrixAt(i, transform.matrix)
    }
    signals.current.instanceMatrix.needsUpdate = true
  })

  return <>
    <group ref={core} visible={false}>
      <mesh ref={heart}><octahedronGeometry args={[.75, 0]} /><meshStandardMaterial color="#daf2ff" emissive="#42b4ff" emissiveIntensity={.6} metalness={.35} roughness={.35} /></mesh>
      <mesh ref={shell}><icosahedronGeometry args={[1.2, 0]} /><meshBasicMaterial color="#6ec8ff" wireframe transparent opacity={.25} depthWrite={false} /></mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.45, .009, 4, lowQuality ? 32 : 64]} /><meshBasicMaterial color="#6ec8ff" transparent opacity={.55} /></mesh>
      <mesh rotation={[.2, .6, 0]}><torusGeometry args={[1.62, .006, 4, lowQuality ? 32 : 64]} /><meshBasicMaterial color="#fda273" transparent opacity={.5} /></mesh>
    </group>
    <instancedMesh ref={signals} args={[undefined, undefined, count]} frustumCulled={false} visible={false}><icosahedronGeometry args={[1, 0]} /><meshBasicMaterial color="#dff4ff" /></instancedMesh>
  </>
}

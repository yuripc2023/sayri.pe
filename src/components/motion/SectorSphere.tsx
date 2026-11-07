import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Solution } from '../../data/solutions'
import { getOrbitPosition, ORBIT_RADII, ORBIT_SPEED } from './sectorOrbitLayout'

type Props = { solutions: Solution[]; paused: boolean; onUnavailable: () => void }

function SectorWord({ solution, position, color, register }: {
  solution: Solution; position: THREE.Vector3; color: string; register: (mesh: THREE.Mesh | null) => void
}) {
  const navigate = useNavigate()
  const material = useRef<THREE.MeshBasicMaterial>(null)
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 768; canvas.height = 256
    const context = canvas.getContext('2d')!
    context.font = '600 96px system-ui, sans-serif'
    context.fillStyle = color; context.textAlign = 'center'; context.textBaseline = 'middle'
    const words = solution.category.split(' ')
    const lines: string[] = ['']
    for (const word of words) {
      const index = lines.length - 1
      const next = `${lines[index]} ${word}`.trim()
      if (context.measureText(next).width > 700 && lines[index]) lines.push(word)
      else lines[index] = next
    }
    lines.forEach((line, i) => context.fillText(line, 384, 128 + (i - (lines.length - 1) / 2) * 112))
    const result = new THREE.CanvasTexture(canvas)
    result.colorSpace = THREE.SRGBColorSpace
    return result
  }, [solution.category, color])
  useEffect(() => () => texture.dispose(), [texture])
  return <mesh ref={register} position={position}
    onPointerOver={event => { event.stopPropagation() }}
    onClick={event => { if ((material.current?.opacity ?? 0) < .2) return; event.stopPropagation(); navigate(`/soluciones/${solution.slug}`) }}>
    <planeGeometry args={[3.8, 1.267]}/><meshBasicMaterial ref={material} map={texture} transparent depthWrite={false} depthTest={false} toneMapped={false}/>
  </mesh>
}

function Cloud({ solutions, paused }: Omit<Props, 'onUnavailable'>) {
  const meshes = useRef<(THREE.Mesh | null)[]>([])
  const angle = useRef(0)
  const invalidate = useThree(state => state.invalidate)
  const initialPositions = useMemo(() => solutions.map((_, index) => {
    const position = getOrbitPosition(index, solutions.length, 0)
    return new THREE.Vector3(position.x, position.y, 0)
  }), [solutions])
  const ringGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(
    Array.from({ length: 160 }, (_, index) => new THREE.Vector3(Math.cos(index / 160 * Math.PI * 2), Math.sin(index / 160 * Math.PI * 2), 0))
  ), [])
  useEffect(() => () => ringGeometry.dispose(), [ringGeometry])
  useEffect(() => { invalidate() }, [paused, invalidate])
  useFrame((_, delta) => {
    if (!paused) angle.current += Math.min(delta, .05) * ORBIT_SPEED
    for (const [index, mesh] of meshes.current.entries()) {
      if (!mesh) continue
      const position = getOrbitPosition(index, solutions.length, angle.current)
      mesh.position.set(position.x, position.y, 0)
    }
    if (!paused) invalidate()
  })
  return <group>
    {ORBIT_RADII.map(radius => <lineLoop key={radius} geometry={ringGeometry} scale={radius} position={[0, 0, -.1]}><lineBasicMaterial color="#a2c5df" transparent opacity={.13} depthWrite={false}/></lineLoop>)}
    {solutions.map((solution, index) => <SectorWord key={solution.slug} solution={solution} position={initialPositions[index]} color="#f0f1f1" register={mesh => { meshes.current[index] = mesh }}/>) }
  </group>
}

function ResponsiveCamera() {
  const { camera, size, invalidate } = useThree()
  useEffect(() => {
    // A front-facing orthographic camera preserves circular paths and text size.
    camera.zoom = Math.min(size.width, size.height) / 22.2
    camera.updateProjectionMatrix()
    invalidate()
  }, [camera, size.width, size.height, invalidate])
  return null
}

export function SectorSphere({ solutions, paused, onUnavailable }: Props) {
  return <div className="sector-three-canvas" aria-hidden="true">
    <Canvas orthographic frameloop="demand" dpr={[1, 1.5]} camera={{ position: [0, 0, 20], zoom: 25 }} gl={{ alpha: true, antialias: true }} fallback={<span/>}
      onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); gl.domElement.addEventListener('webglcontextlost', onUnavailable, { once: true }) }}>
      <ResponsiveCamera/><Cloud solutions={solutions} paused={paused}/>
    </Canvas>
  </div>
}

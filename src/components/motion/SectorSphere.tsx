import * as THREE from 'three'
import { Billboard, TrackballControls } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Solution } from '../../data/solutions'

type Props = { solutions: Solution[]; paused: boolean; onUnavailable: () => void }

function SectorWord({ solution, position, color, hovered, register }: {
  solution: Solution; position: THREE.Vector3; color: string; hovered: { current: boolean }; register: (mesh: THREE.Mesh | null) => void
}) {
  const navigate = useNavigate()
  const material = useRef<THREE.MeshBasicMaterial>(null)
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 768; canvas.height = 256
    const context = canvas.getContext('2d')!
    context.font = '600 72px system-ui, sans-serif'
    context.fillStyle = color; context.textAlign = 'center'; context.textBaseline = 'middle'
    const words = solution.category.split(' ')
    const lines: string[] = ['']
    for (const word of words) {
      const index = lines.length - 1
      const next = `${lines[index]} ${word}`.trim()
      if (context.measureText(next).width > 700 && lines[index]) lines.push(word)
      else lines[index] = next
    }
    lines.forEach((line, i) => context.fillText(line, 384, 128 + (i - (lines.length - 1) / 2) * 88))
    const result = new THREE.CanvasTexture(canvas)
    result.colorSpace = THREE.SRGBColorSpace
    return result
  }, [solution.category, color])
  useEffect(() => () => texture.dispose(), [texture])
  return <Billboard position={position}><mesh ref={register}
    onPointerOver={event => { if ((material.current?.opacity ?? 0) < .2) return; event.stopPropagation(); hovered.current = true }}
    onPointerOut={() => { hovered.current = false }}
    onClick={event => { if ((material.current?.opacity ?? 0) < .2) return; event.stopPropagation(); navigate(`/soluciones/${solution.slug}`) }}>
    <planeGeometry args={[2.7, .9]}/><meshBasicMaterial ref={material} map={texture} transparent depthWrite={false} toneMapped={false}/>
  </mesh></Billboard>
}

function Cloud({ solutions, paused }: Omit<Props, 'onUnavailable'>) {
  const group = useRef<THREE.Group>(null)
  const hovered = useRef(false)
  const meshes = useRef<(THREE.Mesh | null)[]>([])
  const world = useMemo(() => new THREE.Vector3(), [])
  const invalidate = useThree(state => state.invalidate)
  useEffect(() => { if (!paused) invalidate() }, [paused, invalidate])
  const positions = useMemo(() => solutions.map((_, index) => {
    const phi = Math.acos(-1 + (2 * (index + .5)) / solutions.length)
    const theta = Math.sqrt(solutions.length * Math.PI) * phi
    return new THREE.Vector3().setFromSpherical(new THREE.Spherical(3.3, phi, theta))
  }), [solutions])
  useFrame(({ size }, delta) => {
    if (group.current) {
      group.current.updateWorldMatrix(true, true)
      group.current.scale.x = size.width / size.height > 1.4 ? 1.35 : 1
      for (const mesh of meshes.current) {
        if (!mesh) continue
        mesh.scale.x = 1 / group.current.scale.x
        mesh.getWorldPosition(world)
        const material = mesh.material as THREE.MeshBasicMaterial
        material.opacity = THREE.MathUtils.clamp(THREE.MathUtils.mapLinear(world.z, -3.3, 3.3, .6, 1), .6, 1)
      }
    }
    if (!paused) {
      if (group.current && !hovered.current) group.current.rotation.y += Math.min(delta, .05) * .16
      invalidate()
    }
  })
  return <group ref={group} rotation={[.36, -.62, 0]}>{solutions.map((solution, index) => <SectorWord key={solution.slug} solution={solution} position={positions[index]} color="#f0f1f1" hovered={hovered} register={mesh => { meshes.current[index] = mesh }}/>)}</group>
}

function ResponsiveCamera() {
  const { camera, size, invalidate } = useThree()
  useEffect(() => {
    camera.position.set(0, 0, Math.max(9.5, 5.2 / (Math.tan(THREE.MathUtils.degToRad(24)) * size.width / size.height)))
    camera.updateProjectionMatrix()
    invalidate()
  }, [camera, size.width, size.height, invalidate])
  return null
}

export function SectorSphere({ solutions, paused, onUnavailable }: Props) {
  const finePointer = window.matchMedia('(pointer: fine)').matches
  return <div className="sector-three-canvas" aria-hidden="true">
    <Canvas frameloop="demand" dpr={[1, 1.5]} camera={{ position: [0, 0, 12.5], fov: 48 }} gl={{ alpha: true, antialias: true }} fallback={<span/>}
      onCreated={({ gl }) => { gl.setClearColor(0x000000, 0); gl.domElement.addEventListener('webglcontextlost', onUnavailable, { once: true }) }}>
      <ResponsiveCamera/><Cloud solutions={solutions} paused={paused}/>
      {finePointer && <TrackballControls noZoom noPan rotateSpeed={.4}/>}
    </Canvas>
  </div>
}

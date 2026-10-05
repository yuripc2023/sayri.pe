import * as THREE from 'three'
import { Billboard, Text, TrackballControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'
import type { Solution } from '../../data/solutions'

type Props = { solutions: Solution[] }

const HOVER_COLOR = '#2aa0ff'
const BASE_COLOR = { light: '#142d4a', dark: '#f2f8ff' } as const

function SectorWord({ solution, position, baseColor, onHoverChange }: {
  solution: Solution; position: THREE.Vector3; baseColor: string; onHoverChange: (value: boolean) => void
}) {
  const navigate = useNavigate()
  const meshRef = useRef<{ material: THREE.MeshBasicMaterial }>(null)
  const [hovered, setHovered] = useState(false)
  const color = useMemo(() => new THREE.Color(), [])

  useFrame(() => {
    const material = meshRef.current?.material
    if (material) material.color.lerp(color.set(hovered ? HOVER_COLOR : baseColor), 0.12)
  })

  return <Billboard position={position}>
    <Text
      ref={meshRef as never}
      fontSize={.34}
      maxWidth={2.1}
      textAlign="center"
      anchorX="center"
      anchorY="middle"
      lineHeight={1.15}
      material-toneMapped={false}
      onPointerOver={(event) => { event.stopPropagation(); setHovered(true); onHoverChange(true); document.body.style.cursor = 'pointer' }}
      onPointerOut={() => { setHovered(false); onHoverChange(false); document.body.style.cursor = 'auto' }}
      onClick={(event) => { event.stopPropagation(); navigate(`/soluciones/${solution.slug}`) }}
    >{solution.category}</Text>
  </Billboard>
}

/** Réplica del Cloud del ScreenSaver de ATIC: nodos de texto WebGL sobre una esfera, con arrastre libre y giro automático. */
function Cloud({ solutions }: Props) {
  const group = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const theme = useTheme()
  const baseColor = BASE_COLOR[theme]

  const positions = useMemo(() => {
    const spherical = new THREE.Spherical()
    return solutions.map((_, index) => {
      // El medio paso conserva la distribución Fibonacci del ScreenSaver y evita
      // colocar el primer rubro en un polo inmóvil de la rotación.
      const phi = Math.acos(-1 + (2 * (index + .5)) / solutions.length)
      const theta = Math.sqrt(solutions.length * Math.PI) * phi
      return new THREE.Vector3().setFromSpherical(spherical.set(2.9, phi, theta))
    })
  }, [solutions])

  useFrame((_, delta) => {
    if (group.current && !hovered) group.current.rotation.y += delta * .18
  })

  return <group ref={group} rotation={[.36, -.62, 0]}>
    {solutions.map((solution, index) => <SectorWord key={solution.slug} solution={solution} position={positions[index]} baseColor={baseColor} onHoverChange={setHovered} />)}
  </group>
}

export function SectorSphere({ solutions }: Props) {
  return <div className="sector-three-canvas" aria-hidden="true">
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 11.5], fov: 48 }} gl={{ alpha: true, antialias: true }} onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}>
      <Suspense fallback={null}>
        <Cloud solutions={solutions} />
      </Suspense>
      <TrackballControls noZoom noPan rotateSpeed={.4} />
    </Canvas>
  </div>
}

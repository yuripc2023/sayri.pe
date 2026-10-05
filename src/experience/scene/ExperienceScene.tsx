import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei/core/AdaptiveDpr'
import { SayriCore } from './SayriCore'
import { BusinessModules } from './BusinessModules'
import { CameraRig } from './CameraRig'
import { ConnectedStructure } from './ConnectedStructure'
import { RenderLifecycle } from './RenderLifecycle'
import { qualitySettings } from '../content'
import type { Quality } from '../content'
import type { ExperienceModel } from '../animation/model'

export default function ExperienceScene({ model, quality, onFailure }: { model: ExperienceModel; quality: Exclude<Quality, 'fallback'>; onFailure: () => void }) {
  return <Canvas frameloop="demand" dpr={[1, qualitySettings[quality].dpr]} camera={{ position: [0, 0, 9], fov: 40 }} gl={{ alpha: true, antialias: quality !== 'low', powerPreference: 'low-power' }} onCreated={({ gl, invalidate }) => {
    gl.setClearColor(0x000000, 0)
    invalidate()
  }}>
    <RenderLifecycle model={model} onFailure={onFailure} />
    <ambientLight intensity={1.1} /><directionalLight position={[4, 6, 8]} intensity={2.5} color="#b3ddff" />
    <CameraRig model={model} /><ConnectedStructure model={model} count={qualitySettings[quality].count} /><BusinessModules model={model} /><SayriCore model={model} lowQuality={quality === 'low'} /><AdaptiveDpr />
  </Canvas>
}

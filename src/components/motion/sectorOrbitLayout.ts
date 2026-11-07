export const ORBIT_RADII = [4.5, 6.7, 8.9] as const
export const ORBIT_SPEED = .06

export function getOrbitPosition(index: number, count: number, angle: number) {
  const ring = index % ORBIT_RADII.length
  const slot = Math.floor(index / ORBIT_RADII.length)
  const occupants = Math.ceil((count - ring) / ORBIT_RADII.length)
  const phase = slot * Math.PI * 2 / occupants + ring * Math.PI / 5
  const radius = ORBIT_RADII[ring]
  return { x: Math.cos(phase + angle) * radius, y: Math.sin(phase + angle) * radius }
}

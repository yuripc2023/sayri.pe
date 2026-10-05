// Pure deterministic layouts. The same instances survive every chapter.
export type NodePose = { x: number; y: number; z: number; scale: number }
const clamp = (n: number) => Math.max(0, Math.min(1, n))
const ease = (n: number) => { const t = clamp(n); return t * t * (3 - 2 * t) }

export function groupCenter(stage: number, group: number): [number, number, number] {
  if (stage === 0) return [0, 0, 0]
  if (stage === 1) return [(group % 2 ? 1 : -1) * 1.3, (group < 2 ? 1 : -1) * .95, 0]
  if (stage === 2) return [(group - 1.5) * 1.6, Math.sin(group * 1.6) * .45, 0]
  if (stage === 3) return [Math.cos(group * Math.PI / 2) * 2, Math.sin(group * Math.PI / 2) * 1.6, 0]
  if (stage === 4) return [(group % 2 ? 1 : -1) * 1.5, (group < 2 ? 1 : -1) * 1.1, group % 2 ? -.35 : .35]
  if (stage >= 6) return [Math.cos(group * Math.PI / 2) * 1.55, Math.sin(group * Math.PI / 2) * 1.15, 0]
  return [(group % 2 ? 1 : -1) * 1.25, group * .18 - .35, (group < 2 ? 1 : -1) * 1.25]
}

export function nodeAt(stage: number, index: number, count: number, out: NodePose): NodePose {
  const groupSize = count / 4
  const group = Math.floor(index / groupSize)
  const local = index % groupSize
  const [x, y, z] = groupCenter(stage, group)
  if (stage === 0) {
    const theta = index * 2.399963
    const height = 1 - (index / Math.max(1, count - 1)) * 2
    const radius = Math.sqrt(1 - height * height) * 2.5
    out.x = index ? Math.cos(theta) * radius : 0
    out.y = index ? height * 2.5 : 0
    out.z = index ? Math.sin(theta) * radius : 0
    out.scale = index ? 0 : .14
  } else if (stage >= 6) {
    const theta = index * 2.399963
    const height = 1 - (index + .5) / count * 2
    const radius = Math.sqrt(1 - height * height)
    if (stage === 6) {
      const angle = index / count * Math.PI * 2
      out.x = Math.cos(angle) * 2.2
      out.y = Math.sin(angle) * 1.45
      out.z = Math.sin(angle * 4) * .45
    } else {
      out.x = Math.cos(theta) * radius * 2.1
      out.y = height * 2.1
      out.z = Math.sin(theta) * radius * 2.1
    }
    out.scale = .035
  } else {
    const corner = local % 8
    const size = stage === 1 ? .32 : stage === 2 ? .38 : .48
    const layer = 1 + Math.floor(local / 8) * .4
    out.x = x + (corner & 1 ? 1 : -1) * size * layer
    out.y = y + (corner & 2 ? 1 : -1) * size * layer
    out.z = z + (corner & 4 ? 1 : -1) * size * layer
    out.scale = .045
  }
  return out
}

export function createLayouts(count: number): Float32Array {
  const array = new Float32Array(8 * count * 4)
  const pose = { x: 0, y: 0, z: 0, scale: 0 }
  for (let stage = 0; stage < 8; stage++) for (let i = 0; i < count; i++) {
    nodeAt(stage, i, count, pose)
    array.set([pose.x, pose.y, pose.z, pose.scale], (stage * count + i) * 4)
  }
  return array
}

export function sampleLayout(layouts: Float32Array, count: number, phase: number, index: number, out: NodePose) {
  const safe = Math.max(0, Math.min(7, phase))
  const stage = Math.floor(safe)
  const next = Math.min(7, stage + 1)
  const progress = ease(safe - stage)
  const from = (stage * count + index) * 4
  const to = (next * count + index) * 4
  out.x = layouts[from] + (layouts[to] - layouts[from]) * progress
  out.y = layouts[from + 1] + (layouts[to + 1] - layouts[from + 1]) * progress
  out.z = layouts[from + 2] + (layouts[to + 2] - layouts[from + 2]) * progress
  out.scale = layouts[from + 3] + (layouts[to + 3] - layouts[from + 3]) * progress
  return out
}

export function createEdges(count: number): [number, number][] {
  const edges: [number, number][] = []
  const groupSize = count / 4
  for (let group = 0; group < 4; group++) {
    const base = group * groupSize
    for (let local = 0; local < groupSize; local++) {
      const corner = local % 8
      for (const bit of [1, 2, 4]) {
        if (!(corner & bit) && local + bit < groupSize) edges.push([base + local, base + local + bit])
      }
      if (local >= 8) edges.push([base + local - 8, base + local])
    }
    if (group < 3) edges.push([base, base + groupSize])
  }
  return edges
}

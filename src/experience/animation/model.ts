export type ExperienceModel = { phase: number; invalidate: () => void }
export function createExperienceModel(): ExperienceModel {
  return { phase: 0, invalidate: () => {} }
}
export function clamp(value: number, min = 0, max = 1) { return Math.max(min, Math.min(max, value)) }
export function smooth(value: number) { const t = clamp(value); return t * t * (3 - 2 * t) }

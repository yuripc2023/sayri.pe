import test from 'node:test'
import assert from 'node:assert/strict'
import { getOrbitPosition, ORBIT_RADII, ORBIT_SPEED } from '../src/components/motion/sectorOrbitLayout.ts'

test('all 15 sectors keep a fixed radius and return to their starting position', () => {
  for (let index = 0; index < 15; index++) {
    const initial = getOrbitPosition(index, 15, 0)
    for (let step = 0; step <= 360; step++) {
      const point = getOrbitPosition(index, 15, step * Math.PI / 180)
      assert.ok(Math.abs(Math.hypot(point.x, point.y) - ORBIT_RADII[index % 3]) < 1e-10)
    }
    const end = getOrbitPosition(index, 15, Math.PI * 2)
    assert.ok(Math.hypot(end.x - initial.x, end.y - initial.y) < 1e-10)
  }
})

test('orbital motion is continuous and preserves spacing between sectors', () => {
  for (let index = 0; index < 15; index++) {
    const first = getOrbitPosition(index, 15, 1)
    const next = getOrbitPosition(index, 15, 1 + ORBIT_SPEED / 60)
    assert.ok(Math.hypot(next.x - first.x, next.y - first.y) < .01)
    for (let other = index + 1; other < 15; other++) {
      const a = getOrbitPosition(other, 15, 1)
      assert.ok(Math.hypot(first.x - a.x, first.y - a.y) > Math.hypot(3.8, 1.267))
      const b = getOrbitPosition(other, 15, 4)
      const later = getOrbitPosition(index, 15, 4)
      assert.ok(Math.abs(Math.hypot(first.x - a.x, first.y - a.y) - Math.hypot(later.x - b.x, later.y - b.y)) < 1e-10)
    }
  }
})

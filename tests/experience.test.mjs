import { test } from 'node:test'
import assert from 'node:assert/strict'
import { chapters, qualitySettings } from '../src/experience/content.ts'
import { createLayouts, sampleLayout, createEdges } from '../src/experience/scene/layout.ts'

test('eight distinct narrative labels and bounded quality levels', () => {
  assert.equal(chapters.length, 8)
  assert.equal(new Set(chapters.map(chapter => chapter.id)).size, 8)
  assert.ok(qualitySettings.low.count < qualitySettings.high.count)
  for (const quality of Object.values(qualitySettings)) {
    assert.equal(quality.count % 4, 0)
    assert.ok(quality.dpr <= 1.5)
  }
})

test('layouts are finite, bounded and reversible across every quality', () => {
  for (const { count } of Object.values(qualitySettings)) {
    const layouts = createLayouts(count)
    const pose = { x: 0, y: 0, z: 0, scale: 0 }
    const forward = []
    for (let phase = 0; phase <= 7; phase += .125) {
      for (let index = 0; index < count; index++) {
        sampleLayout(layouts, count, phase, index, pose)
        assert.ok(Object.values(pose).every(Number.isFinite))
        assert.ok(Math.max(Math.abs(pose.x), Math.abs(pose.y), Math.abs(pose.z)) < 8)
        assert.ok(pose.scale >= 0)
      }
      forward.push({ ...sampleLayout(layouts, count, phase, 0, pose) })
    }
    for (let phase = 7; phase >= 0; phase -= .125) {
      assert.deepEqual(sampleLayout(layouts, count, phase, 0, pose), forward[phase * 8])
    }
    for (const edge of createEdges(count)) assert.ok(edge.every(index => index >= 0 && index < count))
    assert.equal(sampleLayout(layouts, count, 0, 0, pose).scale > 0, true)
    assert.equal(sampleLayout(layouts, count, 0, 1, pose).scale, 0)
  }
})

test('chapter boundaries remain continuous and the final structures differ', () => {
  const count = qualitySettings.low.count
  const layouts = createLayouts(count)
  const poseA = { x: 0, y: 0, z: 0, scale: 0 }
  const poseB = { ...poseA }
  for (let stage = 1; stage < 7; stage++) {
    for (let index = 0; index < count; index++) {
      sampleLayout(layouts, count, stage - .0001, index, poseA)
      sampleLayout(layouts, count, stage + .0001, index, poseB)
      for (const field of ['x', 'y', 'z', 'scale']) assert.ok(Math.abs(poseA[field] - poseB[field]) < .001)
    }
  }
  assert.notDeepEqual(sampleLayout(layouts, count, 5, 0, poseA), sampleLayout(layouts, count, 6, 0, poseB))
  assert.notDeepEqual(sampleLayout(layouts, count, 6, 0, poseA), sampleLayout(layouts, count, 7, 0, poseB))
})

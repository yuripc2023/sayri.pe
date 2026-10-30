import test from 'node:test'
import assert from 'node:assert/strict'
import { armors } from '../src/data/armors.ts'
import { solutions } from '../src/data/solutions.ts'

test('every selectable sector has a distinct identity and an existing destination', () => {
  assert.equal(armors.length, 14)
  for (const field of ['slug', 'label', 'emblem']) {
    assert.equal(new Set(armors.map(armor => armor[field])).size, armors.length)
  }
  for (const armor of armors) {
    assert.ok(solutions.some(solution => solution.slug === armor.slug), armor.slug)
    assert.equal(armor.capabilities.length, 3)
    assert.match(armor.color, /^#[0-9a-f]{6}$/i)
  }
})

// A repeated base image must never replace the promised occupation-specific renders.
test('all sectors have a unique local render and personality', async () => {
  const { sectorMascots } = await import('../src/data/sectorMascots.ts')
  const { readFileSync } = await import('node:fs')
  const { createHash } = await import('node:crypto')
  assert.deepEqual(Object.keys(sectorMascots).sort(), armors.map(armor => armor.slug).sort())
  const hashes = new Set()
  for (const armor of armors) {
    const asset = sectorMascots[armor.slug]
    assert.ok(asset.personality.length > 5)
    const bytes = readFileSync(new URL(asset.src))
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF')
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP')
    assert.ok(bytes.length > 10_000)
    hashes.add(createHash('sha256').update(bytes).digest('hex'))
  }
  assert.equal(hashes.size, armors.length)
})

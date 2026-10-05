import { test } from 'node:test'
import assert from 'node:assert/strict'
import { emptyLead, validateLead, submitLead } from '../src/services/leads.ts'

const values = { ...emptyLead, FirstName: ' Ana ', Email: ' ana@example.com ', Phone: '999111222', NeedDescription: 'Información' }

test('requires a contact identifier, validates optional email and message limit', () => {
  assert.ok(validateLead(emptyLead).FirstName)
  assert.ok(validateLead({ ...emptyLead, LastName: 'Pérez' }).FirstName)
  for (const field of ['FirstName', 'Email', 'Phone']) {
    assert.deepEqual(validateLead({ ...emptyLead, [field]: field === 'Email' ? 'ana@example.com' : 'Ana' }), {})
  }
  assert.ok(validateLead({ ...values, Email: 'invalid@' }).Email)
  assert.ok(validateLead({ ...values, NeedDescription: 'a'.repeat(5001) }).NeedDescription)
  assert.deepEqual(validateLead({ ...values, NeedDescription: 'a'.repeat(5000) }), {})
})

test('POST sends only nonempty public fields as JSON without session credentials', async () => {
  const original = globalThis.fetch
  let calls = 0
  globalThis.fetch = async (url, options) => {
    calls++
    assert.equal(url, 'https://api.atic.pe/api/crm/public/leads/')
    assert.equal(options.method, 'POST')
    assert.equal(options.credentials, 'omit')
    assert.deepEqual(options.headers, { 'Content-Type': 'application/json' })
    assert.deepEqual(JSON.parse(options.body), { FirstName: 'Ana', Email: 'ana@example.com', Phone: '999111222', NeedDescription: 'Información' })
    return new Response(null, { status: 201 })
  }
  try {
    assert.deepEqual(await submitLead({ ...values, LastName: '  ', Company: 'internal', Pipeline: 1, Stage: 2, AssignedTo: 3 }), { ok: true })
    assert.equal(calls, 1)
    assert.equal((await submitLead(emptyLead)).ok, false)
    assert.equal(calls, 1)
  } finally { globalThis.fetch = original }
})

test('maps field errors and handles throttling, unavailability, unexpected errors and network failure', async () => {
  const original = globalThis.fetch
  try {
    globalThis.fetch = async () => new Response(JSON.stringify({ Email: ['Correo inválido.'], Phone: 'Teléfono inválido.', non_field_errors: ['Revisa tus datos.'] }), { status: 400 })
    const invalid = await submitLead(values)
    assert.deepEqual(invalid.errors, { Email: 'Correo inválido.', Phone: 'Teléfono inválido.' })
    assert.equal(invalid.message, 'Revisa tus datos.')
    for (const [status, pattern] of [[429, /Espera/], [503, /temporalmente/], [500, /Intenta nuevamente/]]) {
      globalThis.fetch = async () => new Response(null, { status })
      const result = await submitLead(values)
      assert.equal(result.ok, false)
      assert.match(result.message, pattern)
    }
    globalThis.fetch = async () => new Response('not json', { status: 400 })
    assert.equal((await submitLead(values)).ok, false)
    const saved = { ...values }
    globalThis.fetch = async () => { throw new TypeError('Failed to fetch') }
    assert.match((await submitLead(values)).message, /datos se conservan/)
    assert.deepEqual(values, saved)
    globalThis.fetch = async () => new Response(null, { status: 201 })
    assert.deepEqual(await submitLead(values), { ok: true })
  } finally { globalThis.fetch = original }
})

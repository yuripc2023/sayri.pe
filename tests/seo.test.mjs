import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { resolve } from 'node:path'

const pages = JSON.parse(await readFile('src/data/seo.json', 'utf8'))
const origin = 'https://www.sayri.pe'
const read = path => readFile(resolve('dist', `.${path}`, 'index.html'), 'utf8')

test('each indexable route ships unique metadata, one h1 and real HTML without JavaScript', async () => {
  const titles = new Set()
  const descriptions = new Set()
  for (const [path, info] of Object.entries(pages)) {
    const html = await read(path)
    assert.equal((html.match(/<h1\b/g) ?? []).length, 1, path)
    assert.equal((html.match(/<title>/g) ?? []).length, 1, path)
    assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1, path)
    assert.ok(html.includes(`<link rel="canonical" href="${origin}${path}"`), path)
    assert.ok(html.includes(`content="${info.description}"`), path)
    assert.ok(html.includes(`property="og:url" content="${origin}${path}"`), path)
    assert.ok(html.includes(`property="og:title" content="${info.title}"`), path)
    assert.ok(html.includes('name="twitter:description"'), path)
    assert.ok(html.includes('index,follow,max-image-preview:large'), path)
    assert.ok(!html.includes('src="/src/'), path)
    assert.ok(!html.includes('file://'), path)
    assert.ok(!html.includes('<!--seo-head-->'), path)
    assert.ok(html.includes('id="main"'), path)
    assert.ok(html.includes('href="/#contacto"'), path)
    const json = JSON.parse(html.match(/<script id="sayri-structured-data" type="application\/ld\+json">(.*?)<\/script>/s)[1])
    assert.equal(json['@context'], 'https://schema.org')
    assert.ok(json['@graph'].some(item => ['WebPage', 'CollectionPage'].includes(item['@type']) && item.url === origin + path))
    if (path.startsWith('/soluciones/')) assert.ok(json['@graph'].some(item => item['@type'] === 'Service' && item.url === origin + path))
    assert.ok(html.includes('summary_large_image'), path)
    assert.ok(html.includes('property="og:image:width" content="620"'), path)
    if (path !== '/') assert.ok(json['@graph'].some(item => item['@type'] === 'BreadcrumbList'))
    for (const [, asset] of html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)) await access(resolve('dist', '.' + asset))
    assert.ok(!titles.has(info.title), `Duplicate title: ${path}`)
    assert.ok(!descriptions.has(info.description), `Duplicate description: ${path}`)
    titles.add(info.title); descriptions.add(info.description)
  }
})

test('sitemap includes exactly the canonical indexable routes and robots advertises it', async () => {
  const sitemap = await readFile('dist/sitemap.xml', 'utf8')
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1])
  assert.deepEqual(locations.sort(), Object.keys(pages).map(path => origin + path).sort())
  assert.ok((await readFile('dist/robots.txt', 'utf8')).includes(`Sitemap: ${origin}/sitemap.xml`))
  await access('dist/social/sayri.png')
})

test('404 and pending content are noindex without stale home canonical or description', async () => {
  for (const file of ['dist/404.html', 'dist/soluciones/encomiendas/index.html']) {
    const html = await readFile(file, 'utf8')
    assert.ok(html.includes('noindex,follow'), file)
    assert.ok(!html.includes('rel="canonical"'), file)
    assert.ok(!html.includes(pages['/'].description), file)
  }
})

test('preview serves each clean URL its own HTML and returns 404 for unknown routes', async () => {
  const { previewPrerenderedRoutes } = await import('../scripts/preview.mjs')
  let middleware
  previewPrerenderedRoutes().configurePreviewServer({
    config: { root: process.cwd(), build: { outDir: 'dist' } },
    middlewares: { use(handler) { middleware = handler } },
  })
  for (const path of Object.keys(pages)) {
    const request = { method: 'GET', url: path + '?campaign=demo' }
    middleware(request, {}, () => {})
    assert.equal(request.url, `${path === '/' ? '' : path}/index.html?campaign=demo`)
  }
  const request = { method: 'GET', url: '/pagina-inexistente' }
  const response = { setHeader() {}, end(body) { this.body = body } }
  middleware(request, response, () => {})
  assert.equal(response.statusCode, 404)
  assert.ok(response.body.toString().includes('noindex,follow'))
  const asset = { method: 'GET', url: '/assets/missing.js' }
  middleware(asset, {}, () => {})
  assert.equal(asset.url, '/assets/missing.js')
})

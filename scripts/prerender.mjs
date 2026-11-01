import { createServer } from 'vite'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const template = await readFile('dist/index.html', 'utf8')
const manifest = JSON.parse(await readFile('dist/.vite/manifest.json', 'utf8'))
const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false, watch: null }, optimizeDeps: { noDiscovery: true, include: [] }, appType: 'custom' })
try {
  const { paths, renderPaths, render } = await server.ssrLoadModule('/src/entry-prerender.tsx')
  for (const path of [...renderPaths, '/404']) {
    const { html, head } = render(path)
    let document = template.replace('<!--seo-head-->', head).replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    document = document.replaceAll(pathToFileURL(resolve('.')).href, '')
    // Vite's SSR dev loader returns source asset paths; resolve them to this build's hashed assets.
    for (const [source, entry] of Object.entries(manifest)) {
      if (!entry.isEntry && entry.file) document = document.replaceAll(`/${source}`, `/${entry.file}`)
    }
    if (document.includes('file://') || document.includes('src="/src/') || document.includes('href="/src/')) throw new Error(`Unresolved source asset in ${path}`)
    const target = path === '/404' ? 'dist/404.html' : resolve('dist', `.${path}`, 'index.html')
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, document)
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map(path => `  <url><loc>https://www.sayri.pe${path}</loc></url>`).join('\n')}\n</urlset>\n`
  await writeFile('dist/sitemap.xml', sitemap)
  console.log(`Prerendered ${paths.length} indexable pages and 404.html`)
} finally { await server.close() }

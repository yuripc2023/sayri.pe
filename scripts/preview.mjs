import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export function previewPrerenderedRoutes() {
  return {
    name: 'preview-prerendered-routes',
    configurePreviewServer(server) {
      // Vite's SPA fallback otherwise serves the home HTML for clean route URLs.
      server.middlewares.use((request, response, next) => {
        const url = new URL(request.url ?? '/', 'http://localhost')
        const pathname = url.pathname.replace(/\/+$/, '') || '/'
        if ((request.method === 'GET' || request.method === 'HEAD') && /^\/[a-z0-9/-]*$/.test(pathname)) {
          const file = `${pathname === '/' ? '' : pathname}/index.html`
          if (existsSync(resolve(server.config.root, server.config.build.outDir, `.${file}`))) {
            request.url = file + url.search
          } else {
            response.statusCode = 404
            response.setHeader('Content-Type', 'text/html; charset=utf-8')
            response.end(request.method === 'HEAD' ? undefined : readFileSync(resolve(server.config.root, server.config.build.outDir, '404.html')))
            return
          }
        }
        next()
      })
    },
  }
}

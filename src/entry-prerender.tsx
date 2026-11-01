import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { solutions } from './data/solutions'
import App from './app/App'
import { seoHead, seoPages } from './config/seo'
export const paths = Object.keys(seoPages)
export const renderPaths = [...new Set([...paths, ...solutions.map(solution => `/soluciones/${solution.slug}`)])]
export function render(path: string) {
  return { html: renderToString(<StaticRouter location={path}><App/></StaticRouter>), head: seoHead(path) }
}

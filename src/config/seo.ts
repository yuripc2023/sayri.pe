import pages from '../data/seo.json'
import { solutions } from '../data/solutions'

export const siteUrl = 'https://www.sayri.pe'
export const socialImage = `${siteUrl}/social/sayri.png`
export const seoPages: Record<string, { title: string; description: string }> = pages
export function normalizePath(path: string) {
  return path.split(/[?#]/)[0].replace(/\/+$/, '') || '/'
}
export function pageSeo(path: string, fallback?: { title: string; description?: string; noindex?: boolean }) {
  const pathname = normalizePath(path)
  const page = Object.hasOwn(seoPages, pathname) ? seoPages[pathname] : undefined
  const pending = pathname.startsWith('/soluciones/') ? solutions.find(solution => pathname === `/soluciones/${solution.slug}`) : undefined
  return {
    pathname,
    title: page?.title ?? fallback?.title ?? (pending ? `${pending.name} | Próximamente` : 'Página no encontrada | SAYRI'),
    description: page?.description ?? fallback?.description ?? pending?.description ?? 'Explora las soluciones de gestión empresarial de SAYRI.',
    noindex: !page || !!fallback?.noindex,
    canonical: `${siteUrl}${pathname === '/' ? '/' : pathname}`,
  }
}
// Shared by the prerenderer and client navigation to keep social previews identical.
export function socialMetadata(page: ReturnType<typeof pageSeo>) {
  return {
    openGraph: { 'og:site_name': 'SAYRI', 'og:locale': 'es_PE', 'og:type': 'website', 'og:title': page.title, 'og:description': page.description, 'og:url': page.canonical, 'og:image': socialImage, 'og:image:secure_url': socialImage, 'og:image:type': 'image/png', 'og:image:width': '620', 'og:image:height': '292', 'og:image:alt': 'SAYRI, plataforma de gestión empresarial' },
    twitter: { 'twitter:card': 'summary_large_image', 'twitter:title': page.title, 'twitter:description': page.description, 'twitter:image': socialImage, 'twitter:image:alt': 'SAYRI, plataforma de gestión empresarial' },
  }
}
export function structuredData(path: string) {
  const page = pageSeo(path)
  const solution = solutions.find(item => page.pathname === `/soluciones/${item.slug}`)
  const graph: Record<string, unknown>[] = [
    { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'SAYRI', url: `${siteUrl}/`, logo: socialImage, parentOrganization: { '@type': 'Organization', name: 'ATIC Perú', url: 'https://atic.pe' } },
    { '@type': 'WebSite', '@id': `${siteUrl}/#website`, name: 'SAYRI', url: `${siteUrl}/`, inLanguage: 'es-PE', publisher: { '@id': `${siteUrl}/#organization` } },
    { '@type': page.pathname === '/soluciones' ? 'CollectionPage' : 'WebPage', '@id': `${page.canonical}#webpage`, url: page.canonical, name: page.title, description: page.description, inLanguage: 'es-PE', isPartOf: { '@id': `${siteUrl}/#website` } },
  ]
  if (solution && !page.noindex) {
    graph.push({ '@type': 'Service', '@id': `${page.canonical}#service`, name: solution.title, description: page.description, url: page.canonical, serviceType: solution.category, provider: { '@id': `${siteUrl}/#organization` }, mainEntityOfPage: { '@id': `${page.canonical}#webpage` } })
  }
  if (page.pathname !== '/' && !page.noindex) {
    const names = [{ name: 'Inicio', item: `${siteUrl}/` }]
    if (page.pathname.startsWith('/soluciones')) names.push({ name: 'Soluciones', item: `${siteUrl}/soluciones` })
    if (page.pathname !== '/soluciones') names.push({ name: solution?.title ?? page.title.split('|')[0].trim(), item: page.canonical })
    graph.push({ '@type': 'BreadcrumbList', itemListElement: names.map((entry, index) => ({ '@type': 'ListItem', position: index + 1, ...entry })) })
  }
  if (page.pathname === '/soluciones') graph.push({ '@type': 'ItemList', name: 'Soluciones SAYRI', itemListElement: Object.entries(seoPages).filter(([route]) => route.startsWith('/soluciones/')).map(([route, info], index) => ({ '@type': 'ListItem', position: index + 1, name: info.title.split('|')[0].trim(), url: `${siteUrl}${route}` })) })
  return { '@context': 'https://schema.org', '@graph': graph }
}
export function serializeJsonLd(value: unknown) { return JSON.stringify(value).replace(/</g, '\\u003c') }
export function seoHead(path: string) {
  const page = pageSeo(path)
  const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  const meta = (key: string, value: string, property = false) => `<meta ${property ? 'property' : 'name'}="${key}" content="${escape(value)}"/>`
  return `<title>${escape(page.title)}</title>` + meta('description', page.description) + meta('robots', page.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large') + (page.noindex ? '' : `<link rel="canonical" href="${page.canonical}"/>`) +
    Object.entries(socialMetadata(page).openGraph).map(([key, value]) => meta(key, value, true)).join('') +
    Object.entries(socialMetadata(page).twitter).map(([key, value]) => meta(key, value)).join('') +
    `<script id="sayri-structured-data" type="application/ld+json">${serializeJsonLd(structuredData(path))}</script>`
}

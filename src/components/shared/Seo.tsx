import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { pageSeo, serializeJsonLd, socialMetadata, structuredData } from '../../config/seo'

export function Seo({ title, description, noindex = false }: { title: string; description?: string; noindex?: boolean }) {
  const { pathname } = useLocation()
  useEffect(() => {
    const page = pageSeo(pathname, { title, description, noindex })
    document.title = page.title
    const set = (key: string, value: string, property = false) => {
      const attribute = property ? 'property' : 'name'
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
      if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, key); document.head.append(element) }
      element.content = value
    }
    set('description', page.description)
    set('robots', page.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large')
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (page.noindex) canonical?.remove()
    else {
      if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical) }
      canonical.href = page.canonical
    }
    const social = socialMetadata(page)
    for (const [key, value] of Object.entries(social.openGraph)) set(key, value, true)
    for (const [key, value] of Object.entries(social.twitter)) set(key, value)
    let script = document.getElementById('sayri-structured-data') as HTMLScriptElement | null
    if (!script) { script = document.createElement('script'); script.id = 'sayri-structured-data'; script.type = 'application/ld+json'; document.head.append(script) }
    script.textContent = serializeJsonLd(structuredData(pathname))
  }, [pathname, title, description, noindex])
  return null
}

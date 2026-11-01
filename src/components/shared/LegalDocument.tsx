import { contact } from '../../config/contact'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from './Seo'
import '../../pages/legal-document.css'

export type LegalSection = { id: string; title: string; content: ReactNode }

export function LegalDocument({ title, description, sections }: { title: string; description: string; sections: LegalSection[] }) {
  return <main id="main" className="legal-document">
    <Seo title={`${title} | SAYRI`} description={description}/>
    <header className="legal-document-header">
      <Link className="text-link" to="/">← Volver al inicio</Link>
      <p className="eyebrow">SAYRI / INFORMACIÓN LEGAL</p>
      <h1>{title}</h1>
      <p className="lead">{description}</p>
      <p className="legal-document-date">Última actualización: <time dateTime="2026-11-01">1 de noviembre de 2026</time></p>
    </header>
    <address className="legal-document-owner"><strong>ATIC Perú S. R. L.</strong><span>RUC: 20568216190</span><span>Psje. Valladolid N.° 154, Huancayo, Perú</span><a href={`mailto:${contact.privacyEmail}`}>{contact.privacyEmail}</a></address>
    <div className="legal-document-layout">
      <nav className="legal-document-index" aria-label={`Contenido de ${title.toLowerCase()}`}>
        <p>En esta página</p>
        <ol>{sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol>
      </nav>
      <article className="legal-document-content" aria-label={title}>
        {sections.map(section => <section id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}><h2 id={`${section.id}-title`}>{section.title}</h2>{section.content}</section>)}
        <div className="legal-document-related"><Link to="/politica-de-privacidad">Política de privacidad</Link><Link to="/terminos-y-condiciones">Términos y condiciones</Link></div>
      </article>
    </div>
  </main>
}

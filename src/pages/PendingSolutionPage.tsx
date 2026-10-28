import type { CSSProperties } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Seo } from '../components/shared/Seo'
import { ScheduleDemoButton } from '../components/shared/ScheduleDemoButton'
import { SectorMascot } from '../components/hangar/SectorMascot'
import { armors } from '../data/armors'
import { solutions } from '../data/solutions'

export default function PendingSolutionPage() {
  const { slug } = useParams()
  const solution = solutions.find(item => item.slug === slug)
  const armor = armors.find(item => item.slug === slug)
  if (!solution) return <main id="main" className="pending"><Seo title="Página no encontrada | Sayri" noindex/><h1>Página no encontrada</h1><Link className="text-link" to="/soluciones">Ver soluciones →</Link></main>
  if (!armor) return <main id="main" className="pending"><Seo title={`${solution.name} | Próximamente`} noindex/><p className="eyebrow">{solution.category}</p><span className="badge">PRÓXIMAMENTE</span><h1>{solution.title}</h1><p className="lead">{solution.description}</p><Link className="button" to="/soluciones">Volver a Soluciones ←</Link></main>
  return <main id="main" className="solution-detail" style={{ '--suit-color': armor.color } as CSSProperties}>
    <Seo title={`${solution.name} | ${solution.title}`} description={armor.description}/>
    <Link className="text-link" to="/">← Volver al universo SAYRI</Link>
    <div className="solution-hero"><div><p className="eyebrow">SAYRI / {armor.label}</p><h1>{solution.title}</h1><p className="lead">{armor.description}</p><p className="lead">Conversemos sobre tus procesos y diseñemos una implementación de SAYRI para tu operación.</p><div className="actions"><ScheduleDemoButton /><Link className="text-link" to="/#contacto">Cuéntanos qué necesitas ↗</Link></div></div><div className="solution-portrait"><SectorMascot armor={armor}/></div></div>
    <section className="solution-features" aria-label="Áreas para explorar en la demostración">{armor.capabilities.map((item, index) => <article key={item}><span>0{index + 1} / ÁREA DE GESTIÓN</span><h2>{item}</h2><p className="lead">Revisemos cómo conectar esta parte de tu operación con el resto de tu empresa.</p></article>)}</section>
    <Link className="text-link" to="/soluciones">Explorar otras soluciones →</Link>
  </main>
}

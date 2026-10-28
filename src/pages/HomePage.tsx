import { TechnologyEcosystem } from '../components/platform/TechnologyEcosystem'
import { MobileOperation } from '../components/platform/MobileOperation'
import { OrderJourney } from '../components/platform/OrderJourney'
import { ProgressiveGrowth } from '../components/platform/ProgressiveGrowth'
import { OperationEvolution } from '../components/platform/OperationEvolution'
import { WorkingMethod } from '../components/platform/WorkingMethod'
import { PlatformOverview } from '../components/platform/PlatformOverview'
import { SectorHangar } from '../components/hangar/SectorHangar'
// Narrativa reservada en src/experience/ para las próximas páginas por rubro.
import { ContactForm } from '../components/shared/ContactForm'
import { Seo } from '../components/shared/Seo';
export default function HomePage() { return <><Seo title="Sayri | Plataforma Empresarial Inteligente" description="Optimiza procesos, ventas, inventarios, facturación, operaciones y decisiones con una plataforma empresarial que crece junto a tu empresa." /><main id="main"><SectorHangar /><div id="historia-sayri"><div id="despues-de-la-historia" tabIndex={-1} /></div><PlatformOverview /><WorkingMethod /><OperationEvolution /><ProgressiveGrowth /><OrderJourney /><MobileOperation /><TechnologyEcosystem /><section className="faq" id="faq"><p className="eyebrow">PREGUNTAS FRECUENTES</p><h2>Empezar es más simple de lo que parece.</h2>{[['¿Tengo que implementar todo Sayri?', 'No. Sayri puede comenzar con procesos concretos.'], ['¿Puedo agregar nuevas capacidades después?', 'Sí. La arquitectura está pensada para evolucionar.'], ['¿Sayri funciona en celular?', 'Existen capacidades móviles para distintos procesos.'], ['¿Puedo trabajar con varias sucursales?', 'La plataforma contempla escenarios multiempresa y multisucursal cuando corresponde.'], ['¿Cómo solicito una demostración?', 'Puedes coordinarla por Google Calendar cuando esté habilitado o por WhatsApp.']].map(([q, a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</section><ContactForm /></main></> }
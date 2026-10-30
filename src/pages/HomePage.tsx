import { FrequentlyAskedQuestions } from '../components/platform/FrequentlyAskedQuestions'
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
export default function HomePage() { return <><Seo title="Sayri | Plataforma Empresarial Inteligente" description="Optimiza procesos, ventas, inventarios, facturación, operaciones y decisiones con una plataforma empresarial que crece junto a tu empresa." /><main id="main"><SectorHangar /><div id="historia-sayri"><div id="despues-de-la-historia" tabIndex={-1} /></div><PlatformOverview /><WorkingMethod /><OperationEvolution /><ProgressiveGrowth /><OrderJourney /><MobileOperation /><TechnologyEcosystem /><FrequentlyAskedQuestions /><ContactForm /></main></> }
import { basicModules, basicMonthlyPrice, customPricingFactors } from '../../data/pricing'
import { ScheduleDemoButton } from '../shared/ScheduleDemoButton'

export function SolutionPricing({ slug, name }: { slug: string; name: string }) {
  const modules = basicModules[slug] ?? ['Registro de clientes', 'Catálogo de productos y servicios', 'Registro de operaciones', 'Consulta de pagos y movimientos']
  return <section aria-labelledby="solution-pricing-title">
    <p className="eyebrow">PLANES PARA {name.toUpperCase()}</p>
    <h2 id="solution-pricing-title">Empieza con lo básico.<br/>Crece a tu medida.</h2>
    <p className="lead">Elige los módulos esenciales para empezar o solicita una propuesta para conectar más sedes, empresas y servicios.</p>
    <div className="solution-pricing-grid">
      <article className="solution-price-card solution-price-basic">
        <span className="solution-plan-label">PARA EMPEZAR</span><h3>Básico</h3>
        <p className="solution-price">S/ {basicMonthlyPrice}<span> / mes</span><span className="solution-price-tax">+ IGV</span></p>
        <p>Los módulos básicos de {name} para una empresa con un RUC y una sede.</p>
        <h4>Módulos incluidos</h4>
        <ul>{modules.map(module => <li key={module}>{module}</li>)}</ul>
        <p className="solution-plan-note">Los servicios adicionales, la migración y las funcionalidades personalizadas se cotizan en el plan A Medida.</p>
        <ScheduleDemoButton/>
      </article>
      <article className="solution-price-card solution-price-custom">
        <span className="solution-plan-label">PARA NECESIDADES ESPECÍFICAS</span><h3>A Medida</h3>
        <p className="solution-custom-quote">Cotización personalizada</p>
        <p className="solution-custom-intro">Incluye los módulos básicos. Amplía el plan con lo que necesita tu organización.</p>
        <h4>¿Qué incrementa el precio?</h4>
        <ul className="solution-pricing-factors">{customPricingFactors.map((factor, index) => <li key={factor.title}><span className="solution-factor-index" aria-hidden="true">0{index + 1}</span><strong>{factor.title}</strong><span>{factor.text}</span></li>)}</ul>
        <div className="solution-custom-footer"><p className="solution-plan-note"><strong>Otros servicios que aumentan la cotización</strong> Integraciones con otros sistemas, automatizaciones, capacitación adicional y soporte con condiciones especiales.</p>
        <p className="solution-plan-note">Según el alcance, los adicionales pueden generar un cargo de implementación, una tarifa mensual mayor o ambos. La cotización se presenta más IGV.</p>
        <ScheduleDemoButton/>
        </div>
      </article>
    </div>
    <p className="solution-caption">Todos los precios y cotizaciones se expresan más IGV. Los costos de implementación y los cargos mensuales se detallan en la propuesta antes de contratar.</p>
  </section>
}

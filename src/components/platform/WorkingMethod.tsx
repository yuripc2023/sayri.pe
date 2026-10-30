import { useEffect, useRef, type CSSProperties } from 'react'
import entendemos from '../../img/mascot/method/entendemos.webp'
import simplificamos from '../../img/mascot/method/simplificamos.webp'
import conectamos from '../../img/mascot/method/conectamos.webp'
import './method.css'

const steps = [
  { title: 'Entendemos', image: entendemos, detail: 'Escuchamos a tu equipo y observamos cómo trabaja.', label: 'PERSONAS Y CONTEXTO' },
  { title: 'Simplificamos', image: simplificamos, detail: 'Identificamos pasos innecesarios y definimos un proceso más claro.', label: 'PROCESOS CON SENTIDO' },
  { title: 'Conectamos', image: conectamos, detail: 'Implementamos tecnología para que la información acompañe el trabajo.', label: 'INFORMACIÓN QUE FLUYE' },
]

export function WorkingMethod() {
  const root = useRef<HTMLElement>(null)
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed')
          root.current?.classList.add('method-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.18 })
    root.current?.querySelectorAll('.method-step').forEach(step => observer.observe(step))
    return () => observer.disconnect()
  }, [])

  return <section id="como-trabajamos" className="working-method" ref={root} aria-labelledby="method-title">
    <div className="method-heading"><div><p className="eyebrow">NUESTRA FORMA DE ENTENDER LA TECNOLOGÍA</p><h2 id="method-title">Una mejor manera de trabajar empieza por <em>entenderte.</em></h2></div><p className="method-intro">Conocemos tu operación, ordenamos los procesos y construimos la tecnología que necesitas.</p></div>
    <ol className="method-steps">{steps.map((step, index) => <li className="method-step" key={step.title} style={{ '--step': index } as CSSProperties}>
      <div className="method-step-top" aria-hidden="true"><span className="method-dot"><i/></span><span className="method-number">0{index + 1}</span><span className="method-step-label">{step.label}</span></div>
      <img className="method-mascot" src={step.image} alt="" aria-hidden="true" width="1254" height="1254" loading="lazy" decoding="async"/><h3>{step.title}</h3><p>{step.detail}</p>
    </li>)}</ol>
    <div className="method-closing"><span className="method-human" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="9" r="4"/><path d="M7 27v-5c0-8 18-8 18 0v5M4 12h3M25 12h3M16 1v2"/></svg></span><p>La tecnología se adapta <strong>a las personas.</strong></p></div>
  </section>
}

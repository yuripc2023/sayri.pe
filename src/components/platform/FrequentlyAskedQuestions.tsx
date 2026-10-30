import { contact } from '../../config/contact'
import './faq.css'

const questions = [
  ['¿Tengo que implementar todo SAYRI?', 'Puedes empezar con un proceso concreto y un alcance definido. Primero revisamos qué necesita tu operación y acordamos por dónde comenzar.'],
  ['¿Puedo agregar nuevas capacidades después?', 'Sí. Puedes incorporar nuevas capacidades a medida que tu operación lo requiera. Revisamos cómo conectarlas con los procesos que ya utilizas y definimos el alcance de cada etapa.'],
  ['¿SAYRI funciona en celular?', 'SAYRI cuenta con capacidades móviles para distintos procesos, como consultar clientes o registrar pedidos. En la demostración podemos revisar cuáles se ajustan al trabajo de tu equipo.'],
  ['¿Puedo trabajar con varias sucursales?', 'La plataforma contempla escenarios multiempresa y multisucursal. Evaluamos la estructura de tu negocio, los accesos de cada equipo y la información que necesitas compartir entre sedes.'],
  ['¿Cómo solicito una demostración?', 'Puedes escribirnos por WhatsApp y contarnos qué quieres mejorar. Coordinamos una demostración según tu necesidad; también puedes usar la agenda cuando esté habilitada.'],
]

export function FrequentlyAskedQuestions() {
  return <section className="sayri-faq" id="faq" aria-labelledby="faq-title">
    <div className="sayri-faq-layout">
      <div className="sayri-faq-intro">
        <p className="eyebrow">PREGUNTAS FRECUENTES</p>
        <h2 id="faq-title">Tus dudas,<br /><span>resueltas.</span></h2>
        <p>Conoce cómo empezar con SAYRI y hacerlo crecer junto a tu empresa.</p>
      </div>
      <div className="sayri-faq-questions">
        {questions.map(([question, answer], index) => <details key={question} name="sayri-faq" open={index === 0}>
          <summary><span>{question}</span><span className="sayri-faq-toggle" aria-hidden="true" /></summary>
          <p>{answer}</p>
        </details>)}
        <div className="sayri-faq-help">
          <div><h3>¿Tienes otra pregunta?</h3><p>Cuéntanos qué necesita tu empresa.</p></div>
          <a className="button" href={contact.whatsapp} target="_blank" rel="noreferrer">Conversemos por WhatsApp <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </div>
  </section>
}

import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { emptyLead, submitLead, validateLead } from '../../services/leads'
import { contact } from '../../config/contact'
import './contact-form.css'
import type { LeadErrors, LeadValues } from '../../services/leads'

const labels = { FirstName: 'Nombre', LastName: 'Apellido', Email: 'Correo', Phone: 'Teléfono', NeedDescription: 'Mensaje' }
const autocomplete = { FirstName: 'given-name', LastName: 'family-name', Email: 'email', Phone: 'tel', NeedDescription: 'off' }

export function ContactForm() {
  const [values, setValues] = useState<LeadValues>({ ...emptyLead })
  const [channel, setChannel] = useState<'Phone' | 'Email'>('Phone')
  const [topics, setTopics] = useState<string[]>([])
  const [errors, setErrors] = useState<LeadErrors>({})
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [sending, setSending] = useState(false)
  const inFlight = useRef(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (inFlight.current) return
    setSuccess(false)
    const payload = { ...values, Email: channel === 'Email' ? values.Email : '', Phone: channel === 'Phone' ? values.Phone : '', NeedDescription: [topics.length ? `Me interesa mejorar: ${topics.join(', ')}.` : '', values.NeedDescription].filter(Boolean).join('\n\n') }
    const validation = validateLead(payload)
    if (!values[channel].trim()) validation[channel] = channel === 'Phone' ? 'Indica un número para que podamos contactarte.' : 'Indica un correo para que podamos contactarte.'
    setErrors(validation)
    if (Object.keys(validation).length) {
      setMessage('Revisa los campos indicados.')
      requestAnimationFrame(() => document.querySelector<HTMLElement>('#contacto [aria-invalid="true"]')?.focus())
      return
    }
    inFlight.current = true
    setSending(true)
    setMessage('')
    try {
      const result = await submitLead(payload)
      if (result.ok) {
        setValues({ ...emptyLead })
        setTopics([])
        setErrors({})
        setSuccess(true)
        setMessage('Recibimos tu solicitud. Nos pondremos en contacto contigo')
      } else {
        setErrors(result.errors ?? {})
        setMessage(result.message)
      }
    } finally {
      inFlight.current = false
      setSending(false)
    }
  }

  return <section className="contact-section" id="contacto" aria-labelledby="contact-title">
    <div className="contact-intro"><p className="eyebrow">HABLEMOS DE TU EMPRESA</p><h2 id="contact-title">¿Qué te gustaría <span>mejorar en tu empresa?</span></h2><p className="lead">Cuéntanos dónde se complica el trabajo. Podemos conversar sobre tu operación y encontrar por dónde empezar.</p>
      <ol className="contact-next-steps"><li><span>01</span> Nos cuentas tu necesidad.</li><li><span>02</span> Revisamos cómo podría ayudarte SAYRI.</li><li><span>03</span> Coordinamos una demostración si encaja contigo.</li></ol>
      <div className="contact-direct"><p>¿Prefieres escribirnos directamente?</p><a className="text-link" href={contact.whatsapp} target="_blank" rel="noreferrer">Hablemos por WhatsApp <span aria-hidden="true">↗</span></a></div>
    </div>
    <form className="contact-form" onSubmit={handleSubmit} noValidate aria-busy={sending}>
      <h3>Empecemos con una conversación</h3><p className="contact-hint">Solo necesitamos un medio para responderte. Los demás datos son opcionales.</p>
      <fieldset className="contact-channel" disabled={sending}><legend>¿Dónde prefieres que te contactemos?</legend>{(['Phone', 'Email'] as const).map(option => <label key={option}><input type="radio" name="contact-channel" value={option} checked={channel === option} onChange={() => { setChannel(option); setErrors({}); setMessage('') }} />{option === 'Phone' ? 'WhatsApp' : 'Correo'}</label>)}</fieldset>
      <fieldset disabled={sending}>
        {(['FirstName', channel, 'NeedDescription'] as const).map(field => {
          const props = {
            id: `contact-${field}`, name: field, value: values[field], autoComplete: autocomplete[field],
            'aria-invalid': Boolean(errors[field]), 'aria-describedby': errors[field] ? `error-${field}` : field === 'NeedDescription' ? 'message-limit' : undefined,
            required: field === channel,
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              setValues(current => ({ ...current, [field]: event.target.value }))
              setErrors(current => ({ ...current, [field]: undefined }))
              setMessage('')
            },
          }
          return <div className={`contact-field ${field === 'NeedDescription' ? 'contact-message' : ''}`} key={field}>
            <label htmlFor={props.id}>{field === 'NeedDescription' ? 'Cuéntanos un poco más' : field === 'Phone' ? 'Tu número de WhatsApp' : labels[field]} {field !== channel && <small>(opcional)</small>}</label>
            {field === 'NeedDescription' ? <textarea {...props} rows={5} maxLength={4800} placeholder="Por ejemplo: recibimos pedidos por mensaje y queremos organizarlos mejor." /> : <input {...props} placeholder={field === 'Phone' ? '+51 999 999 999' : field === 'Email' ? 'tu@empresa.com' : '¿Cómo te llamas?'} type={field === 'Email' ? 'email' : field === 'Phone' ? 'tel' : 'text'} />}
            {errors[field] && <span className="field-error" id={`error-${field}`}>{errors[field]}</span>}
            {field === 'NeedDescription' && <small id="message-limit">{values.NeedDescription.length}/4800 caracteres</small>}
          </div>
        })}
      </fieldset>
      <fieldset className="contact-topics" disabled={sending}><legend>¿Qué te gustaría mejorar? <small>(opcional)</small></legend><div>{['Ventas', 'Inventarios', 'Facturación', 'Operación móvil', 'Otro'].map(topic => <label key={topic}><input type="checkbox" checked={topics.includes(topic)} onChange={() => setTopics(current => current.includes(topic) ? current.filter(item => item !== topic) : [...current, topic])} /><span>{topic}</span></label>)}</div></fieldset>
      <div role="status" aria-live="polite" className={success ? 'contact-success' : 'field-error'}>{message}</div>
      <button className="button" type="submit" disabled={sending}>{sending ? 'Enviando…' : 'Quiero conversar sobre mi empresa'}<span aria-hidden="true">→</span></button>
    </form>
  </section>
}

import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { emptyLead, leadFields, submitLead, validateLead } from '../../services/leads'
import type { LeadErrors, LeadValues } from '../../services/leads'

const labels = { FirstName: 'Nombre', LastName: 'Apellido', Email: 'Correo', Phone: 'Teléfono', NeedDescription: 'Mensaje' }
const autocomplete = { FirstName: 'given-name', LastName: 'family-name', Email: 'email', Phone: 'tel', NeedDescription: 'off' }

export function ContactForm() {
  const [values, setValues] = useState<LeadValues>({ ...emptyLead })
  const [errors, setErrors] = useState<LeadErrors>({})
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [sending, setSending] = useState(false)
  const inFlight = useRef(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (inFlight.current) return
    setSuccess(false)
    const validation = validateLead(values)
    setErrors(validation)
    if (Object.keys(validation).length) {
      setMessage('Revisa los campos indicados.')
      return
    }
    inFlight.current = true
    setSending(true)
    setMessage('')
    try {
      const result = await submitLead(values)
      if (result.ok) {
        setValues({ ...emptyLead })
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
    <div><p className="eyebrow">HABLEMOS DE TU EMPRESA</p><h2 id="contact-title">Cuéntanos qué necesitas.</h2><p className="lead">Déjanos tu consulta y nos pondremos en contacto contigo.</p></div>
    <form className="contact-form" onSubmit={handleSubmit} noValidate aria-busy={sending}>
      <p className="contact-hint">Indica al menos tu nombre, correo o teléfono.</p>
      <fieldset disabled={sending}>
        {leadFields.map(field => {
          const props = {
            id: `contact-${field}`, name: field, value: values[field], autoComplete: autocomplete[field],
            'aria-invalid': Boolean(errors[field]), 'aria-describedby': errors[field] ? `error-${field}` : field === 'NeedDescription' ? 'message-limit' : undefined,
            onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              setValues(current => ({ ...current, [field]: event.target.value }))
              setErrors(current => ({ ...current, [field]: undefined }))
              setMessage('')
            },
          }
          return <div className={`contact-field ${field === 'NeedDescription' ? 'contact-message' : ''}`} key={field}>
            <label htmlFor={props.id}>{labels[field]}</label>
            {field === 'NeedDescription' ? <textarea {...props} rows={5} maxLength={5000} /> : <input {...props} type={field === 'Email' ? 'email' : field === 'Phone' ? 'tel' : 'text'} />}
            {errors[field] && <span className="field-error" id={`error-${field}`}>{errors[field]}</span>}
            {field === 'NeedDescription' && <small id="message-limit">{values.NeedDescription.length}/5000 caracteres</small>}
          </div>
        })}
      </fieldset>
      <div role="status" aria-live="polite" className={success ? 'contact-success' : 'field-error'}>{message}</div>
      <button className="button" type="submit" disabled={sending}>{sending ? 'Enviando…' : 'Enviar solicitud'}<span aria-hidden="true">→</span></button>
    </form>
  </section>
}

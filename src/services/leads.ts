export const leadFields = ['FirstName', 'LastName', 'Email', 'Phone', 'NeedDescription'] as const
export type LeadField = typeof leadFields[number]
export type LeadValues = Record<LeadField, string>
export type LeadErrors = Partial<Record<LeadField, string>>
export const emptyLead: LeadValues = { FirstName: '', LastName: '', Email: '', Phone: '', NeedDescription: '' }

export function validateLead(values: LeadValues): LeadErrors {
  const errors: LeadErrors = {}
  if (![values.FirstName, values.Email, values.Phone].some(value => value.trim())) {
    errors.FirstName = 'Indica al menos tu nombre, correo o teléfono.'
  }
  if (values.Email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.Email.trim())) {
    errors.Email = 'Ingresa un correo válido.'
  }
  if (values.NeedDescription.length > 5000) errors.NeedDescription = 'El mensaje no puede superar los 5000 caracteres.'
  return errors
}

export type LeadResult = { ok: true } | { ok: false; errors?: LeadErrors; message: string }

export async function submitLead(values: LeadValues): Promise<LeadResult> {
  const errors = validateLead(values)
  if (Object.keys(errors).length) return { ok: false, errors, message: 'Revisa los campos indicados.' }
  const body = Object.fromEntries(leadFields.flatMap(field => {
    const value = values[field].trim()
    return value ? [[field, value]] : []
  }))
  try {
    const response = await fetch('https://api.atic.pe/api/crm/public/leads/', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      credentials: 'omit', body: JSON.stringify(body),
    })
    if (response.status === 201) return { ok: true }
    if (response.status === 400) {
      const data = await response.json().catch(() => null)
      const fieldErrors: LeadErrors = {}
      for (const field of leadFields) {
        const error = data?.[field]
        if (typeof error === 'string') fieldErrors[field] = error
        else if (Array.isArray(error)) fieldErrors[field] = error.filter(item => typeof item === 'string').join(' ')
      }
      const general = data?.non_field_errors ?? data?.detail
      const message = typeof general === 'string' ? general : Array.isArray(general) ? general.filter(item => typeof item === 'string').join(' ') : ''
      return { ok: false, errors: fieldErrors, message: message || 'Revisa los campos indicados. No pudimos registrar tu solicitud.' }
    }
    if (response.status === 429) return { ok: false, message: 'Demasiados intentos. Espera antes de intentar nuevamente.' }
    if (response.status === 503) return { ok: false, message: 'El servicio no está disponible temporalmente. Intenta nuevamente más tarde.' }
    return { ok: false, message: 'No pudimos registrar tu solicitud. Intenta nuevamente.' }
  } catch {
    return { ok: false, message: 'No pudimos conectar con el servicio. Tus datos se conservan; puedes intentar nuevamente.' }
  }
}

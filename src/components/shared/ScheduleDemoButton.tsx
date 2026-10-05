import { contact } from '../../config/contact'
export function ScheduleDemoButton({className=''}) { const url=contact.calendarUrl || contact.whatsapp; return <a className={`button ${className}`} href={url} target="_blank" rel="noreferrer">{contact.calendarUrl ? 'Solicitar una demo' : 'Solicitar una demo por WhatsApp'} <span aria-hidden>↗</span></a> }

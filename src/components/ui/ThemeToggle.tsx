type Props = { theme: 'light' | 'dark'; onToggle: () => void }
export function ThemeToggle({ theme, onToggle }: Props) {
  const next = theme === 'dark' ? 'claro' : 'oscuro'
  return <button className="theme-toggle" type="button" onClick={onToggle} aria-label={`Activar tema ${next}`} title={`Activar tema ${next}`}><span aria-hidden="true">{theme === 'dark' ? '☀' : '◐'}</span><span className="theme-label">Tema</span></button>
}

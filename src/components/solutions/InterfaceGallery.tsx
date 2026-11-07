import { useEffect, useId, useRef, useState } from 'react'

export type InterfaceScreen = { file: string; title: string; text: string; explanation: string; width?: number; height?: number }

type Props = { name: string; base: string; introduction: string; screens: InterfaceScreen[] }

export function InterfaceGallery({ name, base, introduction, screens }: Props) {
  const [selected, setSelected] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()
  const isOpen = selected !== null
  const screen = selected === null ? null : screens[selected]

  useEffect(() => {
    if (!isOpen) return
    const modal = dialog.current
    if (!modal) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    modal.showModal()
    return () => {
      modal.close()
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  useEffect(() => { if (isOpen) dialog.current?.scrollTo({ top: 0 }) }, [selected, isOpen])

  const move = (direction: number) => setSelected(current => current === null ? null : (current + direction + screens.length) % screens.length)

  return <>
    <p className="lead">{introduction}</p>
    <div className="solution-interface-grid dental-interface-grid">
      {screens.map((item, index) => <article className="solution-interface-card dental-interface-card" key={item.file}>
        <button className="dental-interface-image" type="button" onClick={() => setSelected(index)} aria-haspopup="dialog" aria-label={`Explorar ${item.title.toLowerCase()}`}>
          <img src={`${base}${encodeURIComponent(item.file)}`} alt={`Interfaz de ${name}: ${item.title.toLowerCase()}`} loading="lazy" decoding="async" width={item.width ?? 1919} height={item.height ?? 1079} />
          <span>Explorar interfaz <span aria-hidden="true">↗</span></span>
        </button>
        <div className="dental-interface-description"><span className="dental-interface-number">{String(index + 1).padStart(2, '0')} / {name.toUpperCase()}</span><h3>{item.title}</h3><p>{item.text}</p></div>
      </article>)}
    </div>
    <dialog ref={dialog} className="dental-viewer" aria-labelledby={titleId} aria-describedby={descriptionId} onCancel={event => { event.preventDefault(); setSelected(null) }} onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setSelected(null) } }} onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1) } }}>
      {screen && <>
        <div className="dental-viewer-header"><span>{name.toUpperCase()} <span aria-hidden="true">/</span> INTERFACES</span><button type="button" className="dental-viewer-close" onClick={() => setSelected(null)} autoFocus aria-label="Cerrar detalle de interfaz">Cerrar <span aria-hidden="true">×</span></button></div>
        <div className="dental-viewer-content">
          <div className="dental-viewer-preview"><img src={`${base}${encodeURIComponent(screen.file)}`} alt={`Captura ampliada: ${screen.title.toLowerCase()}`} width={screen.width ?? 1919} height={screen.height ?? 1079} /></div>
          <div className="dental-viewer-info" aria-live="polite" aria-atomic="true"><p className="dental-interface-number">INTERFAZ {String(selected! + 1).padStart(2, '0')} DE {screens.length}</p><h2 id={titleId}>{screen.title}</h2><p className="dental-viewer-summary">{screen.text}</p><div className="dental-viewer-explanation"><h3>Cómo te ayuda</h3><p id={descriptionId}>{screen.explanation}</p></div></div>
        </div>
        <div className="dental-viewer-footer"><p>Explora a tu ritmo <span>· Usa las flechas del teclado</span></p><div className="dental-viewer-navigation" role="group" aria-label="Recorrer interfaces"><button type="button" onClick={() => move(-1)} aria-label="Interfaz anterior">← <span>Anterior</span></button><span className="dental-viewer-counter">{selected! + 1} / {screens.length}</span><button type="button" onClick={() => move(1)} aria-label="Interfaz siguiente"><span>Siguiente</span> →</button></div></div>
      </>}
    </dialog>
  </>
}

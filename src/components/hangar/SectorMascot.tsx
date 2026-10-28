import type { CSSProperties } from 'react'
import type { Armor } from '../../data/armors'
import octopus from '../../img/mascot/sayri-octopus.webp'
import { sectorMascots } from '../../data/sectorMascots'

/** Every sector has its own generated costume, props and gesture. */
export function SectorMascot({ armor, priority = 'high' }: { armor: Armor; priority?: 'high' | 'low' }) {
  const mascot = sectorMascots[armor.slug]
  return <div className={`sector-mascot mascot-${armor.form}`} style={{ '--mascot-color': armor.color } as CSSProperties} aria-hidden="true">
    <div className="mascot-aura" />
    <div className="mascot-float"><img key={armor.slug} className="mascot-image" src={mascot?.src ?? octopus} alt="" width="1254" height="1254" decoding="async" fetchPriority={priority} /></div>
    <div className="mascot-module" key={armor.slug}>
      <svg viewBox="-28 -28 56 56" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={armor.emblem}/></svg>
      <span><small>{mascot?.personality ?? 'ESPECIALIDAD ACTIVA'}</small><strong>{armor.label}</strong></span><i />
    </div>
  </div>
}

import { useId } from 'react'
import appHome from '../../img/app/AppHome.jpeg'
import mascot from '../../img/mascot/mobile/invitacion.webp'
import './mobile-operation.css'

export function MobileOperation() {
  const id = useId().replace(/:/g, '')
  return <section className="mobile-operation" aria-labelledby="mobile-operation-title">
    <div className="mobile-operation-copy">
      <p className="eyebrow">SAYRI MÓVIL · CERCA DE TU OPERACIÓN</p>
      <h2 id="mobile-operation-title">Tu operación,<br /><span>donde estés.</span></h2>
      <p className="mobile-operation-description">Consulta clientes, registra pedidos y revisa información de tu negocio desde el celular.</p>
      <ul className="mobile-operation-features" aria-label="Capacidades móviles">
        <li><span aria-hidden="true">＋</span> Clientes</li><li><span aria-hidden="true">＋</span> Pedidos</li><li><span aria-hidden="true">＋</span> Stock</li>
      </ul>
      <a className="mobile-operation-cta" href="#contacto">Conocer SAYRI móvil <span aria-hidden="true">↗</span></a>
      <p className="mobile-operation-support">En campo, en una visita o entre sucursales.<br />La información acompaña a tu equipo.</p>
    </div>
    <figure className="mobile-operation-figure">
      <div className="mobile-operation-art">
        <svg viewBox="0 0 1254 1254" role="img" aria-labelledby={`${id}-title`}>
          <title id={`${id}-title`}>La mascota SAYRI presenta un celular con la pantalla real de acceso a la aplicación mediante RUC.</title>
          <defs>
            <clipPath id={`${id}-screen`}><rect x="174" y="148" width="434" height="984" rx="49" /></clipPath>
            <clipPath id={`${id}-tentacles`}>
              <path d="M174 485L189 494 211 521 223 555 222 581 207 602 211 621 202 653 190 679 174 694Z M608 607L592 607 579 613 571 627 574 641 591 654 608 658Z" />
              <path d="M270 148H509L497 164 482 170H306L289 165Z" />
            </clipPath>
          </defs>
          <image href={mascot} width="1254" height="1254" />
          <image href={appHome} x="174" y="148" width="434" height="984" preserveAspectRatio="none" clipPath={`url(#${id}-screen)`} />
          <image href={mascot} width="1254" height="1254" clipPath={`url(#${id}-tentacles)`} />
        </svg>
      </div>
      <figcaption><span aria-hidden="true" /> Tu empresa, a mano.<small>Pantalla real de acceso a SAYRI móvil</small></figcaption>
    </figure>
  </section>
}

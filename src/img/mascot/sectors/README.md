# Trece personalidades SAYRI

**Versión activa:** [posturas individuales v2](poses-v2/README.md). Los renders de esta carpeta son la primera versión, conservada como referencia; el catálogo web usa ahora los de `poses-v2/`.

Se generó cada imagen por separado con la herramienta integrada **image_gen**, `transparent_background: true` y la misma referencia `../sayri-octopus.png`. No se usó la API/CLI de generación. Se conservan el cuerpo blanco, las articulaciones doradas y los ojos azules; cada render cambia vestuario, equipamiento y gestos.

| Archivo / slug | Personalidad | Elementos distintivos |
| --- | --- | --- |
| comercial | Ágil y persuasivo | Chaleco formal, corbata naranja, tablet comercial y terminal de pago |
| distribucion-logistica | Resolutivo y organizado | Chaleco azul, auricular, paquetes y escáner |
| droguerias | Meticuloso y confiable | Indumentaria blanca/teal, gafas de protección, medicamentos y contenedor de stock |
| ferreterias | Práctico y fuerte | Casco amarillo, delantal, llave, martillo y cinta métrica |
| odontologia | Preciso y cercano | Gorro clínico, lupas, espejo e instrumental, modelo dental |
| agroindustria | Paciente y observador | Sombrero de campo, arnés verde, planta, sensor y espigas |
| colegios-profesionales | Institucional e integrador | Capa y banda violeta, insignia de comunidad y certificado |
| educacion | Curioso y motivador | Birrete, libro, lápiz y bombilla |
| estudios-juridicos | Analítico y justo | Lentes, corbata, balanza, libro y documento |
| planta-de-produccion | Metódico e inventivo | Casco con visor, arnés, engranaje, calibrador y tablet de procesos |
| restaurantes | Creativo y cálido | Gorro y pañuelo de chef, batidor, olla y plato servido |
| transporte-pasajeros | Atento y puntual | Gorra de conductor, volante, ticket y navegación |
| cocheras | Servicial y ordenado | Chaleco verde, barrera, llaves y dispensador de tickets |

## Archivos y reproducción

- `sources/{slug}.png`: originales generados, RGBA, 1254 × 1254 px.
- `{slug}.webp`: archivos usados por la web, con transparencia, codificados con FFmpeg/libwebp a calidad 85 y compresión 6, sin redimensionar.
- `prompts.json`: prompt común íntegro y especificación de cada sector. El prompt enviado es `basePrompt + "\nSector: " + slug + ". Personality and costume: " + personality`.
- `provenance.json`: ruta de generación y correspondencia con archivos guardados en el repositorio.
- `../../../data/sectorMascots.ts`: catálogo que relaciona cada rubro con su render y personalidad.

Los WebP ocupan entre 384 y 570 kB por archivo; el conjunto ocupa aproximadamente 5,6 MiB. El slider muestra tres o cinco renders y prepara un vecino adicional a cada extremo para el desplazamiento: cinco o siete imágenes cercanas montadas, con prioridad alta solo para la seleccionada. Los PNG no forman parte del bundle de producción. La mascota base se mantiene como fallback al ampliar el catálogo; añadir cada render nuevo también al catálogo y sus pruebas.

Son renders estáticos con flotación CSS; no hay un modelo 3D articulado ni movimiento independiente de accesorios y tentáculos.

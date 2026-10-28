# Posturas individuales · versión 2

Se regeneraron los trece pulpos usando su render anterior como referencia de edición, con **image_gen integrado** y `transparent_background: true`. Conservan vestuario, identidad blanca/dorada, ojos azules y accesorios del rubro. Cambian la inclinación del cuerpo, mirada, distribución de tentáculos y colocación de los objetos. Los archivos anteriores permanecen guardados sin sobrescritura.

| Rubro | Postura del nuevo render |
| --- | --- |
| Comercial | Cuerpo inclinado, terminal extendido hacia el frente y tablet junto a la cabeza |
| Distribución | Carga de paquetes a un lado, un tentáculo sobre la pila y escáner extendido al otro |
| Droguería | Postura compacta, mirada hacia el frasco y tentáculos recogidos en torno al stock |
| Ferretería | Base baja y ancha, llave extendida y herramientas de trabajo a la altura del cuerpo |
| Odontología | Cabeza inclinada hacia el modelo dental, espejo en arco por encima y apoyo inferior |
| Agroindustria | Postura de cuidado, tentáculos formando un cuenco y atención dirigida a la planta |
| Colegios profesionales | Frontal y erguido, brazos altos en U, bienvenida abierta y tentáculos inferiores largos |
| Educación | Cabeza ladeada mirando hacia arriba, bombilla en alto y libro abierto abajo |
| Estudio jurídico | Girado hacia un lado, documentos recogidos contra el cuerpo y balanza lateral baja |
| Planta de producción | Inclinado hacia el trabajo de precisión, calibrador delante y engranaje por detrás |
| Restaurantes | Giro diagonal del cuerpo, plato en alto y olla baja como contrapeso |
| Transporte | Frontal y concentrado, cuerpo recogido tras el volante y tentáculos posteriores compactos |
| Cochera | Tentáculo extendido para dirigir el paso, cuerpo girado y barrera abajo |

Archivos:

- `sources/{slug}.png`: originales generados, 1254 × 1254 px, RGBA.
- `{slug}.webp`: versión web con transparencia, FFmpeg/libwebp calidad 85 y compresión 6, sin redimensionar.
- `prompts.json`: prompt común completo y postura específica de cada rubro. El prompt enviado concatena `basePrompt + "\nSector: " + slug + ". Required new pose: " + pose`.
- `provenance.json`: referencia de edición, archivo generado y destino dentro del repositorio.

Los 13 WebP suman 4.852.270 bytes; el menor pesa 259.668 bytes y el mayor 447.774 bytes. `src/data/sectorMascots.ts` apunta ahora a esta versión tanto para el slider como para las páginas de solución. Las imágenes no usan transformaciones CSS para fingir la postura: esta forma parte del render. Continúa la flotación CSS del conjunto; no hay rig 3D ni animación independiente de los tentáculos.

Vista de comparación: `output/playwright/pulpos-posturas.png`.

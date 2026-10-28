# Mascota · crecimiento progresivo

Generada con **image_gen integrado**, referencia `../sayri-octopus.png` y `transparent_background: true`. Se pidió una postura distinta a las anteriores: cabeza inclinada mirando una pieza en alto, un tentáculo extendido arriba y otros sosteniendo una estructura de bloques, como gesto de construcción. Se conservan los materiales blancos/dorados y ojos azules de SAYRI.

- [Original transparente](sources/construimos.png): 1254 × 1254 px, RGBA.
- [Versión web](construimos.webp): mismo tamaño y transparencia, FFmpeg/libwebp calidad 85 y compresión 6, sin redimensionar, aproximadamente 377 kB.
- [Prompt y procedencia](generation.json): texto íntegro, referencia de entrada y ubicación del resultado generado.

Se usa como ilustración decorativa en `ProgressiveGrowth.tsx`, con dimensiones reservadas y carga diferida. El núcleo que suma conexiones es un SVG independiente de la imagen y cambia según el nivel seleccionado. La imagen es estática y no se generó un modelo articulado. No se usó la API/CLI de generación ni se descargaron recursos externos.

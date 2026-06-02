# Brand Visual Kit Dimanche

> Traduce la marca a un lenguaje que la IA entiende, para que Higgsfield/Gemini generen **on-brand y consistente, no genérico**. Método del *Branded AI Guide* (el curso de Anto) aplicado a Dimanche. Fuente: REF-002 (identidad visual), REF-030 (sistema gráfico), POL-010 (tono), MAN-019 (Brand Book).
>
> **Principio:** la IA es **traductora creativa, no socia**. Sin concepto y dirección de marca, sale sin alma. Siempre se parte de una imagen clara en la cabeza y se describe en capas, como lo haría un fotógrafo.

## Vocabulario de marca visual (keywords en inglés — rinden mejor)
- **Mood / atmósfera:** warm, homey, Sunday-morning, cozy, honest, unpretentious, artisanal-but-everyday, inviting, neighborhood feel.
- **Objetivos emocionales:** craving (antojo), comfort, belonging, "como en casa", trust, the ritual of sharing.
- **Personalidad visual:** real and hands-on, simple done right, no-frills, lived-in, proud without showing off.
- **NUNCA:** cold/clinical minimalism, luxury-distant, foodie/hipster styling, glossy plastic-perfect food, fake AI sheen, generic stock look, neon, glitch.

## Paleta (REF-002 — sin excepción)
- Azul Dimanche `#3559E0` (acento: delantal, detalle, prop, tipografía en placa)
- Blanco `#FFFFFF` (fondo principal)
- Negro `#000000` (texto, contraste)
- Crudo `#E9E3D9` (fondos cálidos, superficies, papel)
- **CERO naranja.** Cero degradados, sombras duras, ornamentos. Mucho espacio en blanco.

## Luz, materiales y entorno
- **Luz:** warm natural morning light, soft window light, golden hour, diffused, soft shadows. Evitar luz fría/clínica/flash duro.
- **Materiales/props:** madera clara, lino, papel madera y parafinado, cerámica simple, mármol/granito blanco, acero inox (referencia local Villa Allende). Manos reales, hornadas, mostrador.
- **Entorno:** mesa de desayuno/domingo, cocina/obrador real, local cálido. Nada de set aspiracional vacío.

## Tipos de toma Dimanche (del curso, para food)
- **Product hero shot** — el producto (criollito, factura) como protagonista, antojable.
- **Food studio shot** — producto sobre crudo/madera, luz cálida, fondo limpio.
- **Product in context** — en la mesa, con mate/café, manos, momento real.
- **Flat lay** — docena de facturas / combo, vista cenital, ordenado.
- **Cozy interior** — el local, cálido, gente.
- **Golden hour scene** — exterior/mostrador con luz dorada.
- **Macro / organic texture** — miga, vapor saliendo, hojaldre. (Antojo, no documental.)

## Framework de prompt en 6 capas
Cada generación se construye en capas (de lo general a lo específico):
1. **Concepto** — tipo de toma (ej. *food studio shot*, *product in context*).
2. **Motivo** — el protagonista y su detalle (ej. *a basket of freshly baked criollitos, golden flaky tops, one broken open showing soft layers*).
3. **Colores & materiales** — paleta + superficies (ej. *cream/raw beige #E9E3D9 surface, light wood, a touch of Dimanche blue #3559E0 on a cloth*).
4. **Composición** — encuadre y espacio (ej. *centered, generous negative space, top-down or 45°*).
5. **Luz & ambiente** — (ej. *warm morning window light, soft shadows, homey Sunday mood*).
6. **Cámara & lente** — (ej. *shot on 50mm, shallow depth of field, editorial food photography, photorealistic*).

### Ejemplo de prompt completo (criollitos)
> *Food studio shot of a small pile of freshly baked Argentine criollitos, golden flaky tops, one broken open showing soft tender layers, on a raw beige #E9E3D9 surface with light wood and a folded cloth in Dimanche blue #3559E0, centered composition with generous negative space, warm morning window light and soft shadows, homey Sunday-morning mood, shot on 50mm with shallow depth of field, editorial food photography, photorealistic, no text.*

## Afinado (feedback Luciano, 2026-06-02)
La primera prueba salió correcta pero **aburrida (sin gente) y con producto que se notaba IA**. Reglas que corrigen eso:
- **Con gente y vida, no bodegones vacíos.** Priorizá presencia humana real: manos amasando/sirviendo, alguien desayunando, el mostrador con movimiento, una familia compartiendo. La marca es "excusa de encuentro" — que se vea gente.
- **El producto real NO se genera con IA** (se nota y rompe la confianza, REF-030). Para el producto: **foto real** (Drive `MKT - Dimanche` / `06_Marketing`, o pedir toma en *Activos a producir*). La IA se usa para **mood, escena, ambiente, gente en contexto y retoque** — o se combina (foto real del producto + escena/gente generada).
- Apuntar a que **no parezca IA**: imperfección real, textura, desorden cálido de una mesa de verdad. Nada plástico ni perfecto.

## REGLA DE ORO: nada real sin referencia real (decisión Luciano, no negociable)
- **Todo lo identificable de Dimanche — el local, los productos, el mostrador, el equipo — NO se genera con IA inventada.** Se usa **foto/video real de Drive** (`MKT - Dimanche`, `06_Marketing`) o se le **pide la toma a Luciano**. Si no hay referencia real, no se hace.
- La IA solo puede generar/retocar **lo genérico y NO reconocible**: texturas, fondos abstractos, mood, o personas/escenas anónimas que **no pretenden ser** el local ni el equipo de Dimanche. (Familia/escenas genéricas no conocidas: OK.)
- Para piezas con producto: **foto real del producto** (Drive o pedida) + a lo sumo IA para fondo/escena genérica. **Nunca un producto inventado.**
- Ante la duda de si algo es "reconocible como Dimanche" → tratalo como real → foto real o pedir a Luciano.
- ⚠️ La imagen de prueba del 2026-06-02 estaba MAL: inventó un local que no es el de Dimanche. No repetir ese error.

## Reglas visuales base
- Cero texto en la imagen generada (el texto va en Canva, Niveau Grotesk). Cero naranja. Cero emojis. Paleta #3559E0/#E9E3D9.
- Toda pieza pasa por `dimanche-brand-check`; layout final en Canva.

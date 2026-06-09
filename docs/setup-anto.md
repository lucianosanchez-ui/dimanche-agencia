# Setup de Claude Code en la compu de Anto

> **Para quién:** lo ejecuta **Luciano** en la computadora de **Anto**. Anto NO es técnica — esta guía es para que vos dejes todo andando y ella solo abra y produzca.
> **Para qué:** que Anto pueda **producir piezas de marketing** (imágenes, video, copys) en "el taller" = **Claude Code**, según el modelo de dos carriles del proyecto.
> Última actualización: 2026-06-09 (Canva afuera; producción por código con el motor-contenido).

## Antes de arrancar: los dos carriles (que Anto tenga claro qué es cada cosa)
- **Luti (bot de Telegram) = el asistente rápido del día.** Para ideas, copys, hooks, consultar la marca, aprobar/archivar ideas, agendar. Ya lo tiene andando en el grupo "Agencia Mkt". **No genera imágenes ni video.**
- **Claude Code (esta compu, lo que estamos por configurar) = el taller de producción pesada.** Acá se producen las piezas en serio: imágenes, video, campañas, guiones, brand-check formal. Es **producción dirigida** (vos/Anto le van diciendo), no automática.
- **Regla simple:** ajuste rápido → Luti. Producir una pieza/campaña en serio → Claude Code.

El proceso de producción de una pieza, paso a paso, está en **`docs/proceso-contenido.md`**. Esta guía deja la herramienta lista; ese doc explica cómo se usa.

---

## Paso 1 — Instalar Claude Code

1. Entrá a **https://claude.com/claude-code** y seguí la instalación para macOS.
2. Requisitos básicos: la compu de Anto con **macOS** al día, conexión estable y permiso de administrador (para instalar). Claude Code corre en la **terminal**.
3. Verificá que quedó instalado abriendo la Terminal y tipeando `claude` (debería arrancar). Si no, revisá el instalador.

> Si Anto se marea con la terminal: dejale un acceso directo y explicale que solo tiene que abrir la carpeta del proyecto y tipear `claude`. El resto es conversar en castellano.

---

## Paso 2 — Cuenta de Anthropic + billing + TOPE de gasto (importante)

1. **Cada persona necesita su PROPIA cuenta de Anthropic** — el login NO se comparte. Para tener el gasto centralizado y bajo tu control, lo más prolijo es **Claude for Teams**: vos (admin) te suscribís y **invitás a Anto** con su mail; ella acepta, queda en el workspace del equipo, y vos manejás facturación y topes. (Alternativa: que Anto use su propia cuenta Pro/Max y le reembolsás — pero perdés el control central del gasto, justo lo que falló el 05/06.)
2. Cargá **billing** (saldo o tarjeta) en la consola de Anthropic.
3. **PONÉ UN TOPE DE GASTO MENSUAL.** Esto no es opcional: el **05/06 se agotó el crédito de golpe y todo el sistema quedó caído** (bot + agentes con `credit balance too low`). No queremos repetir ese susto. En la consola de Anthropic → Billing/Limits, fijá un límite mensual cómodo y una alerta antes del tope.
4. Dejá anotado quién recibe el aviso cuando se acerca al tope (que no le explote a Anto sin que vos te enteres).

---

## Paso 3 — Clonar el repo en la compu de Anto

El repo es la fuente de todo: las reglas, las skills y los docs. Va clonado localmente.

1. Repo: **github.com/lucianosanchez-ui/dimanche-agencia**.
2. Dale acceso a Anto al repo en GitHub (o cloná con tu credencial). Ubicación sugerida en su Mac: `~/Desktop/dimanche-agencia` (igual que en la tuya, así las rutas coinciden).
3. Cloná:
   ```
   git clone https://github.com/lucianosanchez-ui/dimanche-agencia.git ~/Desktop/dimanche-agencia
   ```
4. Comprobá que estén los archivos clave: `CLAUDE.md`, `ESTADO.md`, `ROLES.md`, la carpeta `docs/` y la carpeta `.claude/skills/` (ahí viven las skills propias).

---

## Paso 4 — Conectar los MCP (con las cuentas de DIMANCHE, no las personales)

Los **MCP** son las "manos" de Claude Code: le dan acceso a Higgsfield, Notion y el Drive. **Clave: conectá las cuentas de Dimanche, no las personales de Anto** (para que vea los assets, la marca y los créditos correctos, y el gasto quede ordenado).

> **OJO — Canva quedó AFUERA (decisión 2026-06-08).** La capa gráfica (texto, logo, íconos, precios) ya **NO se arma en Canva**: se compone **por código** con el **motor-contenido** del repo (Remotion para video/TV, PIL para estáticas), Niveau embebida y assets reales. Canva quedaba malísimo (sobre todo en TV) y era manual. **No hace falta conectar Canva.** Si en algún doc viejo ves "Canva", está desactualizado.

Qué es cada uno y para qué sirve en el flujo de producción:

- **Higgsfield** → generar **imagen/video manual** (escena, mood, fondo, textura, movimiento de cámara) y el **hero del producto** (Nano Banana desde la foto real). Es la materia prima visual. Conectar el **workspace de Dimanche** (el del plan con créditos). Generar cuesta, por eso primero se boceta (ver Paso 6). Exprimir Higgsfield al máximo: ver `.claude/skills/dimanche-media/references/higgsfield-arsenal.md`.
- **Notion** → la **fuente de verdad** y la base operativa común (Calendario, Inteligencia & Ideas, Documentos, Productos). Conectar el **teamspace Dimanche**. Acá Anto ve/edita lo mismo que vos, y acá quedan las piezas como **"Propuesto"** (el gate).
- **Google Drive → van las DOS vías, y necesitás las dos.** (1) **Google Drive Desktop** (app nativa, montaje local): da las **rutas de archivo reales** que las skills leen para las fotos base. Instalalo en la compu de Anto con la cuenta de Dimanche (`lucianosanchez@panaderiadimanche.ar`) y verificá la ruta del estilo `…/Library/CloudStorage/GoogleDrive-lucianosanchez@panaderiadimanche.ar/Mi unidad/06_Marketing/` (ahí están fotos, logos, packaging, design system; las **fotos base reales** de la regla de oro). (2) El **MCP de Google Drive** (`https://drivemcp.googleapis.com/mcp/v1`, se autoriza con `/mcp`): da acceso programático (listar carpetas, leer metadatos, subir resultados). Una no reemplaza a la otra: Desktop = rutas locales para producir; MCP = manejo desde el chat.

**Cómo se conectan los MCP:** los 3 servidores (Higgsfield, Notion, Google Drive) se configuran como **conectores de la cuenta de Anto** (en `claude.ai` → conectores) o a mano con `claude mcp add --transport http <nombre> <url> --scope user`. En cualquier caso, dentro de Claude Code tipeá **`/mcp`** y por cada uno completá el **OAuth en el navegador autorizando con la cuenta de DIMANCHE, no la personal**. Si alguno quedó con la cuenta equivocada: `/mcp` → elegí el servidor → **Clear authentication** → reautorizá. URLs: Higgsfield `https://mcp.higgsfield.ai/mcp` · Notion `https://mcp.notion.com/mcp` · Google Drive `https://drivemcp.googleapis.com/mcp/v1`. **Verificá que ve la cuenta correcta** pidiéndole algo simple (ej. "mostrá el balance de Higgsfield", "buscá en Notion el doc POL-010").

> Si algún MCP no autoriza con la cuenta de Dimanche y agarra la personal: deslogueá del servicio en el navegador y volvé a conectar. La cuenta importa.

---

## Paso 5 — Configurar el `.env` (secretos)

**Regla que no se rompe: NUNCA hay secretos en el repo.** Las API keys van en un archivo **`.env`** local, que está **gitignored** (no se sube nunca a GitHub).

1. En la raíz del repo (`~/Desktop/dimanche-agencia`) creá el archivo `.env`.
2. Hoy la única key que vive ahí es **`FAL_KEY`** (era el atajo del bot-productor; quedó documentada pero la producción NO va por fal.ai — va por Higgsfield manual). El formato es una línea por key:
   ```
   FAL_KEY=<valor>
   ```
3. Copiá el valor desde tu `.env` (no lo pongas en ningún chat ni lo commitees). Si más adelante suma otra key, va en la misma lógica: una línea `NOMBRE=<valor>` en `.env`, nunca en el repo.
4. Confirmá que `.gitignore` tiene `.env` (ya lo tiene) y que `git status` **no** lista el `.env` como archivo a subir.

---

## Paso 5.5 — El motor de contenido (Remotion): lo que produce placas y video

La capa gráfica (texto, logo, precios, movimiento) **no es Canva**: es el **motor-contenido** del repo, en `motor-contenido/remotion/` (proyecto **Remotion** = video/placas por código, React → mp4/png). Ahí viven las placas de la TV del local (**desayuno, criollos, horarios, delivery**) y el Brand Kit en código (`src/brand.ts`: paleta cobalto/crema, Niveau embebida, assets). **Todo lo que produjimos para la TV se rinde desde acá.**

Para dejarlo andando en la compu de Anto:
1. Instalar **Node.js** (LTS) — https://nodejs.org.
2. En terminal: `cd ~/Desktop/dimanche-agencia/motor-contenido/remotion && npm install`.
3. Ver/editar en vivo: `npx remotion studio` (preview en el navegador, se ven todas las placas).
4. Exportar: `npx remotion render <Composición> <salida.mp4>` (ej. `DeliveryVideo`, `DesayunoVideo`, `CriollosVideo`) · estática: `npx remotion still <Composición> <salida.png>` (ej. `Horarios`).

> Las fotos/clips base pesados viven en el **Drive** (modelo Drive-first); en el repo van los assets livianos de marca (`public/assets/`). Si una composición pide un asset que no está en `public/media/`, hay que copiarlo del Drive.

Anto le pide esto a Claude Code en criollo ("rendeá la placa de delivery", "cambiá el precio del desayuno y exportala") y él corre estos comandos.

---

## Paso 6 — Smoke test (probar que todo anda, sin quemar créditos)

Con todo conectado, una prueba de punta a punta:

1. Abrí Claude Code parado en el repo: la carpeta `~/Desktop/dimanche-agencia`, y tipeá `claude`.
2. Primer mensaje: **"Leé ESTADO.md y CLAUDE.md"** — así se pone en contexto del proyecto y las reglas.
3. Pedile producir una **pieza de prueba** con el orquestador: por ejemplo *"con dimanche-mkt, armemos una historia simple de criollos calentitos"*. El orquestador `dimanche-mkt` es la **puerta única** — Anto le habla en criollo y él deriva a la skill que corresponde (media, copy, formatos, etc.).
4. Que siga **`docs/proceso-contenido.md`**: brief → **foto base real** (del Drive o del celu) → escena/hero con IA (Higgsfield/Nano Banana) → **capa gráfica por código** (motor-contenido / Remotion) → copy → brand-check → "Propuesto" en Notion. **(Canva ya no entra.)**
5. **Boceto a mano primero, no quemar créditos.** Antes de generar en Higgsfield, que se aterrice el concepto (boceto/mockup). Generar cuesta créditos; no se genera hasta tener el concepto aprobado.
6. Si la prueba llega a "Propuesto" en Notion tocando Drive (foto), Higgsfield (si hizo falta), Canva (layout) y brand-check, **el taller quedó listo**.

---

## Paso 7 — Recordatorios de oro (que Anto los tenga siempre presentes)

Estas son las reglas que no se rompen al producir:

- **Regla visual de oro:** la IA **SIEMPRE parte de algo REAL** — nunca inventa de cero. Para cualquier pieza con producto o local identificable, la base es una **foto real**: nuestra (Drive, `06_Marketing/01_Fotos/...`) o una **foto rápida del celu** del equipo. La IA mejora/ambienta/extiende sobre esa base (estilo, fondo, luz, composición, movimiento); **NO fabrica un producto que no existe**. Logo y texto **por código** (motor-contenido), nunca generados por IA **ni armados en Canva**.
- **Gate humano:** todo lo que se produce nace **"Propuesto"** en Notion. **Nada se publica sin aprobación de Luciano/Anto.** El taller produce; la aprobación es un paso aparte.
- **Tono y marca:** **sin emojis, sin naranja, sin marketinería.** Tono POL-010 y mensajes maestros REF-029. El objetivo de fondo es posicionar la marca. **Toda pieza pasa por `dimanche-brand-check`** antes de aprobar.
- **No reinventar:** el método ya está escrito en las skills y en `docs/proceso-contenido.md`. Si algo no sale, la respuesta casi siempre está en una reference que falta leer — leerla antes de improvisar. (El error del 07-08/06 fue improvisar/automatizar en vez de seguir lo que ya estaba definido.)

---

## Resumen para Anto (una sola frase)
Abrís la carpeta del proyecto, arrancás Claude Code, le decís "leé ESTADO.md y CLAUDE.md", y le pedís lo que necesitás en criollo a **dimanche-mkt**. Siempre partís de una **foto real**, no hay emojis ni naranja, y todo queda **Propuesto** hasta que se aprueba.

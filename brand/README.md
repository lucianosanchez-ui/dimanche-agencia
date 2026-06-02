# brand/ — Kit de marca (derivado de Notion)

Esta carpeta es el **contexto de marca que cargan todos los agentes** (estratega, radar, productor) y que se sube a NotebookLM. Es el equivalente al `contexto_dimanche.md` del radar, pero para marketing.

## Regla de oro
**La fuente de verdad es Notion** (base `📚 Documentos`, Área = Marketing). Estos archivos son una **copia derivada**. No los edites a mano: si la marca cambia, se actualiza en Notion y se regenera con:

```bash
export NOTION_TOKEN=ntn_...
python scripts/export_brand.py
```

## Archivos
- **`00-brand-book.md`** — el Brand Book (MAN-019): tono, pilares, personalidad, identidad visual, buyer personas, KPIs. El doc central.
- **`10-contexto-negocio.md`** — la empresa, el equipo, la competencia, los canales y la restricción estratégica T2.
- *(tras correr `export_brand.py`)* un `.md` por cada documento de marca vigente (POL-010, POL-015, REF-023, MAN-018, etc.).

## Cómo lo usan los agentes
- **Estratega / Productor (Claude Teams):** leen este `brand/` al iniciar y lo aplican a toda propuesta y pieza.
- **Radar (n8n):** manda `00-brand-book.md` + `10-contexto-negocio.md` como contexto cacheado al analizar tendencias/competencia.
- **NotebookLM:** subir esta carpeta como fuentes para Q&A del equipo.

## No negociable
Identidad visual vigente (desde 2026-06-02): Azul `#3559E0`, Blanco, Negro, Crudo `#E9E3D9`. **Sin naranja. Sin emojis.** Tipografía Niveau Grotesk.

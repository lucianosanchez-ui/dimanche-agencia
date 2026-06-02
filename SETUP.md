# SETUP — pasos manuales (Luciano)

Lo que Claude no puede hacer por vos (requiere apps de escritorio, login o no hay API). En orden de prioridad.

## 1. Conectar la integración de Notion a las 4 bases nuevas ⚠️ (sin esto, los agentes no pueden escribir)
En Notion, abrí cada una de las 4 bases (Objetivos & Campañas, Calendario de contenido, Inteligencia & Ideas, Activos a producir) → menú `•••` → **Connections** → agregá la misma integración que usa el radar ("Radar Dimanche" o la que corresponda).

## 2. Ubicar la mesa y compartir con Anto
La página **Agencia de Marketing Dimanche** se creó en tu workspace. Arrastrala al teamspace **Dimanche** (sugiero al lado del área Marketing). Compartila con Anto con permiso de edición.

## 3. Proyecto Claude Teams "Marketing Dimanche" (modo Productor + Estratega a demanda)
1. Claude Desktop → Cowork/Projects → **+** → "Start from a folder" → elegí `~/Desktop/dimanche-agencia/agentes-ondemand`.
2. Subí también la carpeta `~/Desktop/dimanche-agencia/brand` (o al menos `00-brand-book.md` y `10-contexto-negocio.md`).
3. Pegá el contenido de `agentes-ondemand/PROJECT-INSTRUCTIONS.md` en el campo **Instructions**.
4. Nombre: `Marketing Dimanche`. Compartí con Anto (su mail de la empresa).
5. Probá: "Dame 3 copys + 5 hooks para un reel de criollitos, pilar Producto-héroe, persona Cande."

## 4. NotebookLM (base de conocimiento, Q&A del equipo)
1. (Opcional pero recomendado) Corré `export_brand.py` para bajar TODA la marca vigente:
   ```bash
   cd ~/Desktop/dimanche-agencia
   pip install notion-client     # o: uv add notion-client
   export NOTION_TOKEN=ntn_...   # la misma del radar
   python scripts/export_brand.py
   ```
2. notebooklm.google.com → New notebook **"Marketing Dimanche"** → subí los `.md` de `brand/`.
3. (Opcional) sumá un export de los mejores items del radar (DB 📚 Mis enlaces, Score Alta+).
4. Compartilo con Anto. Refrescá las fuentes cuando cambie la marca.

## 5. n8n local (modo Radar — agentes que corren solos)
1. Instalá: `npx n8n` (o Docker). Abrí http://localhost:5678.
2. Cargá credenciales: **Anthropic**, **Apify**, **Notion** (la del radar).
3. Armá el primer workflow (**Tendencias**) siguiendo `agentes-autonomos/README.md` (patrón de 4 nodos). Pegá `agentes-autonomos/tendencias/PROMPT.md` en el nodo de Claude.
4. Probá con un run manual; verificá que aparezca un item en *Inteligencia & Ideas*.
5. Repetí para Competencia y Performance. (El Briefing puede ir después.)
> n8n local solo corre con la Mac prendida. Cuando un agente esté validado y deba ser 24/7, migralo a n8n Cloud/VPS o al patrón GitHub Actions del radar.

## 6. Canva — brand kit (modo Productor, layout final)
Canva Pro → Brand Hub → Brand Kit "Dimanche": colores `#3559E0` `#FFFFFF` `#000000` `#E9E3D9` (sin naranja), fuente **Niveau Grotesk**, logo desde Drive `06_Marketing`. Plantillas: post 1:1, story/reel 9:16, carrusel. Detalle en `media/recetario.md`.

## 7. Publicación
Lo **Aprobado** se programa en **Meta Business Suite** (gratis) o **Metricool**. Pauta paga (Meta/Google Ads) = Fase 2.

---

## Orden sugerido para arrancar rápido
**Hoy:** pasos 1 + 2 + 3 (tenés la mesa + el co-piloto andando con Anto en una tarde).
**Esta semana:** 4 (NotebookLM) + 6 (Canva).
**Cuando quieras:** 5 (n8n) — mientras tanto, los modos Radar/Estratega los podés correr a demanda desde Claude.
